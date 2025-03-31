import React from 'react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import MainLayout from '../src/layouts/MainLayout';
import AdminLogin from '../src/screens/AdminLogin';
import Home from '../src/screens/Home';;
import PrivateRoute from '../src/components/PrivateRoute';
import UserCards from '../src/components/UserCards';
import UserProfile from '../src/components/UserProfile';
import { Navigate } from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Navigate to="/login" replace />} />
      <Route path='/login' element={<AdminLogin />} />

      <Route element={<PrivateRoute />}>
        <Route path='/dashboard' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='users' element={<UserCards />} />
          <Route path='user/:id' element={<UserProfile />} />
        </Route>
      </Route>
    </>
  )
);


const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
