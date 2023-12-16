import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SendIcon from '@mui/icons-material/Send';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

export default function Header(props) {

    const[selectedPage, setSelectedPage] = React.useState("Home") ; 

    const navigate = useNavigate(); // React Router history


    const updatePage = (event, newValue) => {
        console.log(newValue) ; 
        setSelectedPage(newValue);
        props.updatePage(newValue) ; 
      };

    const logOut = ()=> {
        localStorage.removeItem("medical-app-remember-me") ; 
        navigate("/");
    }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Tabs value={selectedPage} onChange={updatePage} aria-label="basic tabs example"
               sx={{
                '& .MuiTabs-root': {
                  backgroundColor: 'white',
                },
                '& .MuiTab-root': {
                  color: 'white',
                  fontWeight: 'bold',
                  '&.Mui-selected': {
                    borderBottom: '2px solid white',
                    color: 'white',
                  },
                },
              }}
          >
          <Tab label="Home" value="Home" style={{color:"white"}}  icon={<HomeIcon/>}/>
          <Tab label="Profile" value="Profile" icon={<AccountBoxIcon/>} />
          {/* <Tab label="Favorites" value="Favorites" /> */}
          <Tab label="Create" value="Create" icon={<AddIcon/>}/> 
          </Tabs>
          </Typography>
          <Button color="inherit" startIcon={<LogoutIcon/>} onClick={logOut}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}