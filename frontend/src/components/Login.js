import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import InvigorNavBar from './InvigorNavBar';
import axios from 'axios'; 
import sha256 from 'crypto-js/sha256';
import CryptoJS from 'crypto-js'; 

function Login() {
    const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [warning, setWarning] = useState('');
	
	const navigate = useNavigate();
	
	const onSubmit = async (e) => {
		if (username === '' || password === '') {
			setWarning('Make sure all fields are completed!');
			return;
		}
		
		e.preventDefault();

		try {
			await axios.post('http://localhost:1000/api/auth/login', {
				username: username,
				password: sha256(password).toString(CryptoJS.enc.Base64),
			});

			const data = await axios.get('http://localhost:1000/api/user/me');
			console.log(data.data); 

			if (!data.data) throw new Error("Internal error. Try again later. "); 

			navigate(`/user${data.data.isSetUp ? '' : '/setup'}`)

		} catch (err) { 
			console.log(err); 
			setWarning(err.response.data.error); 
			// console.log(err.response.data)
		}
	};

	useEffect(() => {
		axios.get('http://localhost:1000/api/user/isAuthenticated').then(async () => {
			const data = await axios.get('http://localhost:1000/api/user/me');
			console.log(data.data); 

			if (!data.data) return; 

			navigate(`/user${data.data.isSetUp ? '' : '/setup'}`)
		}); 
	}, []); 
	
	return (
		<>
		<InvigorNavBar />
	    <div
		style={{
			justifyContent: 'center',
			alignItems: 'center',
			height: '100%',
			width: '100%',
			position: 'fixed',
			display: 'flex',
			backgroundColor: 'black'
		}}
		>
			<Card style={{padding: 15, width: '20rem', height: '22rem', position: 'relative'}}>
				<form onSubmit={onSubmit}>
				<h1>Login</h1>
				<br />
				<Form.Control
					style={{maxWidth: 'auto'}} type='text' autoFocus
					placeholder='Username'
					onChange={(e) => setUsername(e.target.value)}
				/>
				<br />
				<Form.Control
					style={{maxWidth: 'auto'}} type='password' placeholder='Password'
					onChange={(e) => setPassword(e.target.value)}
				/>
				<br />
				{warning !== '' ? <Alert variant='danger'>{warning}</Alert> : <></>}
				<Button style={{bottom: 10, position: 'absolute'}} variant='primary' onClick={onSubmit}>
				Submit
				</Button>
				</form>
			</Card>
		</div>
		</>
	);
}


export default Login;
