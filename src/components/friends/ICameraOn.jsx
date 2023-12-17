
import React, { useState } from 'react';
import axios from 'axios';

function ICameraOn(props) {

    const stratTrial = async () =>{

        const res = await axios.post(`http://localhost:8000/02`)
        res = await axios.post(`http://localhost:8000/03`)
    }

    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };
  
    const handleUpload = async () => {
      try {
        const formData = new FormData();
        formData.append('file', file);
  
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
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload File</button>
        <button onClick={stratTrial}>התחל נסיון</button>
      </div>
    );
}


export default ICameraOn;
