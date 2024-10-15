import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Navigate, RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
// import Temp from './Temp';
import Landing from './pages/Landing';
import { createStandaloneToast } from '@chakra-ui/react';
import axios from 'axios';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import LetterAndPhoto from './pages/LetterAndPhoto';
import Home from './pages/Home';
import HomeLanding from './pages/HomeLanding';
import LandingInfo from './pages/LandingInfo';

const { toast } = createStandaloneToast();

const checkAuthLoader = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/get-user`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch {
      toast({
        title: '',
        position: "top-right",
        description: 'Your session has expired. Please log in again.',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return redirect('/landing/login');
    }
  } else {
    return redirect('/landing/login');
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="landing" replace />,
      },
      {
        path: 'landing',
        element: <Landing />,
        children: [
          {
            index: true,
            element: <LandingInfo />,
          },
          {
            path: 'signup',
            element: <SignUp />,
          },
          {
            path: 'login',
            element: <LogIn />
          },
        ]
      },
      {
        path: 'home',
        element: <Home />,
        loader: checkAuthLoader,
        children: [
          {
            index: true,
            element: <HomeLanding />,
          },
          {
            path: 'submit',
            element: <LetterAndPhoto/>,
            loader: checkAuthLoader
          },
        ]
      },
    ],
  },
]);

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <><RouterProvider router={router} /></>
  );
} else {
  throw new Error('Cannot find root element with id "root".');
}