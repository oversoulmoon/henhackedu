import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import OpenAI from "openai";
import MenuBar from './Menu';
import Card from './Card';

const openai = new OpenAI({apiKey: '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',dangerouslyAllowBrowser: true});

const OpenAIQuestionAnswering: React.FC = () => {
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages:[{role: 'user', content: question}],
        temperature: 0.7,
        n: 1
      });

      setAnswer(JSON.stringify(response.choices[0].message.content));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const menuItems = [
    { title: 'Home', link: '#home' },
    { title: 'About', link: '#about' },
    { title: 'Services', link: '#services' },
    { title: 'Contact', link: '#contact' }
  ];

  return (
    <div>
      <h1>Ask a Question</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={question} onChange={handleQuestionChange} />
        <button type="submit">Submit</button>
      </form>
      {answer && (
        <div>
          <h2>Answer:</h2>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

function App() {

  const [videoUrl, setVideoUrl] = useState<string>('');
  const menuItems = [
    { title: 'Home', link: '#home' },
    { title: 'About', link: '#about' },
    { title: 'Services', link: '#services' },
    { title: 'Contact', link: '#contact' }
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setVideoUrl(videoUrl);
    }
  };
  return (
    <div className="App">
      <MenuBar items={menuItems} />
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <Card>
        <h2>Upload Video</h2>
        <input type="file" accept="video/*" onChange={handleFileChange} />
        {videoUrl && (<video style={{width: '100%'}} controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>)}
      </Card>

      <Card>
        <h2>Section 2</h2>
        <p>This is the content of section 2.</p>
      </Card>
      <Card>
        <h2>Section 3</h2>
        <p>This is the content of section 3.</p>
      </Card>
      </div>
    </div>
  );
}

export default App;