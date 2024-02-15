import React, { useState } from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Link, useNavigate} from "react-router-dom"
import { authUser } from './UserSlice';
import { useDispatch } from 'react-redux';

const Login=()=>{
    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#CBC3E3'}
    const btnstyle={margin:'8px 0'}
    const textfieldStyle={margin: '7px 0 0 0'}
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authUser({ email, password }))
        .then(() => {
            // Fetch userInfo from localStorage
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            const redirectAfterLogin = sessionStorage.getItem("redirectAfterLogin");
            if (userInfo && userInfo.role === 'sellar') {
                navigate('/artistprofile');
            } else if (userInfo && userInfo.role === 'customer') {
                if (redirectAfterLogin) {
                    navigate(redirectAfterLogin);
                    sessionStorage.removeItem("redirectAfterLogin");
                }
            } else {
                navigate("/");
            }
        })
        .catch(error => {
            console.error("Authentication failed:", error);
            // Handle authentication failure (e.g., display error message)
        });
};



  // const handleSubmit = (e) => {

  //   e.preventDefault();
  //   dispatch(
  //     authUser({
  //       email,
  //       password,
  //     })
  //   );
  //   const redirectAfterLogin = sessionStorage.getItem("redirectAfterLogin");
  // const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //   console.log('userInfo',userInfo);
  //   if(userInfo.role === 'sellar'){
  //     navigate('/artistprofile')
  //   }else if(userInfo.role === 'customer'){

  //     if (redirectAfterLogin) {
  //       navigate(redirectAfterLogin);
  //       sessionStorage.removeItem("redirectAfterLogin");
  //   }
  //   } else {
  //     // Redirect to home or another default page
  //     navigate("/");
  //   }
  // };
    return (
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Log In</h2>
          </Grid>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              placeholder="Enter username"
              fullWidth
              required
              style={textfieldStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              placeholder="Enter password"
              type="password"
              fullWidth
              required
              style={textfieldStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox name="checkedB" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={(btnstyle, { backgroundColor: "#CBC3E3" })}
              fullWidth
            >
              Log in
            </Button>
          </form>
          <Typography>
            <Link href="#">Forgot password ?</Link>
          </Typography>
          <Typography>
            Do you have an account ?<Link to={"/signup"}>Sign Up</Link>
          </Typography>
        </Paper>
      </Grid>
    );
}

export default Login

 