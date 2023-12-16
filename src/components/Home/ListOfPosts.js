import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import Post from "./Post";
import PropTypes from 'prop-types';
import AppsIcon from '@mui/icons-material/Apps';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';



function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const ListOfPosts = ({ userId }) => {

  const [posts, setPosts] = useState([]);


  const [value, setValue] = useState(0);



  useEffect(() => {
    async function getAllPosts() {
      try {
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        };
        let req = await fetch(`http://localhost:8080/posts`, options);
        if (req.status != 200) return;
        let posts = await req.json();
        let req2 = await fetch(`http://localhost:8080/favorite/${userId}`, options);
        if (req2.status != 200) return;
        let postsIds = await req2.json();
        console.log("postsids,", postsIds)
        // Map through the posts to update the 'favorite' attribute
        let updatedPosts = posts.map((post) => {
          // Check if the current post ID exists in the list of favorite post IDs
          const isFavorite = postsIds.includes(post.id);
          // Add 'favorite' attribute to each post object
          return { ...post, favorite: isFavorite };
        });

        // Set the updated posts state
        setPosts(updatedPosts);
      }
      catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    getAllPosts();

  }, [])


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>


      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="All" {...a11yProps(0)} icon={<AppsIcon/>} />
            <Tab label="Needing Help" {...a11yProps(1)}  icon={<WavingHandIcon/>}/>
            <Tab label="Providing Help" {...a11yProps(2)} icon={<VolunteerActivismIcon/>} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
            {posts.map((post) => (
              <Post
                key={post.id}
                id={post.id}
                title={post.title}
                body={post.body}
                user={post.user}
                date={post.date}
                type={post.type}
                favorite={post.favorite}
                currentUserId={userId}
              />
            ))}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
         {
          posts.filter(p=>p.type=="Asking for help").map((post) => (
            <Post
              key={post.id}
              id={post.id}
              title={post.title}
              body={post.body}
              user={post.user}
              date={post.date}
              type={post.type}
              favorite={post.favorite}
              currentUserId={userId}
            />
          ))
         }
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
        {
          posts.filter(p=>p.type=="Providing help").map((post) => (
            <Post
              key={post.id}
              id={post.id}
              title={post.title}
              body={post.body}
              user={post.user}
              date={post.date}
              type={post.type}
              favorite={post.favorite}
              currentUserId={userId}
            />
          ))
         }
        </CustomTabPanel>
      </Box>
    </div>
  );
}

export default ListOfPosts; 