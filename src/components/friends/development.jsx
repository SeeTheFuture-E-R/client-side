// import React, { useState } from 'react';
// import Webcam from 'react-webcam';
// import axios from 'axios';
// const videoConstraints = {
//     width: 400,
//     height: 400,
//     facingMode: 'user',
// };

// function Development () {
//     const [picture, setPicture] = useState('');
//     const [result, setResult]=useState('');
//     const webcamRef = React.useRef(null);
//     const [file, setFile] = useState(null);

//     const handleFileChange = (event) => {
//       setFile(event.target.files[0]);
//     };

//     const stratTrial = async () =>{

//         const res = await axios.post(`http://localhost:8000/02`)

//         //res = await axios.post(`http://localhost:8000/03`)
//     }

//     const capture = React.useCallback(async () => {
//         const pictureSrc = webcamRef.current.getScreenshot();
//         setPicture(pictureSrc)
//         await handleUpload()
//     });
//     const handleUpload = async () => {
//         try {
//           const formData = new FormData();
//           formData.append('file',picture );
    
//           // Replace 'http://127.0.0.1:8000' with the actual URL where your FastAPI server is running
//           console.log("formData", formData)
//           const response = await axios.post('http://127.0.0.1:8000/getPicture/', formData, {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//             },
//           });
    
//           console.log(response.data);
//         }
//          catch (error) {
//           console.error('Error uploading file:', error);
//         }
//       };

//     return (

//         <div className="container">
//                 <div className="webcam-container">
//                     {picture === '' ? <>
//                             <Webcam
//                                 audio={false}
//                                 style={{ width: '900px', height: '900px' }}
//                                 ref={webcamRef}
//                                 screenshotFormat="image/jpeg"
//                                 videoConstraints={videoConstraints}
//                             />
//                             </>
//                     :  <img src={picture} alt="Captured Image" />
//                     }
//                 <div className="button-container">
//                     {picture !== '' ? (
//                         <button
//                             onClick={() => setPicture('')}
//                             className="btn btn-primary"
//                         >
//                             Retake
//                         </button>
//                     ) : (
//                         <button
//                             onClick={capture}
//                             className="btn btn-danger"
//                         >
//                             Capture
//                         </button>
//                     )}
                   
//                 </div>
//             </div>
//         </div>
        
//     );
// };

// export default Development;
import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

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
      alert(response.data.name)
      console.log(response.data.id)
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
      <div className="webcam-container">
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
        {picture === '' ? (
          <>
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
          
        </div>
      </div>
    </div>
  );
}

export default Development;
