import React from 'react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import MainLayout from '../src/layouts/MainLayout';
import AdminLogin from '../src/screens/AdminLogin';
import Home from '../src/screens/Home';;
import PrivateRoute from '../src/components/PrivateRoute';
import UserCards from '../src/components/UserCards';
import UserProfile from '../src/components/UserProfile';
import axios from 'axios';
import Error from './components/Error';
import Unauthorized from './components/Unauthorized';
import { createHashRouter } from 'react-router-dom';


axios.defaults.withCredentials = true; // Enable sending cookies with requests

const router = createHashRouter(
  createRoutesFromElements(
    <>
      {/* Public Route */}
      <Route path='/' element={<AdminLogin />} />

      {/* Private Routes */}
      <Route element={<PrivateRoute />}>
        <Route path='/home' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="user/:id" element={<UserProfile />} />
        </Route>
      </Route>
      <Route path = '/error' element = {<Error/>} />
      <Route path = '/unauthorized' element = {<Unauthorized/>} />
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
