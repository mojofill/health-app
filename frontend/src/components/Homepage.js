import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import '../css/Homepage.css';
import InvigorLogo from './InvigorLogo';
import InvigorNavBar from './InvigorNavBar';

function Homepage() {
  return (
    <div
      style={{
        backgroundColor: 'black',
        height: '100%',
        width: '100%',
        margin: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        color: 'white',
        overflow: 'auto',
        overflowX: 'hidden',
      }}
    >
      <InvigorNavBar />
      <span
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          margin: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Container className='p-0 container-fluid'>
          <div style={{ position: 'absolute', top: '5vh' }}>
            <InvigorLogo />
          </div>
        </Container>
        <div
          id='content section'
          style={{
            marginTop: '30vh',
            position: 'relative',
            fontFamily: 'monospace',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div style={{ width: '100%', textAlign: 'center' }}>
            <h1>The Face of Healthcare</h1>
          </div>
          <div style={{ maxWidth: '55vw', position: 'absolute', marginTop: '5vh' }}>
            {/* TODO FOR HENRY (or vincent) GENERATE SOME FIRE BULLSHIT ABOUT US HEALTHCARE */}
            <p style={{ width: '55vw', marginTop: '5vh' }}>
              US Healthcare is very affordable, which is why Invigor is a better option (free by the way). Invigor is
              all about planning for the future, but better health begins here in the present. Invigor shares the future
              if you look at your present, the future of not only your health but all health.
            </p>
          </div>
        </div>
      </span>
    </div>
  );
}

export default Homepage;
