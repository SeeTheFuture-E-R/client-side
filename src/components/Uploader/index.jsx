
import { useEffect, useState } from "react"
import axios from "axios"
import { IconButton } from "@mui/material"
import { PhotoCamera } from "@mui/icons-material"
import { Input } from "@mui/material"

const Uploader = ({ file, setFile, label }) => {

  const [selectFile, setSelectFile] = useState()

  useEffect(() => {
    if (selectFile) {
      const formData = new FormData()
      formData.append("file", selectFile)
    //   axios.post("http://localhost:9660/upload", formData).then(({ data }) => {
    //     if (data?.name) {
    //       setFile(data.name)
    //     }
    //   }).catch(err => {
    //     console.log("error")
    //   })
    // 
    setFile(formData)
  }

  }, [selectFile])


  return (
    <>
      <IconButton color="primary" aria-label="upload picture" component="label">
        <input hidden accept="image/*" type="file" onChange={(e)=> setSelectFile(e.target.files[0])}/>
        <PhotoCamera />
      </IconButton>

    </>
  )
}

export default Uploader