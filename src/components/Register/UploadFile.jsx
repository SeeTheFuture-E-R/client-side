import { useState, useEffect } from 'react'
import { UploadFile } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { IconButton } from '@mui/material'


const MyUploadFile = ({ file, setFile}) => {

    const [selectFile, setSelectFile] = useState()


    useEffect(() => {
        console.log(selectFile)
        if (selectFile) {
            console.log(selectFile)
            // const formData = new FormData()
            // formData.append("file", selectFile)
            // console.log(formData)
            setFile(selectFile)
        }
    }, [selectFile])

    return (
        <Box
            sx={{
                gap: 1,
                padding: 3,
                display: 'flex',
                cursor: 'pointer',
                borderRadius: 0.5,
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
                border: '1px dotted rgba(0, 0, 0, 0.12)'
            }}
        >
            <>
                <IconButton color="primary" aria-label="upload file" component="label">
                    <input hidden type="file" onChange={(e) => setSelectFile(e.target.files[0])}></input>
                    <UploadFile />
                </IconButton>

                {/* <UploadFile color="primary">
                <input type="file" onChange={(e) => setSelectFile(e.target.files[0])} />
                </UploadFile> */}
                <Typography>
                    Click to upload
                </Typography>

                <Typography fontSize={'14px'} color="rgba(0, 0, 0, 0.6)">
                    PDF (max. 3MB)
                </Typography>
                {selectFile.name && <span>{selectFile.name}</span>} 
            </>
            {/* <PdfViewer url={'../../../documents/1.pdf'} fileName={"1"}></PdfViewer> */}
        </Box>
    )
}


export default MyUploadFile

