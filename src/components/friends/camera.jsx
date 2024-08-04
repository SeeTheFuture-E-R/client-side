import { useEffect, useRef, useState, useCallback } from "react"; // import useCallback
import Webcam from "react-webcam";
import { IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { Button } from "@mui/material";


function Camera({ open, setOpen, image, setImage }) {
    
    const webcamRef = useRef(null)
    const [imgSrc, setImgSrc] = useState('');


    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

    const capture = useCallback(
        () => {
            const pictureSrc = webcamRef.current.getScreenshot();
            let base64String = pictureSrc.replace(/^data:image\/jpeg;base64,/, "");
            console.log(base64String+"dfghkjjhgfdcghjk")

            setImage(pictureSrc)

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



