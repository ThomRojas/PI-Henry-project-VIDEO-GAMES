import './App.css';
import { Route } from "react-router-dom";
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail'
import Form from './components/Form/Form';
import Loading from '../src/components/LandingPage/LandingPage.jsx';



function App() {
  return (
    <div className="App">

        
        <Route exact path="/"> <Loading/> </Route>

        <Route path="/home"> <Home/> </Route>

        <Route path="/detail/:id"> <Detail/> </Route>

        <Route path="/createvideogame"> <Form/> </Route>

        
      </div>
  );
}

export default App;
