import React from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const Login=()=>{
    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#CBC3E3'}
    const btnstyle={margin:'8px 0'}
    const textfieldStyle={margin: '7px 0 0 0'}
  
    return(
        <Grid>
        <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
                 <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                <h2>Log In</h2>
            </Grid>
            <TextField label='Username' placeholder='Enter username' fullWidth required style={textfieldStyle}/>
            <TextField label='Password' placeholder='Enter password' type='password' fullWidth required style={textfieldStyle}/>
            <FormControlLabel
                control={
                <Checkbox
                    name="checkedB"
                    color="primary"
                />
                }
                label="Remember me"
             />
            <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth style={{ backgroundColor: '#CBC3E3' }}>Log in</Button>
            <Typography >
                 <Link href="#" >
                    Forgot password ?
            </Link>
            </Typography>
            <Typography > Do you have an account ?
                 <Link href="#" >
                    Sign Up 
             </Link> 
            </Typography>
        </Paper>
    </Grid>
)
}

export default Login

 