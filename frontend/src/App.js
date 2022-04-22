import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './Login/Login';
import CreateAccount from './CreateAccount/CreateAccount';
import Home from './Home/Home';

function App() {
  return (
    <div className="App">
        <Switch>
          <Route exact path="/"><Login /></Route>
          <Route exact path="/create-account"><CreateAccount /></Route>
          <Route exact path="/home"><Home /></Route>
        </Switch>
    </div>
  );
}

export default App;
