import InvigorNavBar from "./InvigorNavBar";
import InvigorLogo from "./InvigorLogo";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

function About() {
    return (
        <div style={{
            backgroundColor: "black",
            height: '100%',
            width: '100%',
            margin: 0,
            position: 'fixed',
            top: 0,
            left: 0,
            color: 'white',
            overflow: 'auto',
            overflowX: 'hidden'
        }}>
        <InvigorNavBar />
        <Container className="p-0 container-fluid">
          <div style={{position: 'absolute', marginTop: '2vh'}}>
            <InvigorLogo />
          </div>
        </Container>
        <span style={{height: '100%', width: '100%', paddingLeft: '1vw', position: 'absolute', display: 'flex', flexDirection: 'column'}}>

        <div id="content section" style={{marginTop: '70vh', position: 'relative', fontFamily: 'monospace', justifyContent: 'center', width: '100vw'}}>
            <p>Invigor was developed by 4 students from Central High School for PennApps XXIII.</p>
            <Card>
                <Card.Body style={{backgroundColor: 'black'}}>
                    <Card.Title className='medium-text'>Vincent Zheng, Frontend + Research</Card.Title>
                    <Card.Text style={{textColor: 'white'}}>
                        <p></p>
                    </Card.Text>
                    <Card.Link href="https://github.com/Vncero" target="_blank">GitHub (Vncero)</Card.Link>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body style={{backgroundColor: 'black'}}>
                    <Card.Title className='medium-text'>Henry Zhang, Frontend + Demo video actor </Card.Title>
                    <Card.Text style={{textColor: 'white'}}>
                        <p></p>
                    </Card.Text>
                    <Card.Link href="https://github.com/mojofill" target="_blank">GitHub (mojofill)</Card.Link>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body style={{backgroundColor: 'black'}}>
                    <Card.Title className='medium-text'>Jason Yang, Frontend + Backend</Card.Title>
                    <Card.Text style={{textColor: 'white'}}>
                        <p></p>
                    </Card.Text>
                    <Card.Link href="https://github.com/BananasAmIRite" target="_blank">GitHub (BananasAmIRite)</Card.Link>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body style={{backgroundColor: 'black'}}>
                    <Card.Title className='medium-text'>Eric Ford, Frontend + Research</Card.Title>
                    <Card.Text style={{textColor: 'white'}}>
                        <p></p>
                    </Card.Text>
                    <Card.Link href="https://github.com/EricFor" target="_blank">GitHub (EricFor)</Card.Link>
                </Card.Body>
            </Card>
            </div>
        </span>
        </div>
    );
}

export default About;