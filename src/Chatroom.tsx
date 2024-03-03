import React, { useState, FormEvent, useRef, useEffect } from 'react';
import './Chatroom.css'
import OpenAI from "openai";

const openai = new OpenAI({apiKey: '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',dangerouslyAllowBrowser: true});

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot'; // Assuming two types of senders
}
interface data {
    children: string;
}
const SmsInterface: React.FC<data> = (props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const divRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    //3️⃣ bring the last item into view        
    divRef.current?.lastElementChild?.scrollIntoView()
}, [messages]);

  const handleMessageSend = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const messageInput = e.currentTarget.elements.namedItem('message') as HTMLInputElement;
    const messageText = messageInput.value.trim();
    if (messageText !== '') {
      const newMessage: Message = {
        id: new Date().getTime(),
        text: messageText,
        sender: 'user',
      };
      setMessages([...messages, newMessage]);
      messageInput.value = '';
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages:[{role: 'user', content: "Use this as context but do not say it in the response: " + props.children + messageText}],
        temperature: 0.7,
        n: 1
      });
      const newMessage2: Message = {
        id: new Date().getTime(),
        text: JSON.stringify(response.choices[0].message.content),
        sender: 'bot',
      };
      setMessages([...messages, newMessage, newMessage2]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    }
  };

  return (
    <div className="sms-interface">
      <div className="messages" ref={divRef} >
        {messages.map(message => (
          <div key={message.id}  className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
        <form onSubmit={handleMessageSend} className="message-form">
        <input type="text" name="message" placeholder="Type a message..." className="message-input" />
        <button type="submit" className="send-button">Send</button>
      </form>
      </div>

    </div>
  );
};

export default SmsInterface;