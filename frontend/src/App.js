import{BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'

function App() {
  return (
    <>
    <Router>
    <div class='container'>
      <Header/>
      <Routes>
        <Route path= '/' element= {<Dashboard/>} />
        <Route path= '/Login' element= {<Login/>} />
        <Route path= '/Register' element= {<Register/>} />
      </Routes>
    </div>
    </Router>
    </>
  );
}

export default App;
