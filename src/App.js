import React, {useState , useEffect} from 'react';
import Header from './Header'
import './App.css';
import Posts from './Posts'
import {db , auth }from './firebase'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';
import ImageUpload from './ImageUpload'
import InstagramEmbed from 'react-instagram-embed';
function getModalStyle() {
  const top = 50 ;
  const left = 50  ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles()
  const [posts, setPosts] = useState([])
  const [open,setOpen] = useState(false);
  

  
  const [username, setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  
  const [open_signin, setOpen_signin] = useState(false)
  


  useEffect(() => {
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot =>{
      setPosts(snapshot.docs.map(doc =>({
        id:doc.id,
        post: doc.data()
      }) ))  
    })
    
  }, [user])

  useEffect(() => {
   const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
        console.log(authUser,'inside setuser')
        setUser(authUser)
      }else{
        setUser(null)
      }
    })
    return () => {
     unsubscribe();
    }
  }, [user, username])

  


  const signin = event =>{
    event.preventDefault()

    auth.signInWithEmailAndPassword(email,password)
    .catch((err) => alert(err.message))

    setOpen_signin(false)
  }


  const signup = (event) =>
  {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email,password)
    .then((authUser) => {
      return authUser.user.updateProfile({
         displayName: username,
      })
      
      
      
    })
    .catch((error) => alert(error.message))
    setOpen(false)
  }

  return (

    <div className="App">

        <Header postid={posts.id} user={user}/>
     
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description">

            <div style={modalStyle} className={classes.paper}>
              <form className="app_signup">
                <center>
                <img className="appmodal_logo" 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSe1mXowQOoDhnVexElVo_B017a1E__nKe8Yw&usqp=CAU"
                alt="appmodal_logo"
                ></img>
                </center>
                

                <input type="text" 
                value={username}
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}>

                </input>
                <input type="email" 
                value={email}
                placeholder="email "
                onChange={(e) => setEmail(e.target.value)}>

                </input>

                <input type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>setPassword(e.target.value)}
                >
                </input>
  
       
                <Button type="submit" onClick={signup}>Sign Up</Button>

              
              </form>
             
            </div>

        </Modal>

        <Modal
          open={open_signin}
          onClose={() => setOpen_signin(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description">

            <div style={modalStyle} className={classes.paper}>
              <form className="app_signup">
                <center>
                <img className="appmodal_logo" 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSe1mXowQOoDhnVexElVo_B017a1E__nKe8Yw&usqp=CAU"
                alt="appmodal_logo"
                ></img>
                </center>
               
                <input type="email" 
                value={email}
                placeholder="email "
                onChange={(e) => setEmail(e.target.value)}>

                </input>

                <input type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>setPassword(e.target.value)}
                >
                </input>
  
       
                <Button type="submit" onClick={signin}>Sign In</Button>

              
              </form>
             
            </div>

        </Modal>




      {user ? ( 
      <Button onClick={() => auth.signOut().then(console.log('user has logged out'))}>LogOut</Button>
      ):(
        <div className="app_logincontainer">
          <Button onClick={() => setOpen_signin(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>SignUp</Button>
    
        </div>
      )}

     
    <div className="app_post">

      <div className="app_postleft">
      {
       posts.map(({id,post}) => {
         return <Posts key={id}
          postid={id}
          user={user}
          username={post.username}
          profile_image={post.profile_image}
          image={post.image}
          caption={post.caption}
          number_of_likes={post.number_of_likes}
          />
       })
     }
      </div>
      <div className="app_postright">
     
 
<InstagramEmbed
  url='https://instagr.am/p/Zw9o4/'
  maxWidth={320}
  hideCaption={false}
  containerTagName='div'
  protocol=''
  injectScript
  onLoading={() => {}}
  onSuccess={() => {}}
  onAfterRender={() => {}}
  onFailure={() => {}}
/>
       
      </div>
     
    </div>

    
   
     
     {user?.displayName ? ( 
     <ImageUpload username={user.displayName}/>
     ):(<h3>Sorry you need to sign in</h3>)
     }
      
  



      
      <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description">

            <div style={modalStyle} className={classes.paper}>
              <form className="app_signup">
                <center>
                <img className="appmodal_logo" 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSe1mXowQOoDhnVexElVo_B017a1E__nKe8Yw&usqp=CAU"
                alt="appmodal_logo"
                ></img>
                </center>
                

                
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description">

            <div style={modalStyle} className={classes.paper}>
              <form className="app_signup">
                <center>
                <img className="appmodal_logo" 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSe1mXowQOoDhnVexElVo_B017a1E__nKe8Yw&usqp=CAU"
                alt="appmodal_logo"
                ></img>
                </center>
                

                <input type="text" 
                value={username}
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}>

                </input>
                <input type="email" 
                value={email}
                placeholder="email "
                onChange={(e) => setEmail(e.target.value)}>

                </input>

                <input type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>setPassword(e.target.value)}
                >
                </input>
  
       
                <Button type="submit" onClick={signup}>Sign Up</Button>

              
              </form>
             
            </div>

        </Modal>

  
       
                <Button type="submit" onClick={signup}>Sign Up</Button>

              
              </form>
             
            </div>

        </Modal>

    </div>
  );
}

export default App;
