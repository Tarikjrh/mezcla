import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseconfig';

export default function LogInPage() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');


    function handleLogin() {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('user logged in')
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }


    return (
        <Box sx={{ '& > :not(style)': { m: 1 }, display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center', }} mt={{ xs: 10 }}>
            <TextField
                id="input-with-icon-textfield"
                label="Email"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    ),
                }}
                variant="standard"
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
                type={'text'}
            />
            <TextField
                id="input-with-icon-textfield"
                label="Password"
                variant="standard"
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
                type={'password'}
            />
            <Button onClick={handleLogin}>
                Log In
            </Button>
        </Box>
    )
}
