import React, {useContext, useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import {productId} from './index';
import { AuthContext } from '../context/authContext';

//import './style.css';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
};

function Development() {
  let { currentUser, token } = useContext(AuthContext);
  const [picture, setPicture] = useState('');
  const [result, setResult] = useState('');
  const webcamRef = useRef(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const capture = useCallback(async () => {
    const pictureSrc = webcamRef.current.getScreenshot();
    setPicture(pictureSrc);
    await handleUpload(pictureSrc);
  }, [webcamRef]);

  const checkAllowEx =async()=>{
      let config = {
        headers: {'Authorization': 'Bearer ' + token}
    }

    const Experiences = await axios.get(`http://localhost:9660/experiences/${currentUser?.id}`, config)
    const expProd = Experiences.data.find(e => e.productId === productId); 

    if (expProd && expProd.expireDate < new Date()) {
        return false;
    }
    return true
  }

  const handleUpload = async (base64Image) => {
    try {
      const checkAllow = checkAllowEx()
        if(!checkAllow){
          alert("הנסיון שלך יסתים"+'\n' +
            "יש לרכוש את המוצר"
        )
        return;
      }
      const blob = base64ToBlob(base64Image);
      const formData = new FormData();
      formData.append('file', blob, 'capture.jpg');

      console.log('formData', formData);
      const response = await axios.post('http://127.0.0.1:8000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data.id);
      setResult(response.data); 

      const speak = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'he-IL'; 
        utterance.rate = 0.7; 
        utterance.pitch = 1; 
        window.speechSynthesis.speak(utterance);
    };
    
    // שימוש:
    speak(response?.data?.results[0].name);

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
    <div className="about">
      {picture !== '' ? (
        <button className="start-button"
          onClick={() => setPicture('')}
        >
          הצג מצב מצלמה
        </button>
      ) : (
        <button className="start-button"
          onClick={capture}
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
