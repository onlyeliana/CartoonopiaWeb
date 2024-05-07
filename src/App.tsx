import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import MainLayout from './layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import { mainRoutesProps } from './router/inter';
import { mainRoutes } from './router';
import Login from './views/Login';
import { RequireAuth } from './auth/RequireAuth';
import Signup from './views/Signup';
import { UserProfile } from './views/User/UserProfile';
import { Community } from './views/User/Community';
import { Favourites } from './views/User/Favourites';
import { Contributions } from './views/User/Contributions';

function App() {
  const [realRoutes, setRealRoutes] = useState<Array<mainRoutesProps>>([]);
  useEffect(() => {
    let arr: mainRoutesProps[] = [];
    mainRoutes.forEach((item) => {
      if (item.children) {
        arr = [...arr, ...item.children]
      } else {
        arr.push(item);
      }
    })
    setRealRoutes(arr)
  }, [])
  return (
    <div className="App">
      <div>
        <audio src="https://n.v.netease.com/2024/0408/41cdf3e16432a74b7a34f1f04c0f584a.mp3" loop autoPlay></audio>
      </div>
      {/* root component */}
      <Routes>
        <Route path="/" element={<RequireAuth><MainLayout></MainLayout></RequireAuth>}>
          {/* http://localhost:3000/#/hero */}
          <Route path='/' element={<Navigate to={'/hero/home'}></Navigate>}></Route>
          {realRoutes.map(item => {
            return <Route path={item.key} element={item.element} key={item.key}></Route>
          })}
        </Route>
        <Route path="/userprofile" element={<UserProfile />}></Route>
        <Route path="/userprofile/:id" element={<UserProfile />}></Route>
        <Route path="/usercommunity" element={<Community />}></Route>
        <Route path="/userfavourites" element={<Favourites />}></Route>
        <Route path="/usercontributions" element={<Contributions />}></Route>

        {/* http://localhost:3000/#/login */}
        <Route path="/login" element={<Login />}></Route>
        {/* http://localhost:3000/#/login */}
        <Route path="/register" element={<Signup />}></Route>
      </Routes >
    </div >
  );
}

export default App;
