import React, {useState} from 'react'
import './imageupload.css'
import { Button } from '@material-ui/core'
import {storage,db} from './firebase'
import firebase from "firebase"
function ImageUpload({username}) {
    const [caption,setCaption] = useState('')
    const [image, setImage] = useState('')
    const [progress, setProgress] = useState(0)
    

    const handleChange =(e) =>{
        if (e.target.files[0]){
            setImage(e.target.files[0])
        }
    }
    const handleUpload =() =>{
        const uploadtask = storage.ref(`images/${image.name}`).put(image)
        uploadtask.on(
            "state_changed",
            (snapshot) => {
                //progress logic
                const progress = Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes)*100
                )
                setProgress(progress)
            },
            (error) =>{
                console.log(error)
                alert(error.message)
            },
            () => {
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url =>{
                    db.collection("posts").add({
                        timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                        caption:caption,
                        image: url,
                        username:username
                    })
                    setProgress(0)
                    setCaption("")
                    setImage("")
                    
                })
            }
        )
    }
    
    return (
        <div className="imageupload">
            <progress value={progress} max="100" />
            <input type="text" placeholder="Enter a caption" onChange={ event => setCaption(event.target.value)}></input>
            <input type="file" onChange={handleChange}></input>
            <Button onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUpload
