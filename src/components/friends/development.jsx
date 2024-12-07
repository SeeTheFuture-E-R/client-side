import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

import './style.css';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
};

function Development() {
  const [picture, setPicture] = useState('');
  const [result, setResult] = useState('');
  const webcamRef = useRef(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const startTrial = async () => {
    const res = await axios.post('http://localhost:8000/02');
    console.log(res.data);
  };

  const capture = useCallback(async () => {
    const pictureSrc = webcamRef.current.getScreenshot();
    setPicture(pictureSrc);
    await handleUpload(pictureSrc);
  }, [webcamRef]);

  const handleUpload = async (base64Image) => {
    try {
      const blob = base64ToBlob(base64Image);
      const formData = new FormData();
      formData.append('file', blob, 'capture.jpg');

      console.log('formData', formData);
      const response = await axios.post('http://127.0.0.1:8000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response?.data?.results[0].name);
      console.log(response.data.id);
      setResult(response.data); // Assuming you want to set the result from the response
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const base64ToBlob = (base64) => {
    const byteString = atob(base64.split(',')[1]);
    const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mimeString });
  };

  return (
    <div className="container">
      {picture !== '' ? (
        <button
          onClick={() => setPicture('')}
          className="btn btn-primary"
        >
          הצג מצב מצלמה
        </button>
      ) : (
        <button
          onClick={capture}
          className="btn btn-danger"
        >
          שלח תמונה
        </button>
      )}
      <div className="button-container">
        {picture === '' ? (
          <Webcam
            audio={false}
            style={{ width: '900px', height: 'auto' }}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
        ) : (
          <img src={picture} alt="Captured Image" />
        )}
      </div>
    </div>
  );
}

export default Development;
