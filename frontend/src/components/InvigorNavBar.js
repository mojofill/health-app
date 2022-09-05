import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import InvigorLogo from './InvigorLogo';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function InvigorNavBar(props) {
  const navigate = useNavigate();

  const redirect = (endpoint) => {
    console.log(endpoint);
    navigate(`/${endpoint}`);
  };

  function RedirectButton(props) {
    return (
      <p
        className='my-auto ms-5 me-2 text-light'
        id='redirectButton'
        style={{ cursor: 'pointer' }}
        onClick={() => props.onRedirect()}
      >
        {props.name}
      </p>
    );
  }

  return (
    <Navbar expand='lg' style={{ backgroundColor: 'rgb(50, 50, 50)' }}>
      <Container>
        <Navbar.Brand href='/' className='text-light h1 my-auto' style={{ fontFamily: 'serif', fontSize: 30 }}>
          Invigor
        </Navbar.Brand>
        <Navbar.Text>
          <Nav className='me-auto'></Nav>
          {!props.signedIn ? <></> : <RedirectButton name='Home' onRedirect={() => redirect('user')} />}
        </Navbar.Text>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />

        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'></Nav>
          {props.signedIn ? <></> : <RedirectButton name='Login' onRedirect={() => redirect('login')} />}
          {props.signedIn ? <></> : <RedirectButton name='Sign Up' onRedirect={() => redirect('signup')} />}
          {props.signedIn ? (
            <RedirectButton
              name='Log out'
              onRedirect={() => {
                axios.post('http://localhost:1000/api/auth/logout').then(() => redirect(''));
              }}
            />
          ) : (
            <></>
          )}
          <RedirectButton name='About' onRedirect={() => redirect('about')} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default InvigorNavBar;
