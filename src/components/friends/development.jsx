import React, { useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: 'user',
};

function Development () {
    const [picture, setPicture] = useState('');
    const [result, setResult]=useState('');
    const webcamRef = React.useRef(null);
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };

    const stratTrial = async () =>{

        const res = await axios.post(`http://localhost:8000/02`)

        //res = await axios.post(`http://localhost:8000/03`)
    }

    const capture = React.useCallback(async () => {
        const pictureSrc = webcamRef.current.getScreenshot();
        setPicture(pictureSrc)
        await handleUpload()
    });
    const handleUpload = async () => {
        try {
          const formData = new FormData();
          formData.append('file',picture );
    
          // Replace 'http://127.0.0.1:8000' with the actual URL where your FastAPI server is running
          const response = await axios.post('http://127.0.0.1:8000/getPicture/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
          console.log(response.data);
        }
         catch (error) {
          console.error('Error uploading file:', error);
        }
      };

    return (

        <div className="container">
                <div className="webcam-container">
                    {picture === '' ? (<>
                            <Webcam
                                audio={false}
                                style={{ width: '900px', height: '900px' }}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                videoConstraints={videoConstraints}
                            />
                            </>
                    ) : (
                        <img src={picture} alt="Captured Image" />
                    )}
                <div className="button-container">
                    {picture !== '' ? (
                        <button
                            onClick={() => setPicture('')}
                            className="btn btn-primary"
                        >
                            Retake
                        </button>
                    ) : (
                        <button
                            onClick={capture}
                            className="btn btn-danger"
                        >
                            Capture
                        </button>
                    )}
                   
                </div>
            </div>
        </div>
        
    );
};

export default Development;