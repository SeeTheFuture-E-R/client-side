
import { useEffect, useState } from "react"
import { IconButton } from "@mui/material"
import { PhotoCamera } from "@mui/icons-material"


const Uploader = ({ file, setFile, label }) => {

  const [selectFile, setSelectFile] = useState()
  const [fileName, setFileName] = useState("") // Add state for filename

  useEffect(() => {
    console.log("fdjghjdsfhgjsd", selectFile)
    if (selectFile) {
      const formData = new FormData()
      formData.append("file", selectFile)
    setFile(formData)
    setFileName(selectFile.name)
  }

  }, [selectFile])

  return (
    <>
    <IconButton color="primary" aria-label="upload picture" component="label">
      <input hidden accept="image/*" type="file" onChange={(e)=> setSelectFile(e.target.files[0])}/>
      <PhotoCamera />
    </IconButton>
    {fileName && <span>{fileName}</span>} {/* Display filename if it exists */}
  </>
  )
}

export default Uploader