import React, {useState} from 'react'
import { TextField, Button, Stack } from '@mui/material';
import emailjs from 'emailjs-com';

function ContactUs(props) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const handleForm =(e)=> {
        e.preventDefault();
        emailjs.sendForm('service_qvtj0bc', 'template_8anfeo6', e.target, 'jUjBJzaANEV6I2ZKe')
        .then((result) => {
            window.location.reload()  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
            props.showAlert("Email Sent Successfully", "primary");
        }, (error) => {
            console.log(error.text);
            props.showAlert("Error occured in sending Email. PLease try after some time...", "warning");
        });
    }
  return (
    <div className='container my-4 px-5 py-3'
        style={{border:"2px solid grey",'border-radius':'10px','box-shadow':'3px 3px grey'}}
    >
            <h3>Contact Us</h3>
            <form onSubmit={handleForm} className='my-3'>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        name="from_name"
                        label="Full Name"
                        onChange={e => setName(e.target.value)}
                        value={name}
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
                        name="from_email"
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
                        name="contact_number"
                        label="Contact Number"
                        onChange={e => setNumber(e.target.value)}
                        value={number}
                        fullWidth
                        sx={{mb: 4}}
                    />
                </Stack>
                <Stack>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        name="subject"
                        label="Subject"
                        onChange={e => setSubject(e.target.value)}
                        value={subject}
                        fullWidth
                        multiline
                        maxRows={4}
                        sx={{mb: 4}}
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        name="message"
                        label="Message"
                        onChange={e => setMessage(e.target.value)}
                        value={message}
                        fullWidth
                        sx={{mb: 4}}
                    />
                </Stack>
                <Button variant="outlined" color="secondary" type="submit">Submit</Button>
            </form>
     
        </div>
    )
}
export default ContactUs;
/*
First, we load our EmailJS SDK

<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
Second, we initialize the SDK with our public key

Public Key : jUjBJzaANEV6I2ZKe

emailjs.init('YOUR_PUBLIC_KEY');
Third, we submit our contact form and send it through EmailJS, using our Contact Service and Contact Form:

emailjs.sendForm('contact_service', 'contact_form', this)
*/