// kind of want to just add random stuff in here now
// recommend what time you should sleep based on how much time you have
// read somewhere that there are specific times when you should sleep and wake up
// might have been fake stuff but whatever

import { useEffect, useState } from "react";
import { Card, Container, Form } from "react-bootstrap";
import InvigorNavBar from "./InvigorNavBar";
import axios from 'axios';

function Sleep() {
    const [ data, setData ] = useState(null);
    const [ startSleepTime, setStartSleepTime ] = useState(null);
    const [ endSleepTime, setEndSleepTime ] = useState(null);
    
    useEffect(() => {
        axios.get('http://localhost:1000/api/user/userinfo')
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    }, []);
    function calculateSleepGoal() {
        const age = data.personal.age; // find age range
        const currSleep = data.sleep.averageSleepHours;
        if (age === null || age < 0) return "Specify a valid age. "; 
        const recommendedSleep = {
            ['0-0.33']: '14-17',
            ['0.33-1']: '12-16', 
            ['1-3']: '11-14',
            ['3-6']: '10-13',
            ['6-13']: '9-12',
            ['12-18']: '8-10', 
            ['18-61']: '7-24', // sleep rec technically unbounded
            ['61-64']: '7-9',
            ['65-100']: '7-8' // age technically unbounded
        };
        for (const range of Object.keys(recommendedSleep)) {
            let bounds = range.split('-');
            bounds = [parseFloat(bounds[0]), parseFloat[bounds[1]]];
            if (age >= bounds[0] && age < bounds[1]) {
                return recommendedSleep[range]; 
            }
        };
        return recommendedSleep['65-100']; 
    }

    function parseMinutesToTime(minutes) {
        let intHours = Math.floor(minutes / 60);
        let minutesLeft = minutes - intHours * 60;
        if (minutesLeft < 10) minutesLeft = '0' + minutesLeft
        return `${intHours}:${minutesLeft}`
    }

    function militaryToStandard(string) {
        let hours = parseInt(string.split(':')[0]);
        if (hours <= 12) return string;
        let minutes = parseInt(string.split(':')[1]);
        let i = 0;
        while (hours > 12) {
            hours -= 12;
            i++;
        }
        let addition = i % 2 === 0 ? 'AM' : 'PM';
        if (minutes < 10) minutes = '0' + minutes;
        return `${hours}:${minutes} ${addition}`
    }

    function getSleepTime() {
        if (endSleepTime === null || startSleepTime === null) return;

        let endTimeMinutes = parseInt(endSleepTime.split(':')[0]) * 60 + parseInt(endSleepTime.split(':')[1]);

        let startTimeMinutes = parseInt(startSleepTime.split(':')[0]) * 60 + parseInt(startSleepTime.split(':')[1]);

        if (endTimeMinutes < startTimeMinutes) endTimeMinutes += 24 * 60;
        console.log(endTimeMinutes)

        let minutes = endTimeMinutes - startTimeMinutes;
        return parseMinutesToTime(minutes)
    }

    function getRecommendedHoursOfSleep() {
        let startTimeMinutes = parseInt(startSleepTime.split(':')[0]) * 60 + parseInt(startSleepTime.split(':')[1]);

        // 10 hrs of sleep, 12 sleep cycles
        // 9 hrs of sleep, 11 sleep cycle
        // 8.5 hrs of sleep, 10 sleep cycles
        // 7.5 hrs of sleep, 9 sleep cycles

        return [
            parseMinutesToTime(startTimeMinutes + 10 * 60),
            parseMinutesToTime(startTimeMinutes + 9 * 60),
            parseMinutesToTime(startTimeMinutes + 9.5 * 60),
            parseMinutesToTime(startTimeMinutes + 7.5 * 60)
        ];
    }

    return (
        <>
        <div style={{width: '100%', minHeight: '100%', height: "fit-content", marginLeft: 0, position: 'absolute', backgroundColor: 'black', overflow: 'hidden'}}>
            <InvigorNavBar signedIn={true}/>
            <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "center"}}>
                <div style={{marginLeft: 0, marginTop: '1vh', position: 'relative', width: '100%', height: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', textAlign: 'center', flexDirection: 'column'}}>
                    <Container>
                        <p style={{
                            fontSize: 150,
                            marginTop: 10,
                            color: "white",
                            fontFamily: 'serif'
                        }}>Sleep</p>
                    </Container>
                    {/* get user's age and then figure out recommended sleep */}
                    <p style={{color: 'white', width: '75vw', textAlign: 'center', position: 'relative', marginTop: '2vh', marginBottom: '2vh'}}> 
                        Sleep deprivation can lead to a 48% increase in a person's risk of heart disease!
                        <br />
                        {data === null || calculateSleepGoal() === 'Specify a valid age. ' ? '' :<>{`Recommended Sleep Goal: ${calculateSleepGoal()}  hours`}</>}
                    </p>
                    <Container style={{justifyContent: 'center', display: 'flex', position: 'relative', marginTop: '6vh', marginBottom: '6vh', flexDirection: 'column', alignItems: 'center'}}>
                        <Card style={{width: '50%', height: '100%'}}>
                            <Card.Body>
                                <Card.Title>Sleep Calculator!</Card.Title>
                                <Card.Text className='text-muted'>Calculate how many hours of sleep you get every day, what time you should be sleeping to get the best sleep, and much, much more.</Card.Text>
                                <form>
                                    <Form.Label>When do you start to sleep?</Form.Label>
                                    <Form.Control type="time" onChange={(e) => setStartSleepTime(e.target.value)}/>
                                    <br />
                                    <Form.Label>When do you wake up?</Form.Label>
                                    {/* for form control type time, e.target.value is a string */}
                                    <Form.Control type="time" onChange={(e) => setEndSleepTime(e.target.value)}/>
                                    <br />
                                    <Form.Label for="customRange1">How satisfied are you with your sleep?</Form.Label>
                                    <Form.Control type="range" min="0" max="5"></Form.Control>
                                </form>
                            </Card.Body>
                        </Card>
                        {/* if start & end haven't been input, don't show the results card */}
                        {(startSleepTime && endSleepTime) && <Card style={{width: '50%', height: '100%', marginTop: '5vh'}}>
                            <Card.Body>
                                <Card.Title>Your Results</Card.Title>
                                <Card.Text>Hours slept: {getSleepTime()}</Card.Text>
                                <Card.Text>Recommended Sleep Times: {getRecommendedHoursOfSleep().map(
                                    e => <p>{militaryToStandard(e)}</p>
                                )}</Card.Text>
                                <Card.Title>Explanation (Sleep Architecture)</Card.Title>
                                <Card.Text>
                                    <p>
                                        The recommendations above are based on sleep cycles. Although sleep is often considered one event, 
                                        sleep is actually made up of sleep cycles, which are in turn made up of sleep stages.
                                        Each sleep cycle has 4 stages:
                                    </p>
                                    <ol>
                                        <li>N1: Non-REM - 1-5 minutes in length</li>
                                        <li>N2: Non-REM - 10-60 minutes in length</li>
                                        <li>N3/Deep Sleep: Non-REM - 20-40 minutes in length</li>
                                        <li>REM Sleep: REM - 10-60 minutes in length</li>
                                    </ol>
                                    <p>
                                        Sleep cycles can be improved by improving the environment in which you sleep, having a consistent sleep schedule,
                                        {data.personal.age >= 21 ? ' reducing alcohol consumption before bed, ' : ''}and touching grass (getting daylight exposure).
                                    </p>
                                </Card.Text>
                            </Card.Body>
                        </Card>}
                    </Container>
                </div>
            </div>
        </div>
        </>
    )
}

export default Sleep;