import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Signup from './components/Signup';
import Login from './components/Login';
import AccountPage from './components/AccountPage';
import SetupAccount from './components/SetupAccount';
import About from './components/About';
import Test from './components/EnvTest';
import WeightCalc from './components/WeightCalc';
import HealthTopicSwitcher from './components/HealthTopicSwitcher';

import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true; 
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage/>}></Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/user" element={<AccountPage/>}></Route>
          <Route path="/user/setup" element={<SetupAccount/>}></Route>
          <Route path="/test" element={<Test />}></Route>
          <Route path="/weight-calc" element={<WeightCalc />}></Route>
          <Route path="/health/:topic" element={<HealthTopicSwitcher />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
