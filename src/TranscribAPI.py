import speech_recognition as sr
from moviepy.editor import VideoFileClip
import whisper

def generate_transcript(video_path):
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
        # Perform speech recognition
        import whisper
        model = whisper.load_model("base")
        result = model.transcribe("temp_audio.wav")
        print(result["text"])
    except sr.UnknownValueError:
        print("Speech recognition could not understand audio")
    except sr.RequestError as e:
        print(f"Could not request results from Google Web Speech API; {e}")
        
    return None

if __name__ == "__main__":
    # video_path = input("Enter path to video file: ")
    transcript = generate_transcript("/Users/trung/Documents/PersonalProject/henhackedu/src/t.mp4")
    if transcript:
        print("Transcript:")
        print(transcript)