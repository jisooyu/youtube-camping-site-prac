import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NewCamp from './pages/NewCamp';
import Camps from './pages/Camps';
import Camp from './pages/Camp';

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/new-camp' element={<PrivateRoute />}>
              <Route path='/new-camp' element={<NewCamp />} />
            </Route>
          </Routes>

          <Routes>
            <Route path='/camps' element={<PrivateRoute />}>
              <Route path='/camps' element={<Camps />} />
            </Route>
            <Route path='/camp/:campId' element={<PrivateRoute />}>
              <Route path='/camp/:campId' element={<Camp />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
