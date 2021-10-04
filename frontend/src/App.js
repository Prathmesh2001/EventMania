// import logo from './logo.svg';
import './App.css';
import './CSS/Home.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import Footer from './components/Footer';


function App() {
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
          </Switch>
        </div>
        <Footer/>
      </Router>
    </>
  );
}

export default App;