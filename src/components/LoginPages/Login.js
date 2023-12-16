import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, IconButton, InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function LogIn() {

  const navigate = useNavigate(); // React Router history

  const[isLoading,setIsLoading] = React.useState(false) ; 

  const[error,setError] = React.useState(false) ; 

  const [showPassword, setShowPassword] = React.useState(false); // State to manage password visibility



  React.useEffect(()=>{
    let id = localStorage.getItem("medical-app-remember-me") ; 
    if(id!=null) navigate(`/home/${id}`, { replace: true });
  },[])

    const handleSubmit = (event) => {
    setError(false) ; 
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let userData = {
      email: data.get('email'),
      password: data.get('password'),
      rememberMe : data.get('rememberMe')==="rememberMe"
    } ; 
    logInUser(userData) ;
  };

  const logInUser = async ({ email, password,rememberMe }) => {
    const queryParams = `email=${email}&password=${password}`;
    console.log(queryParams)
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    };
    let req = await fetch(`http://localhost:8080/user?${queryParams}`,options) ; 
    if(req.status!=200) setError(true) ; 
    else{
      let res = await req.json() ; 
      if(rememberMe) localStorage.setItem('medical-app-remember-me', res["id"]);
      navigate(`/home/${res["id"]}`, { replace: true });
    }
  }



  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'blue' }}>
            <VolunteerActivismIcon fontSize='large' />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              control={<Checkbox name ="rememberMe" value="rememberMe" color="primary" />}
              label="Remember me"
            />
            {error && <Alert severity="error">User not found!</Alert>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}