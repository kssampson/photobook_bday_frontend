import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Temp from './Temp';
import Main from './components/Main';
import Landing from './pages/Landing';
import { createStandaloneToast } from '@chakra-ui/react';
import axios from 'axios';
import SignUp from './pages/SignUp';

const { toast } = createStandaloneToast()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="landing" replace />
      },
      {
        path: 'landing',
        element: <Landing />
      },
      {
        path: 'temp',
        element: <SignUp />,
        loader: async () => {
          const token = localStorage.getItem("token");
          if (token) {
            try {
              const response = await axios.get(`${process.env.API_BASE_URL}/auth/get-user`,
                { headers: { Authorization: `Bearer ${token}` } }
              );
              return response.data;
            } catch {
              toast({
                title: '',
                position: "top-right",
                description: 'Please sign up or log into your account.',
                status: 'warning',
                duration: 2000,
                isClosable: true,
              })
              return null;
            }
          }
        }
      },
      {
        path: 'main',
        element: <Main/>,
        loader: async () => {
          const token = localStorage.getItem("token");
          if (token) {
            try {
              const response = await axios.get(`${process.env.API_BASE_URL}/auth/get-user`,
                { headers: { Authorization: `Bearer ${token}` } }
              );
              return response.data;
            } catch {
              toast({
                title: '',
                position: "top-right",
                description: 'Please sign up or log into your account.',
                status: 'warning',
                duration: 2000,
                isClosable: true,
              })
              return null;
            }
          }
        }

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