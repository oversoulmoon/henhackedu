import React, { useState } from 'react';
import './App.css';
import MenuBar from './Menu';
import Card from './Card';
import axios from 'axios';
import ChatRoom from './Chatroom';

function App() {

  const [videoUrl, setVideoUrl] = useState<string>('http://localhost:3000');
  const [key, setKey] = useState<number>(0);
  const [VideoName, setVideoName] = useState<string>('Empty');

  const menuItems = [
    { title: 'VidExplainAI', link: '#' }
  ];
  const [transcript, setTranscript] = useState<string>("");

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      const videoUrl = URL.createObjectURL(file);
      setVideoName(file.name)
      setVideoUrl(videoUrl);
      setKey(prevKey => prevKey + 1);

      try {
        const response = await axios.post('http://localhost:1743/transcript', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data.transcript.text)
        setTranscript(response.data.transcript.text);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };
  return (
    <div className="App">
      <div className="wrapper">
        <div className="one">
          <MenuBar items={menuItems}/>
        </div>
        <div className="two">
          <Card>
          <input type="file" accept="video/*" id="actual-btn" onChange={handleFileUpload} hidden/>
          <label id="upload-btn" htmlFor="actual-btn">UPLOAD VIDEO</label>
          </Card>
          <br/>
          <Card>
          <h3>Ask me anything</h3>
              <ChatRoom>{transcript}</ChatRoom>
            </Card>
        </div>
        <div className="three">        
          <Card>
          <h3>{VideoName}</h3>
             {videoUrl && (<video style={{width: '100%'}} key={key}  controls>
           <source src={videoUrl} type="video/mp4" />
           Your browser does not support the video tag.
        </video>)}
          </Card>
        </div>
        <div className="four">        
          <Card>
          <form>
            <textarea id='transcription' value={transcript} readOnly></textarea>
          </form>
          </Card>
          </div>
      </div>
    </div>
  );
}

export default App;