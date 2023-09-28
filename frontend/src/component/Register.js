import React, {useState} from 'react'
import { TextField, Button, Container, Stack } from '@mui/material';
import { Link } from "react-router-dom"

function Register() {
  const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('dd-mm-yy')
    const [password, setPassword] = useState('')
 
    function handleSubmit(event) {
        event.preventDefault();
        console.log(firstName, lastName, email, dateOfBirth, password) 
    }
  return (
    <div className='container my-4 px-5 py-3'
    style={{border:"2px solid grey",'border-radius':'10px','box-shadow':'3px 3px grey'}}>
            <h3>Register Form</h3>
            <form onSubmit={handleSubmit} action={<Link to="/login" />} className='my-3'>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="First Name"
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                        fullWidth
                        required
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Last Name"
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
                        fullWidth
                        required
                    />
                </Stack>
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
                    type="date"
                    variant='outlined'
                    color='secondary'
                    label="Date of Birth"
                    onChange={e => setDateOfBirth(e.target.value)}
                    value={dateOfBirth}
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
                <Button variant="outlined" color="secondary" type="submit">Register</Button>
            </form>
            <small>Already have an account? <Link to="/login">Login Here</Link></small>
     
        </div>
    )
}
export default Register;