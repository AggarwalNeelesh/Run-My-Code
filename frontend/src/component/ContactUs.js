import React, {useState} from 'react'
import { TextField, Button, Container, Stack } from '@mui/material';
import { Link } from "react-router-dom"

function ContactUs() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [message, setMessage] = useState('')
 
    function handleSubmit(event) {
        event.preventDefault();
        console.log(firstName, lastName, email, number, message);
    }
  return (
    <div className='container my-3'>
            <h3>Contact Us</h3>
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
                <Stack>
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
                        type="number"
                        variant='outlined'
                        color='secondary'
                        label="Contact Number"
                        onChange={e => setNumber(e.target.value)}
                        value={number}
                        fullWidth
                        sx={{mb: 4}}
                    />
                </Stack>
                <TextField
                    type="text"
                    variant='outlined'
                    color='secondary'
                    label="Message"
                    onChange={e => setMessage(e.target.value)}
                    value={message}
                    fullWidth
                    rows={3}
                    sx={{mb: 4}}
                />
                <Button variant="outlined" color="secondary" type="submit">Submit</Button>
            </form>
     
        </div>
    )
}
export default ContactUs;