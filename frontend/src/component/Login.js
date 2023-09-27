import React, {useState} from 'react'
import { TextField, Button, Container, Stack } from '@mui/material';
import { Link } from "react-router-dom"

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setcPassword] = useState('')
 
    function handleSubmit(event) {
        event.preventDefault();
        console.log(email, password, cpassword) 
    }
  return (
    <div className='container my-3'>
            <h3>Login Form</h3>
            <form onSubmit={handleSubmit} action={<Link to="/login" />} className='my-3'>
                <TextField
                    type="email"
                    variant='outlined'
                    color='secondary'
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
                <TextField
                    type="password"
                    variant='outlined'
                    color='secondary'
                    label="Password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    required
                    fullWidth
                    sx={{mb: 4}}
                />
                <TextField
                    type="password"
                    variant='outlined'
                    color='secondary'
                    label="Confirm Password"
                    onChange={e => setcPassword(e.target.value)}
                    value={cpassword}
                    required
                    fullWidth
                    sx={{mb: 4}}
                />
                <Button variant="outlined" color="secondary" type="submit">Login</Button>
            </form>
            <small>Don't have an account? <Link to="/register">Register Here</Link></small>
     
        </div>
    )
}
export default Login;