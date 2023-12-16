import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';


export default function CreatePost({userId}) {
  const [type, setType] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const[success,setSuccess] = useState(false) ; 
  const[failure,setFailure] = useState(false) ; 

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };


  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const categories = [
    "Providing help",
    "Asking for help"
  ];
 

  const savePost = async()=>{

    console.log(!type)
    console.log(!title)
    console.log(!content)

    if(!type || !title || !content) return ; 

    const postData = {
        type: type,
        title: title,
        body: content,
        userId : userId 
      };

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      };
      let req = await fetch("http://localhost:8080/post",options) ; 
      if(req.status==200){
        setContent("") ;
        setTitle("") ; 
        setType("");
        setSuccess(true) ; 
        setTimeout(()=> setSuccess(false),3000)
      }
      else{
        setFailure(true) ; 
        setTimeout(()=> setFailure(false),3000)
      }
  
      console.log(postData); // This will log all the filled data
   
  }
  return (
    <React.Fragment>
      <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%" }}>
        <Box sx={{ padding: 5 }}>
          <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
            Medical Post
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700
                }}
              >
                Title
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                required
                id="title"
                name="title"
                label="Title"
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
                value={title}
                onChange={handleTitleChange}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700
                }}
              >
                Content
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                id="outlined-multiline-static"
                label="Content"
                multiline
                fullWidth
                rows={4}
                value={content}
                onChange={handleContentChange}
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700
                }}
              >
                Type
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="Type"
                  onChange={handleTypeChange}
                >
                  {categories.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={2}>
            <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700
                }}
              >
                Image Upload
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={4}>
            <Button>
                <UploadFileIcon />
              </Button>
            </Grid>
            <Grid item xs={12} sm={2}>
            </Grid>
            <Grid item xs={12} sm={4}>

            </Grid>
            <Grid item xs={12} sm={6} />
            <Grid item xs={12} sm={5} />
            <Grid item xs={12} sm={4}>
              <Button variant="contained" onClick={savePost}>
                Share
              </Button>
            </Grid>
            <Grid item xs={12} sm={5} />
          </Grid>
         { success && <Alert severity="success">Post has been uploaded!</Alert> }
         {failure &&<Alert severity="error">Error, failed to share your post...</Alert> }

        </Box>

      </Paper>
    </React.Fragment>
  );
}
