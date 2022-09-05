import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import InvigorNavBar from './InvigorNavBar';
import SetupAccount from './SetupAccount';
import axios from 'axios';
import sha256 from 'crypto-js/sha256';
import CryptoJS from 'crypto-js';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    if (username === '' || password === '') {
      setWarning('Make sure all fields are completed!');
      return;
    }

    e.preventDefault();

    try {
      await axios.post('http://localhost:1000/api/auth/signup', {
        username: username,
        password: sha256(password).toString(CryptoJS.enc.Base64),
        firstName: firstName,
        lastName: lastName,
      });
      navigate('/login');
    } catch (err) {
      console.log(err);
      setWarning(err.response.data.error);
    }
  };

  useEffect(() => {
    axios.get('http://localhost:1000/api/user/isAuthenticated').then(async () => {
      const data = await axios.get('http://localhost:1000/api/user/me');

      if (!data.data) return;

      navigate(`/user${data.data.isSetUp ? '' : '/setup'}`);
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
          backgroundColor: 'black',
        }}
      >
        <Card style={{ padding: 15, width: '20rem', height: 'fit-content', position: 'relative' }}>
          <form onSubmit={onSubmit}>
            <h1>Sign Up</h1>
            <br />
            <Form.Control
              style={{ maxWidth: 'auto' }}
              type='text'
              autoFocus
              placeholder='Username'
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <Form.Control
              style={{ maxWidth: 'auto' }}
              type='password'
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <Form.Control
              style={{ maxWidth: 'auto' }}
              type='text'
              placeholder='First Name'
              onChange={(e) => setFirstName(e.target.value)}
            />
            <br />
            <Form.Control
              style={{ maxWidth: 'auto' }}
              type='text'
              placeholder='Last Name'
              onChange={(e) => setLastName(e.target.value)}
            />
            {warning !== '' ? <Alert variant='danger'>{warning}</Alert> : <></>}
            <br />
            <Button style={{ bottom: 10 }} variant='primary' onClick={onSubmit}>
              Submit
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
}

export default Signup;
