import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './Login/Login';

function App() {
  return (
    <div className="App">
      <div className='content'>
        <Switch>
          <Route exact path="/"><Login /></Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
