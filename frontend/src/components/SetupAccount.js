import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import InvigorNavBar from './InvigorNavBar';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import PageNotFound from './PageNotFound';

function SetupAccount() {
    const [data, setData] = useState(null);
    const [errorHappened, setErrorHappened] = useState(false);
    const changes = {}; 

    const navigate = useNavigate(); 

    useEffect(() => {
        axios.get(`http://localhost:1000/api/user/me?scope=userInformation`)
        .then((response) => {
            setData(response.data);
        })
        .catch(err => {
            console.log(err);
            setErrorHappened(true);
        })
    }, []);

    if (errorHappened) return <PageNotFound />

    async function onSubmit() {
        try {
            console.log(changes); 
            await axios.post('http://localhost:1000/api/user/updateUser', {
                updates: changes
            });
            console.log('hi')
            navigate(`/user`); 
        }
        catch (err) { console.log(err); }
    }

    function ShowChoices() {
        const choices = [
            {
                category: "Personal Information", 
                categoryName: "personal", 
                vals: [{
                    name: 'sex', 
                    placeholder: 'Sex ("male" or "female")', 
                    parse: (value) => {
                        return value.toLowerCase(); 
                    }
                }, {
                    name: 'height', 
                    placeholder: `Height ([feet]\' [inches])`, 
                    parse: (value) => {
                        const obj = value.split("'");
                        return parseInt(obj[0]) * 12 + parseInt(obj[1]);
                    }, 
                    unparse: (height) => {
                        if (height === null || height === undefined) return null; 
                        const minFeet = Math.floor(height / 12);
                        const inches = height - minFeet * 12;
                        return `${minFeet}'${inches}`;
                    }
                }, {
                    name: 'weight',
                    placeholder: 'Weight (lbs.)',
                    parse: parseInt
                }, {
                    name: 'age', 
                    placeholder: 'Age', 
                    parse: parseInt
                }]
            }, 
            {
                category: "Fitness", 
                categoryName: "fitness", 
                vals: [{
                name: 'dailyPushups',
                placeholder: 'Pushups per day', 
                parse: parseInt
            }, {
                name: 'prBenchPress',
                placeholder: 'PR Bench Press (lbs.)', 
                parse: parseInt
            }, {
                name: 'dailyDistanceRan',
                placeholder: 'Daily run distance (miles)', 
                parse: parseInt
            }]},
            {
                category: "Diet", 
                categoryName: "diet", 
                vals: [{
                name: 'dailyCalorieCount',
                placeholder: 'Daily caloric intake', 
                parse: parseInt
            }, {
                name: 'dailyProteinIntake',
                placeholder: 'Daily protein intake (g)', 
                parse: parseInt
            }, {
                name: 'dailyFatIntake',
                placeholder: 'Daily fat intake (g)', 
                parse: parseInt
            }]},
            {
                category: "Sleep", 
                categoryName: "sleep", 
                vals: [{
                name: 'averageSleepHours',
                placeholder: '~Hours of sleep',
                parse: parseInt
            }, {
                name: 'sleepTemperature',
                placeholder: 'Temperature during sleep (F)',
                parse: parseInt
            }]
        }
        ]; 


        return (
        <>
        <InvigorNavBar signedIn={true} />
        <div style={{marginTop: '10vh'}}>
            <h3 className="text-light"
            style={{
                width: '100%',
                textAlign: 'center',
                marginTop: '5vh',
                position: 'fixed'
            }}
            >Leave blank if you do not have an answer.</h3>
            <div style={{
                height: '100%',
                width: '100%',
                position: 'fixed',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
            }}>
                <div id="content column stack" style={{
                    display: 'flex',
                    height: '100%',
                    width: '100%',
                    position: 'fixed',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                    <div style={{display: 'flex',
                    width: '92%',
                    flexDirection: 'row',
                    top: '20vh',
                    position: 'absolute'}}>
                        {
                            choices.map((e, i) => <SetupAccountElement data={data} header={e.category} headerName={e.categoryName} key={i} setData={(k, v) => {changes[k] = v}} fields={e.vals} initialValue={data?.userInformation?.[e.category]} />)
                        }
                    </div>
                    <Button style={{bottom: '10vh', position: 'fixed'}} onClick={onSubmit}>Submit All</Button>
                </div>
            </div>
        </div>
        </>);
    }

    return (<div style={{
        backgroundColor: 'black',
        height: '100%',
        width: '100%',
        position: 'absolute',
        overflowX: 'hidden'
    }}>
        <ShowChoices />
    </div>);
}

function SetupAccountElement(props) {

    const maxHeight = 300;

    return (
        <Accordion style={{width: '20vw', marginRight: '4vw'}} defaultActiveKey="0">
        <Accordion.Item style={{width: 'auto', position: 'relative'}} eventKey="0">
            <Accordion.Header>{props.header}</Accordion.Header>
                <Accordion.Body>
                    <form style={{ maxHeight: maxHeight, overflow: 'auto', overflowX: 'hidden'}}>
                        {
                            props.fields.map((e, i) => <SetupAccountField {...props} compData={e} key={i} />)
                            // props.fields.map((e, i) => <Form.Control 
                            // className="mw-auto" 
                            // placeholder={e.placeholder} 
                            // key={i}
                            // onChange={(v) => props.setData(e.name, (e.parse ?? ((e) => e))(v.target.value))}
                            // defaultValue={props.initialValue?.[e.name] ?? ''}
                            // />)
                        }
                    </form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    ); 
}; 

function SetupAccountField(props) {
    const [value, setValue] = useState(''); 

    useEffect(() => {
        setValue((props.compData.unparse ?? ((e) => e))(props.data?.userInformation?.[props.headerName]?.[props.compData.name])); 
    }, [props.data]); 
    
    return (<Form.Control 
        className="mw-auto" 
        placeholder={props.compData.placeholder} 
        onChange={(v) => {
            setValue(v.target.value); 
            props.setData(props.compData.name, (props.compData.parse ?? ((e) => e))(v.target.value)); 
        }}
        // defaultValue={props.initialValue?.[e.name] ?? ''}
        value={value}
        />); 
}

export default SetupAccount;