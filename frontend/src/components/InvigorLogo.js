import heartImage from '../images/heart.png';

function InvigorLogo() {
  function GetHeartImage() {
    return <img style={{ maxWidth: '40%', height: 'auto', position: 'relative' }} src={heartImage} />;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
      <h1 style={{ fontSize: 200, fontFamily: 'serif', color: 'white', marginRight: 40 }}>Invigor</h1>
      <GetHeartImage />
    </div>
  );
}

export default InvigorLogo;
