import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import OpenAI from "openai";
import MenuBar from './Menu';
import Card from './Card';
import axios from 'axios';
// const openai = new OpenAI({apiKey: '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',dangerouslyAllowBrowser: true});

// const OpenAIQuestionAnswering: React.FC = () => {
//   const [question, setQuestion] = useState<string>('');
//   const [answer, setAnswer] = useState<string>('');

//   const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setQuestion(e.target.value);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await openai.chat.completions.create({
//         model: "gpt-3.5-turbo",
//         messages:[{role: 'user', content: question}],
//         temperature: 0.7,
//         n: 1
//       });

//       setAnswer(JSON.stringify(response.choices[0].message.content));
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };


//   const menuItems = [
//     { title: 'Home', link: '#home' },
//     { title: 'About', link: '#about' },
//     { title: 'Services', link: '#services' },
//     { title: 'Contact', link: '#contact' }
//   ];

//   return (
//     <div>
//       <h1>Ask a Question</h1>
//       <form onSubmit={handleSubmit}>
//         <input type="text" value={question} onChange={handleQuestionChange} />
//         <button type="submit">Submit</button>
//       </form>
//       {answer && (
//         <div>
//           <h2>Answer:</h2>
//           <p>{answer}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// function App() {

//   const [videoUrl, setVideoUrl] = useState<string>('');
//   const menuItems = [
//     { title: 'Home', link: '#home' },
//     { title: 'About', link: '#about' },
//     { title: 'Services', link: '#services' },
//     { title: 'Contact', link: '#contact' }
//   ];

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const videoUrl = URL.createObjectURL(file);
//       setVideoUrl(videoUrl);
//   };
// }
//   return (
//     <div className="App">
//       <MenuBar items={menuItems} />
//       <div style={{ display: 'flex', justifyContent: 'space-around' }}>
//       <Card>
//         <h2>Upload Video</h2>
//         <input type="file" accept="video/*" onChange={handleFileChange} />
//         {videoUrl && (<video style={{width: '100%'}} controls>
//           <source src={videoUrl} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>)}
//       </Card>

//       <Card>
//         <h2>Section 2</h2>
//         <p>This is the content of section 2.</p>
//       </Card>
//       <Card>
//         <h2>Section 3</h2>
//         <p>This is the content of section 3.</p>
//       </Card>
//       </div>
//     </div>
//   );
// }

// export default App;

function App() {

  const [videoUrl, setVideoUrl] = useState<string>('http://localhost:3000');
  const [key, setKey] = useState<number>(0); // Add a key state to force video reload
  const [VideoName, setVideoName] = useState<string>('Empty');

  const menuItems = [
    { title: 'Home', link: '#home' },
    { title: 'About', link: '#about' },
    { title: 'Services', link: '#services' },
    { title: 'Contact', link: '#contact' }
  ];
    const [transcript, setTranscript] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setVideoUrl(videoUrl);
  };
}

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      const videoUrl = URL.createObjectURL(file);
      setVideoName(file.name)
      setVideoUrl(videoUrl);
      setKey(prevKey => prevKey + 1); // Increment key to force video element to reload

      try {
        const response = await axios.post('http://localhost:5000/transcript', formData, {
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
            test
          </Card></div>
      </div>
    </div>
  );
}

export default App;

//

// import React, { useState } from 'react';
// import axios from 'axios';

// const VideoUpload: React.FC = () => {
//   const [transcript, setTranscript] = useState<string | null>(null);

  // const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files ? event.target.files[0] : null;
  //   if (file) {
      // const formData = new FormData();
      // formData.append('file', file);

      // try {
      //   const response = await axios.post('http://localhost:5000/transcript', formData, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      //   });
      //   console.log(response.data.transcript)
      //   setTranscript(response.data.transcript.text);
      // } catch (error) {
      //   console.error('Error uploading file:', error);
      // }
  //   }
  // };


//   return (
//     <div>
//       <input type="file" onChange={handleFileUpload} />
//       {transcript && <div><strong>Transcript:</strong> {transcript}</div>}
//     </div>
//   );
// };

// export default VideoUpload