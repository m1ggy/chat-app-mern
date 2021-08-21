import './App.css';
import Login from './pages/Login';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Signup from './pages/Signup';
function App() {
  return (
    <Router>
      <Switch>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='/' exact>
          <Login />
        </Route>
        <Route path='*'>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100vw',
              height: '100vh',
            }}
          >
            <p>Page Not Found</p>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
