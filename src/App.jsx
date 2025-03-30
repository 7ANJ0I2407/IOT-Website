import React from 'react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLogin from './Screens/AdminLogin';
import Home from './screens/Home';
import PrivateRoute from './components/PrivateRoute';
import UserCards from './components/UserCards';
import UserProfile from './components/UserProfile';

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
