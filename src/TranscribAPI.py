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
    # Check if the POST request has the file part
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    
    file = request.files['file']
    
    # Check if the file is not empty
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    
    if file:
        # Save the file
        video_path = "temp_video.mp4"
        file.save(video_path)
        
        # Initialize recognizer
        recognizer = sr.Recognizer()
        
        # Open video file
        video = VideoFileClip(video_path)
        
        # Extract audio from video
        audio = video.audio
        
        # Convert audio to a temporary file
        temp_audio_file = "temp_audio.wav"
        audio.write_audiofile(temp_audio_file)
        
        # Recognize speech using Google Web Speech API
        with sr.AudioFile(temp_audio_file) as source:
            audio_data = recognizer.record(source)
            
        try:
            model = whisper.load_model("tiny")
            transcript = model.transcribe("src/t.mp4")
            return jsonify({'transcript': transcript})
        except sr.UnknownValueError:
            return jsonify({'error': 'Speech recognition could not understand audio'})
        except sr.RequestError as e:
            return jsonify({'error': f'Could not request results from Google Web Speech API; {e}'})


# def generate_transcript(video_path):
#     # Check if the POST request has the file part
#     if 'file' not in request.files:
#         return jsonify({'error': 'No file part'})
    
#     file = request.files['file']

#     if file.filename == '':
#         return jsonify({'error': 'No selected file'})
    
#     # Initialize recognizer
#     recognizer = sr.Recognizer()
    
#     # Open video file
#     video = VideoFileClip(video_path)
    
#     # Extract audio from video
#     audio = video.audio
    
#     # Convert audio to a temporary file
#     temp_audio_file = "./temp_audio.wav"
#     audio.write_audiofile(temp_audio_file)
    
#     # Recognize speech using Google Web Speech API
#     with sr.AudioFile(temp_audio_file) as source:
#         audio_data = recognizer.record(source)
        
#     try:
#         # Perform speech recognition
#         import whisper
#         model = whisper.load_model("tiny")
#         result = model.transcribe("src/t.mp4")
#         print(result["text"])
#     except sr.UnknownValueError:
#         print("Speech recognition could not understand audio")
#     except sr.RequestError as e:
#         print(f"Could not request results from Google Web Speech API; {e}")
        
#     return None

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)