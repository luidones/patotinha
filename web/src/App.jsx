import { useContext } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import Home from './components/Home';
import SignIn from './components/SignIn';
import Profile from './components/Profile';

export default function App(){
    const [user] = useContext(UserContext);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/profile",
            element: <Profile />
        } 
    ]);

    return user ? <RouterProvider router={router}/> : <SignIn />;
};