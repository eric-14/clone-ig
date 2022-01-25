import React, {useState,useEffect} from 'react'
import {db} from './firebase'
import './posts.css'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import firebase from 'firebase'




function Posts({id,username,image,user,caption,number_of_likes,postid}) {

    const [comments, setComments] = useState([])
    const [comment,SetComment]=useState('')
    const postComment = (e) =>{
        e.preventDefault()

        db.collection("posts").doc(postid).collection("comment")
        .add({
            text:comment,
            username:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        })
        SetComment('')
    }
    
    useEffect(() => {
        let unsubscribe;
        if (postid){
          unsubscribe = db.collection('posts').doc(postid)
          .collection("comment")
          .orderBy("timestamp",'desc')
          .onSnapshot((snapshot) => {
              setComments(snapshot.docs.map((doc) => doc.data()))
          })
        }

        
        return () => {
          unsubscribe()
        }
      }, [postid])
     

    return (
        <div className="posts">
                <div className="post_header">
                    <Avatar className="post_avatar" src={image}></Avatar>
                    <p>{username}</p>
                </div>
            
                 <img className="post_image"src={image} alt={`post by :${username}`}></img>

                    
           

                 <div className="post_footer">
                    <p><strong>{username}</strong></p>
                    <p className="post_footercomment">{caption}</p>
                    <p><strong>{number_of_likes}</strong></p>
                </div>

                <div className="post_comments">
                        {comments.map((comment)=>(
                            <p>
                            <strong>{comment.username}</strong> {comment.text}
                        </p>
                        ))}
                          
                </div>

                {(user) ? (
                    <div className="post__comment">
                    <form>
                       <input
                       className="post__input"
                       type="text"
                       placeholder="Add a comment..."
                       value={comment}
                       onChange={(e) => SetComment(e.target.value)}
                       />
                       
                   </form>
                   <div className="post__button">
                   <Button 
                        type="submit"
                        color="primary"
                        onClick={postComment}>Post</Button>
                   </div>
               </div>
                ):(
                    <p>You need to log in/ Sign Up</p>
                )
                        
                }


                
                
         
        </div>
    )
}

export default Posts
