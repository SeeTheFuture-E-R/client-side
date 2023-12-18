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

    const capture = React.useCallback(async () => {
        const pictureSrc = webcamRef.current.getScreenshot();
        setPicture(pictureSrc)
      
       /* try {
           
            const response=await axios.post('http://127.0.0.1:8000/aa', { path: pictureSrc },{
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Image sent to server.');
            console.log(response.data);
            setResult(response.data)
        } catch (error) {
            console.error('Error sending image to server:', error);
        }*/
    });

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