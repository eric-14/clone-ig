import  React from 'react'
import './header.css'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import Avatar from '@material-ui/core/Avatar';
import home from './home.svg'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import email_send from './email-send.png'



import PhotoCamera from '@material-ui/icons/PhotoCamera';






function Header({postid,user}) {
    return (

           <div className="Header">
            < div className="header_left">
             <PhotoCamera />

               <img className="header_logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSe1mXowQOoDhnVexElVo_B017a1E__nKe8Yw&usqp=CAU" alt="instagram_logo"></img>
            </div>


            <div className="header_center">
                 <SearchOutlinedIcon className="header_searchicon" />

                <input type="text" placeholder="search"></input>
               
               
            </div>

            <div className="header_right">
               <img className="home_icon" src={home} alt="home_logo"></img>
               <img className="email_send" src={email_send} alt="email"></img>
                <ExploreOutlinedIcon  className="explore_icon"/>
                <FavoriteBorderOutlinedIcon className="favourite_icon" />
               <Avatar className="header_avatar" src="data:image/png;base64,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" alt="">
                   userå
               </Avatar>
            </div>
           
        </div>
    )
        }

export default Header
