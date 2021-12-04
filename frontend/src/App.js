import './App.css';
import './CSS/style.css';
import React, { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import Profile from './components/Profile';
import Footer from './components/Footer';
import EventDetail from './components/EventDetail';
import Lndindpage from './components/Lndindpage';
import AddEvent from './components/AddEvent';
import Payment from './components/Payment';
import Movies from './components/Movies';

const jwt = require('jsonwebtoken');
function App() {
  // let u_id = 4; 

  // const history = useHistory();
  const [user_auth, setuserauth] = useState({
    authflag: false,
    u_id: 4
  })

  const handle_token = async () => {
    if (!localStorage.getItem('access_t')) {
      return;

    }
    let access_exp = jwt.decode(localStorage.getItem('access_t'))['exp']
    console.log(access_exp * 1000 + 2000 - Date.now(), (access_exp * 1000) + 2000, Date.now())
    let refresh_exp = jwt.decode(localStorage.getItem('refresh_t'))['exp']
    console.log(refresh_exp * 1000 + 2000 - Date.now(), (refresh_exp * 1000) + 2000, Date.now())
    if ((access_exp * 1000 + 2000) < Date.now()) {
      if ((refresh_exp * 1000 + 2000) < Date.now()) {
        handle_logout()
      }
      else {
        const resp = await fetch('http://localhost:8000/api/token/refresh/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "refresh": localStorage.getItem('refresh_t')
          })
        })
        let r_data = await resp.json();
        console.log("refereshed token")
        localStorage.removeItem('access_t');
        localStorage.setItem('access_t', r_data.access);
      }
    }
  }

  useEffect(() => {
    const loggedInUser = localStorage.getItem('access_t');
    if (loggedInUser) {
      handle_token()
        .then(() => {
          let decoded = jwt.decode(localStorage.getItem('access_t'))
          setuserauth({
            authflag: true,
            u_id: decoded['user_id']
          })
          // return <Redirect to = "/home"/>
          // history.push(`home`)
        }
        )
    }
  }, []);






  const handle_login = async (data) => {
    console.log(data)
    const resp = await fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    // .then(res => res.json())
    // .then(json => {
    //   console.log(json)
    //   localStorage.setItem('access_t', json.access);
    //   localStorage.setItem('refresh_t', json.refresh);
    //   let decoded = jwt.decode(json.access)
    //   console.log(decoded)

    let r_data = await resp.json();
    console.log(r_data)
    localStorage.setItem('access_t', r_data.access)
    localStorage.setItem('refresh_t', r_data.refresh)
    let decoded = jwt.decode(r_data.access)
    setuserauth({
      authflag: true,
      u_id: decoded['user_id']
    })

    return decoded
    // this.setState({
    //   authflag: true,
    //   // u_id: j.user_id
    //   //here gere gere gere geyghsjbksdncbkascnbkasjnbckjansckjancvk 
    // });

  }


  const handle_logout = () => {
    localStorage.removeItem('access_t');
    localStorage.removeItem('refresh_t');
    setuserauth({ authflag: false, u_id: 4 });
    console.log("visited logout1")
    console.log("visited logout2")
  }



  return (
    <>
      <Router>
        <Navbar title="EventMania" handle_token={handle_token} handle_login={handle_login} handle_logout={handle_logout} cred_dict={user_auth} />
        <div>
          <Switch>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/movies">
              <Movies />
            </Route>
            
            <Route exact path="/:id/payment">
              <Payment cred_dict={user_auth} />
            </Route>
            <Route exact path="/addevent">
              <AddEvent />
            </Route>
            <Route exact path="/profile">
              <Profile cred_dict={user_auth} handle_token={handle_token} />
            </Route>

            <Route exact path="/:id">
              <EventDetail />
            </Route>
            <Route exact path="/">
              <Lndindpage handle_token={handle_token} />
            </Route>

          </Switch>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;