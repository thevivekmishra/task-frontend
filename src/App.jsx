// import React, { useEffect } from 'react'
// import Home from './Pages/Home'
// import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
// import AllTasks from './Pages/AllTasks'
// import ImportantTasks from './Pages/ImportantTasks'
// import CompletedTasks from './Pages/CompletedTasks'
// import IncompletedTasks from './Pages/IncompletedTasks'
// import Signup from './Pages/Signup'
// import Login from './Pages/Login'
// import {useDispatch, useSelector} from 'react-redux';
// import { authActions } from '../store/auth'

// const App = () => {
//   const navigate = useNavigate();
//   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
//  const dispatch = useDispatch();
 
//   useEffect(() => {
//     if(localStorage.getItem("id") && localStorage.getItem("token")){
//       dispatch(authActions.login());
//     }
//     else if (isLoggedIn===false) {
//       navigate("/signup");
//     }
//   }, [isLoggedIn, navigate]);
  
//   return (
//     <div className='bg-gray-900 text-gray-100 h-screen relative'>
//         <Routes>
//           {/* to show component right side we have to mount all component inside home route */}
//           <Route exact path='/' element={<Home />}>
//             <Route index element={<AllTasks />} />
//             <Route path="/importanttasks" element={<ImportantTasks />} />
//             <Route path="/completedtasks" element={<CompletedTasks/>} />
//             <Route path="/incompletedtasks" element={<IncompletedTasks />} />
//           </Route>
//           <Route path='/signup' element={<Signup/>}/>
//           <Route path='/login' element={<Login/>}/>

//         </Routes>
//     </div >
//   )
// }

// export default App


import React, { useEffect } from 'react';
import Home from './Pages/Home';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import AllTasks from './Pages/AllTasks';
import ImportantTasks from './Pages/ImportantTasks';
import CompletedTasks from './Pages/CompletedTasks';
import IncompletedTasks from './Pages/IncompletedTasks';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/auth';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      dispatch(authActions.login());
    } else if (!['/login', '/signup'].includes(location.pathname)) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate, dispatch, location.pathname]);

  return (
    <div className='bg-gray-900 text-gray-100 h-screen relative'>
    
      <Routes>
        <Route exact path='/' element={<Home />}>
          <Route index element={<AllTasks />} />
          <Route path="/importanttasks" element={<ImportantTasks />} />
          <Route path="/completedtasks" element={<CompletedTasks />} />
          <Route path="/incompletedtasks" element={<IncompletedTasks />} />
        </Route>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div >
  )
}

export default App;
