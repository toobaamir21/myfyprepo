import React, { useState } from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { confirmEmail } from './UserSlice';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Signup = () => {
    const paperStyle = { padding: '30px 20px', width: 300, margin: "20px auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#CBC3E3' }
    const marginTop = { marginTop: 5 }
    const textfieldStyle={margin: '7px 0 0 0'}
    const [name,setName] = useState('')
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
    const navigate = useNavigate()
const handleSubmit = (e) => {
  e.preventDefault();
  dispatch(
    confirmEmail({
      fullname: name,
      email,
      role,
      phone,
      password,
    })
  );
  navigate("/confirmpage");
};
    return (
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <AddCircleOutlineOutlinedIcon />
            </Avatar>
            <h2 style={headerStyle}>Sign Up</h2>
            <Typography variant="caption" gutterBottom>
              Please fill this form to create an account !
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              placeholder="Enter your name"
              style={textfieldStyle}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Email"
              placeholder="Enter your email"
              style={textfieldStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormControl component="fieldset" style={marginTop}>
              <FormLabel component="legend">Role</FormLabel>
              <RadioGroup
                aria-label="role"
                name="role"
                style={{ display: "initial" }}
              >
                <FormControlLabel
                  control={<Radio />}
                  label="Customer"
                  value="customer"
                  onChange={(e) => setRole(e.target.value)}
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Sellar"
                  value="sellar"
                  onChange={(e) => setRole(e.target.value)}
                />
              </RadioGroup>
            </FormControl>
            <TextField
              fullWidth
              label="Phone Number"
              placeholder="Enter your phone number"
              style={textfieldStyle}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              fullWidth
              label="Password"
              placeholder="Enter your password"
              style={textfieldStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#CBC3E3" }}
            >
              Sign up
            </Button>
          </form>
        </Paper>
      </Grid>
    );
}

export default Signup;