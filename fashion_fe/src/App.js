import './App.css';
import  Router  from './router/Router';
import config from './config';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { useNavigate } from 'react-router-dom';
import { Security } from '@okta/okta-react';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
// import 
// confi


const oktaAuth = new OktaAuth(config.oidc);


function App() {
  const navigate = useNavigate();
  const [user,setUser]=useState("")
  const [socket,setSocket]=useState(null)
  const restoreOriginalUri = (oktaAuth, originalUri) => {
    navigate(toRelativeUrl(originalUri || '/', window.location.origin));
  };
  useEffect(() => {
    setSocket(io("http://localhost:8080"))
    console.log(process.env.BASE_URL)
  }, []);
  return (
    <div className="App">
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        <Router socket={socket} />
      </Security>
    </div>
  );
}

export default App;