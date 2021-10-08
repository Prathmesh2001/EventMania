// import logo from './logo.svg';
import './App.css';
import './CSS/style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import Profile from './components/Profile';
import Footer from './components/Footer';
import EventDetail from './components/EventDetail';


function App() {
  let u_id = 3; 
  return (
    <>
      <Router>
        <Navbar title = "EventMania"/>
        <div>
          <Switch>
            <Route exact path="/home">
              <Home/>
            </Route>
            <Route exact path = "/about">
              <About/>
            </Route>
            <Route exact path = "/profile">
              <Profile u_id = {u_id}/>
            </Route>
            <Route exact path = "/:id">
              <EventDetail />
            </Route>
            <Route >404</Route>
          </Switch>
        </div>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
