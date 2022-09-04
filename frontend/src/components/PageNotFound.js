import InvigorNavBar from "./InvigorNavBar";
import InvigorLogo from "./InvigorLogo";

function PageNotFound() {
    return (<div style={{backgroundColor: 'black', height: '100%', width: '100%', position: 'fixed'}}>
        <InvigorNavBar />
        <div style={{margin: 0, padding: 0, height: '100%', width: '100%', position: 'absolute', alignItems: 'center', justifyContent: 'center', display: 'flex', textAlign: 'center', flexDirection: 'column'}}>
            <h1 style={{fontSize: 60, color: 'white'}}>PAGE NOT FOUND</h1>
            <InvigorLogo/>
        </div>
    </div>);
}

export default PageNotFound;