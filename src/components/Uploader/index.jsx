
import { useEffect, useState } from "react"
import { IconButton } from "@mui/material"
import { PhotoCamera } from "@mui/icons-material"


const Uploader = ({ file, setFile, label }) => {

  const [selectFile, setSelectFile] = useState()

  useEffect(() => {
    console.log("fdjghjdsfhgjsd", selectFile)
    if (selectFile) {
      const formData = new FormData()
      formData.append("file", selectFile)
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