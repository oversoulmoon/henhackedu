declare module "*.mp4" {
    const src: string;
    export default src;
}

interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
  
  declare var SpeechRecognition: {
    new (): SpeechRecognition;
  };
  
  declare var webkitSpeechRecognition: {
    new (): SpeechRecognition;
  };
  declare var SpeechRecognitionEvent:{
    new (): SpeechRecognitionEvent;
  }
  