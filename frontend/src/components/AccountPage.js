import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link} from 'react-router-dom';
import { Card, Container } from 'react-bootstrap';

import PageNotFound from './PageNotFound';
import InvigorNavBar from './InvigorNavBar';

import axios from 'axios';
import '../css/AccountPage.css';


function AccountPage() {
    const [ data, setData ] = useState({});
    const [errorHappened, setErrorHappened] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:1000/api/user/me?scope=userInformation')
        .then((response) => {
            console.log(response.data); 
            setData(response.data);
        })
        .catch((err) => {
            console.log(err);
            setErrorHappened(true);
        });
    }, []);

    function renderData(val) {
        return val === null || val === undefined || isNaN(val) ? "Unspecified" : val; 
    }

    function parseHeight(height) {
        if (!height) return null; // pretty sure this could just be !height
        const minFeet = Math.floor(height / 12);
        const inches = height - minFeet * 12;
        return `${minFeet}'${inches}`;
    }
    
    return errorHappened ? <PageNotFound />: (<div style={{height: '100%', width: '100%', position: 'fixed', backgroundColor: 'black'}}>
            <InvigorNavBar signedIn={true} />
            <div id="full-page" style={{
                display: 'flex',
                height: '100%',
                width: '100%',
                background: 'black', 
                overflow: 'scroll'
            }}>
                <Container>
                    <div id="personal-data" style={{display: 'flex', width: '100%', height: 'auto', flexDirection: 'row', marginTop: '7.5vh'}}>
                        <span id="pfp-pic" style={{width: '100px', height: '100px', borderRadius: '50%', backgroundColor: "white", justifyContent: 'center', alignItems: 'center', textAlign: 'center', display: 'flex', fontSize: 40, color: "black"}}>{data?.firstName?.[0].toUpperCase() + data?.lastName?.[0].toUpperCase()}</span>
                        <div style={{marginLeft: '5vw'}}>
                            <p className="large-text" style={{color: "white"}}>{"Name: " + data?.firstName + ' ' + data?.lastName}</p>
                            <div className="medium-muted-text">
                                <p>Height: {parseHeight(data?.userInformation?.personal?.height) ?? "Unspecified"}</p>
                                <p>Sex: {data?.userInformation?.personal?.sex ?? "Unspecified"}</p>
                            </div>
                            <Link to={`/user/setup`}>Edit Information</Link>
                        </div>
                    </div>
                    <div style={{display: 'flex', columnGap: '5%', flexFlow: 'row wrap', justifyContent: 'space-around'}}>
                    {/* put these cards in a flexbox row */}
                    {/* <div id="weight-calculator"> */}
                        <Card style={{
                                width: '20vw',
                                height: '40vh',
                                cursor: 'pointer',
                                marginTop: '5vh'
                            }}
                            onClick={() => navigate('/weight-calc')}
                            >
                            <Card.Body>
                                <Card.Title>Weight</Card.Title>
                                <Card.Text>
                                    Find out the next steps to your weight.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    {/* </div> */}
                    {/* <div id="sleep-calculator"> */}
                        <Card style={{
                                width: '20vw',
                                height: '40vh',
                                cursor: 'pointer',
                                marginTop: '5vh'
                            }}
                            onClick={() => navigate('/health/sleep')}
                            >
                            <Card.Body>
                                <Card.Title>Sleep</Card.Title>
                                <Card.Text>
                                    Find out your sleep goal for the future.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    {/* </div> */}
                    </div>
                </Container>
            </div>
        </div>);
}

export default AccountPage;