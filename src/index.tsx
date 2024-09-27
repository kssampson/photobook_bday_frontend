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

const { ToastContainer, toast } = createStandaloneToast()

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
        element: <Temp />,
        loader: async () => {
          const token = localStorage.getItem("token");
          if (token) {
            try {
              const response = undefined; //replace this with endpoint to get user profile data
            } catch {
              toast({
                title: 'Error.',
                position: "top-right",
                description: 'Please sign up log into your account.',
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
            }
          }
        }
      },
      {
        path: 'main',
        element: <Main/>,
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