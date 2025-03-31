import React from 'react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import MainLayout from '../src/layouts/MainLayout';
import AdminLogin from '../src/Screens/AdminLogin';
import Home from '../src/screens/Home';;
import PrivateRoute from '../src/components/PrivateRoute';
import UserCards from '../src/components/UserCards';
import UserProfile from '../src/components/UserProfile';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Route */}
      <Route path='/login' element={<AdminLogin />} />

      {/* Private Routes */}
      <Route element={<PrivateRoute />}>
        <Route path='/' element={<MainLayout />}>
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
