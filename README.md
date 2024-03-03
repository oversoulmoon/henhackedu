# VidExplainAI

A webapp to help you go through video lectures

## Table of Contents

- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## About

This project aims to help further incorporate AI into learning. This projects takes in a video, generate its transcript using openai-whisper library and using openai api to answer user's question. 

## Features

List the key features of your project.

- Video Transcription
- Answer user's question based on the video
- Resuable transcription APi

## Installation
Clone the repo: 
```bash
git clone https://github.com/oversoulmoon/henhackedu.git
```
Move into the repo:
```
cd henhackedu
```
Install required packages:
```
npm install && pip install SpeechRecognition Flask moviepy flask_cors -U openai-whisper 
```
Start Transcription API: 
```
python src/TranscribAPI.py
```
In another terminal in the directory, start webapp:
```
npm start
```

## Usage
Click the upload button and upload a video, then wait for transcript genernation.
## Contributing
Trung Nguyen, Araf Jahin, Ben Scott, Ayman Tayeb