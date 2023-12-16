import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import SendIcon from '@mui/icons-material/Send';
import Tooltip from '@mui/material/Tooltip';


export default function Post({ id, title, body, user, date, type,favorite: initialFavorite,currentUserId }) {

  const [favorite, setFavorite] = React.useState(initialFavorite);

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  const handleToggleFavorite = async ()=>{
    let newStatus = !favorite ; 
    setFavorite((e)=>!e) ; 
    //post id and user Id
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      };
    let req = await fetch(`http://localhost:8080/favorite/${currentUserId}/${id}?favorite=${newStatus}`,options) ; 
  }

  const handleSendEmail = () => {
    window.location.href = `mailto:${user.email}`;
  };

  return (
    <Card
      variant="outlined"
      sx={{
        width: 800,
        margin: '20px auto',
        overflow: 'auto',
        resize: 'horizontal',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between', // Align items to the right
          marginBottom: '10px', // Add margin at the bottom for separation
        }}
      >
         <Tooltip title={user.email} placement="right" arrow> 
        <Box 
        sx={{ display: 'flex', alignItems: 'center' } }>
          <Avatar src="/static/images/avatar/1.jpg" size="lg" />
          <h3> {user.fullName}</h3>
        </Box>
        </Tooltip>
        <Typography variant="caption">{formattedDate}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button variant="outlined" color="neutral" sx={{ mr: '5px' }} onClick={handleToggleFavorite}>
            {favorite?  <StarIcon color='primary'/> :  <StarBorderIcon /> }
          </Button>
          <Button variant="solid" color="primary" onClick={handleSendEmail}>
            Send Email
          </Button>
        </Box>
      </Box>
      <CardContent>
        <Typography level="title-lg">{title}</Typography>
        <Typography level="body-sm">{body}</Typography>
      </CardContent>
    </Card>
  );
}
