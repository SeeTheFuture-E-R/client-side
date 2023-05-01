
import { useState } from 'react'
import { CircularProgress } from '@mui/material'

const PdfViewer = ({ url, fileName }) => {

    const [isLoading, setIsLoading] = useState(true)

    return (
        <>
            {isLoading && <CircularProgress />}
            <iframe
                src={`../../../documents/${url}`}
                width="100%"
                height="100%"
                key={fileName}
                onLoad={() => setIsLoading(false)}
            />
        </>
    )
}

export default PdfViewer


// const Viewer = ({ url, fileName }) => {

//     if (isImage(url)) return <ImageViewer url={url} />


//     if (isPDF(url)) return <PdfViewer url={url} fileName={fileName} />


//     return (

//         <Typography>

//             An Error occurred while trying to display the file!

//             <br /> Please Try

//             <a href={url} target="_blank" rel="noreferrer">

//                 opening in new tab

//             </a>

//         </Typography>

//     )

// }


// export default Viewer

//     // =======================================================


// const OPEN_WITH_IMG_TAG = ['.gif', '.jpg', '.jpeg', '.png', '.svg', '.webp']


// export const isImage = (path: string): boolean =>

//     OPEN_WITH_IMG_TAG.some(ext => path.endsWith(ext))


// export const isPDF = (path: string): boolean =>

//     path.endsWith('.pdf')




//     // ===========================

    // ImgViewer



    // < img src = { url } />
    
    
    
    
//     // =====================================



