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

    // const capture1 = () => {
    //     const imageSrc = webcamRef.current.getScreenshot();
    //     setImgSrc(imageSrc);
    //     setOpen(false)
    // }

    const capture = useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            console.log(imageSrc)
            const formData = new FormData()
            formData.append("file", imgSrc)
            setImage(formData)
            setOpen(false)
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