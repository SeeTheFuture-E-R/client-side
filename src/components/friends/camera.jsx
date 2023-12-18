import { useEffect, useRef, useState, useCallback } from "react"; // import useCallback
import Webcam from "react-webcam";
import { IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { Button } from "@mui/material";


function Camera({ open, setOpen, image, setImage }) {
    
    const webcamRef = useRef(null)
    const [imgSrc, setImgSrc] = useState('');

    // useEffect(() => {
    //     console.log(imgSrc)
    //     if (imgSrc!='') {
    //         console.log(":DFgsgfs")
    //         const formData = new FormData()
    //         formData.append("file", imgSrc)
    //         setImage(formData)
    //     }
    // }, [imgSrc])

    
    // useEffect(() => {
    //     console.log("fdjghjdsfhgjsd", imgSrc)
    //     if (imgSrc) {
    //         const formData = new FormData()
    //         formData.append("file", imgSrc)
    //         setImage(formData)
    //     }

    // }, [imgSrc])


    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

    const capture = useCallback(
        () => {
            /*const imageSrc = webcamRef.current.getScreenshot();
            console.log(imageSrc)
            console.log("(^///^)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)")

            const formData = new FormData()
            formData.append("file", imgSrc)*/
            //const buffer = Buffer.from(base64Data, "base64"); 
            const pictureSrc = webcamRef.current.getScreenshot();
            //setPicture(pictureSrc)
            let base64String = pictureSrc.replace(/^data:image\/jpeg;base64,/, "");
            console.log(base64String+"dfghkjjhgfdcghjk")

            setImage(pictureSrc)
            //setOpen(false)

           
          /*
            try {
               
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

        },
        [webcamRef]
    );


    return (
        <>
            <Webcam
                audio={false}
                height={720}
                width={1280}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
            >
            </Webcam>
            <Button onClick={() => setOpen(false)}>X</Button>
            <Button onClick={(capture)}>take picture</Button>
        </>
    )

}

export default Camera



//   return (
//     <div>
//       <h2 className="mb-5 text-center">
//         React Photo Capture using Webcam Example
//       </h2>
//       <div>
//         {picture == '' ? (
//           <Webcam
//             audio={false}
//             height={400}
//             ref={webcamRef}
//             width={400}
//             screenshotFormat="image/jpeg"
//             videoConstraints={videoConstraints}
//           />
//         ) : (
//           <img src={picture} />
//         )}
//       </div>
//       <div>
//         {picture != '' ? (
//           <button
//             onClick={(e) => {
//               e.preventDefault()
//               setPicture()
//             }}
//             className="btn btn-primary"
//           >
//             Retake
//           </button>
//         ) : (
//           <button
//             onClick={(e) => {
//               e.preventDefault()
//               capture()
//             }}
//             className="btn btn-danger"
//           >
//             Capture
//           </button>
//         )}
//       </div>
//     </div>
//   )
// }
// export default Profile


/*
import React, { useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: 'user',
};

const EmotionDetection = () => {
    const [picture, setPicture] = useState('');
    const [result, setResult]=useState('');
    const webcamRef = React.useRef(null);

    const capture = React.useCallback(async () => {
        const pictureSrc = webcamRef.current.getScreenshot();
        setPicture(pictureSrc)
      
        try {
           
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
        }
    });

    return (

        <div className="container">
            <h2 className="text-center">React Photo Capture using Webcam Example</h2>
                <div className="webcam-container">
                    {picture === '' ? (
                            <Webcam
                                audio={false}
                                style={{ width: '400px', height: '400px' }}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                videoConstraints={videoConstraints}
                            />
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
                    <h2>Emotion Result:{result}</h2>
                </div>
            </div>
        </div>
        
    );
};

export default EmotionDetection;*/