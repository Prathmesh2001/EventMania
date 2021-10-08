// import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import Profile from './components/Profile';


function App() {
  let u_id = 3; 
  return (
    <>
      <Router>
        <Navbar title = "EventMania"/>
        <div>
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route exact path = "/about">
              <About/>
            </Route>
            <Route exact path = "/profile">
              <Profile u_id = {u_id}/>
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
