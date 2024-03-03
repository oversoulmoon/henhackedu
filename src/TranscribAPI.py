from flask import Flask, request, jsonify
import os
import speech_recognition as sr
from moviepy.editor import VideoFileClip
import whisper
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
@app.route('/transcript', methods=['POST'])
def generate_transcript():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    
    if file:
        video_path = "temp_video.mp4"
        file.save(video_path)
        
        recognizer = sr.Recognizer()
        
        video = VideoFileClip(video_path)
        
        audio = video.audio
        
        temp_audio_file = "temp_audio.wav"
        audio.write_audiofile(temp_audio_file)
        
        with sr.AudioFile(temp_audio_file) as source:
            audio_data = recognizer.record(source)
            
        try:
            model = whisper.load_model("tiny")
            transcript = model.transcribe(temp_audio_file)
            os.remove(temp_audio_file)
            os.remove(video_path)
            return jsonify({'transcript': transcript})
        except sr.UnknownValueError:
            return jsonify({'error': 'Speech recognition could not understand audio'})
        except sr.RequestError as e:
            return jsonify({'error': f'Could not request results from Google Web Speech API; {e}'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=1743)