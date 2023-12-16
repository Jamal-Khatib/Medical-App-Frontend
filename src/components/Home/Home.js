import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Header from './Header';
import ListOfPosts from './ListOfPosts';
import Profile from './Profile';
import Favorite from './Favorite';
import CreatePost from './CreatePost';
import { useParams } from 'react-router-dom';



export default function Home() {

    const[selectedPage,setSelectedPage] = React.useState("Home") ; 

    let { userId } = useParams();


    const updatePage = (page) => setSelectedPage(page);


    React.useEffect(()=>{
       console.log("Current User ID ",userId) ; 
    },[])



    return (
        <> 
        <Header updatePage={updatePage} userId={userId}/>
    {selectedPage === "Home" && <ListOfPosts userId={userId}/>}
      {selectedPage === "Profile" && <Profile userId={userId}/>}
      {selectedPage === "Favorites" && <Favorite userId={userId}/>}
      {selectedPage === "Create" && <CreatePost userId={userId}/>}
        </>
);

}