import logo from './logo.svg';
import './App.css';
import Main from './Components/Main'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
     <Main/>
     </BrowserRouter>
  );
}

export default App;
