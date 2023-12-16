import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Textarea from '@mui/joy/Textarea';
import Stack from '@mui/joy/Stack';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Typography from '@mui/joy/Typography';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import Avatar from '@mui/joy/Avatar';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Alert from '@mui/material/Alert';
import Personal from './Personal';
import Favorite from './Favorite';


export default function Profile({userId}) {

  const[selectedPage, setSelectedPage] = React.useState("Personal") ; 

  const updatePage = (event, newValue) => {
    console.log(newValue) ; 
    setSelectedPage(newValue);
  };


  return (
    <Box
      sx={{
        flex: 1,
        width: '100%',
      }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: {
            sm: -100,
            md: -110,
          },
          bgcolor: 'background.body',
          zIndex: 9995,
        }}
      >
        <Tabs
          value={selectedPage} onChange={updatePage}
          sx={{
            bgcolor: 'transparent',
          }}
        >
          <TabList
            tabFlex={1}
            size="sm"
            sx={{
              pl: {
                xs: 0,
                md: 4,
              },
              justifyContent: 'left',
              [`&& .${tabClasses.root}`]: {
                flex: 'initial',
                bgcolor: 'transparent',
                [`&.${tabClasses.selected}`]: {
                  fontWeight: '600',
                  '&::after': {
                    height: '2px',
                    bgcolor: 'primary.500',
                  },
                },
              },
            }}
          >
            <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value="Personal">
              Personal
            </Tab>
            <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value="Favorites">
              Favorite Posts
            </Tab>
          </TabList>
        </Tabs>
      </Box>


      {selectedPage === 'Personal' && <Personal userId={userId} />}
      {selectedPage === 'Favorites' && <Favorite userId={userId} />}


    </Box>
  );
}