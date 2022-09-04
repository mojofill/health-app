import { useEffect, useState } from "react";
import axios from "axios";
import InvigorNavBar from "./InvigorNavBar";
import { Form } from "react-bootstrap";
import * as V from 'victory';

function WeightCalc() {
  const [ data, setData ] = useState(null);
  const [ cpd, setCpd ] = useState(-1);

  const [wantedWeight, setWantedWeight] = useState(""); 
  
  function formula() {
      if (data === null) return;
      return 7 * wantedWeight / 3500;
  }

  useEffect(() => {
      axios.get('http://localhost:1000/api/user/userinfo')
      .then(res => setData(res.data))
  })
  
  return (
  data === null ? <></> : <>
  <InvigorNavBar signedIn={true} />
  <div style={{
      width: "100%",
      height: "100%",
      position: "fixed",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      backgroundColor: "black"
  }}>
  <div style={{
      width: "50vw",
      height: "50vw"
  }}>
      <Form.Control
          style={{maxWidth: 'auto', marginTop: '10vh'}} type='text' autoFocus
          placeholder='Weight Goal'
          onChange={(e) => {
              setWantedWeight(e.target.value); 

              const caloriesPerDayA = data.personal.sex === 'female' ? (66.5+9.6*e.target.value+1.8*data.personal.height-4.7*data.personal.age) : (66+13.7*e.target.value+data.personal.height-4.7*data.personal.age); 

              const caloriesPerDayB = data.personal.sex === 'female' ? (66.5+9.6*data.personal.weight+1.8*data.personal.height-4.7*data.personal.age) : (66+13.7*data.personal.weight+data.personal.height-4.7*data.personal.age); 

              setCpd(caloriesPerDayA - caloriesPerDayB); 
          }}
      />
      <p className="text-light">Calories change per day: {wantedWeight === '' ? "Please enter a wanted weight (lbs)" : cpd}</p>
      {cpd != -1 && <p style={{color: "red"}}> You need {cpd} calories to be on track for your Goal</p>}
  </div>
<V.VictoryChart theme={V.VictoryTheme.material}>
  <V.VictoryLine 
    style={{
      data: { stroke: "#c43a31" },
      parent: { border: "1px solid #ccc"}
    }}
    data={[
      { x: 0, y: formula() },
      { x: 1, y: formula()*2 },
      { x: 2, y: formula()*3 },
      { x: 3, y: 4*formula() },
      { x: 4, y: 5*formula() }
    ]}
    />
    <V.VictoryAxis
      label="Weeks"
      style={{
        axisLabel: { padding: 20 }
      }}
    />
    <V.VictoryAxis dependentAxis
      label="Pounds Lost/Gained"
      style={{
        axisLabel: { padding: 20 }
      }}
    />
    
  </V.VictoryChart>
  <br />
  </div>    
 
  </>);
}

export default WeightCalc;