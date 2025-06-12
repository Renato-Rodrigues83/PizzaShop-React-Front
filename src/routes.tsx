import { createBrowserRouter } from 'react-router-dom';
import { Dashboard } from './pages/app/dashboard/dashboard';
import { SignIn } from './pages/auth/sign-in';
import { AppLayout } from './pages/_layouts/app';
import { AuthLayout } from './pages/_layouts/auth';
import { SignUp } from './pages/auth/sign-up';
import { Orders } from './pages/app/orders/orders';
import { NotFound } from './pages/404';
import { Error } from './pages/error';



// Define the application's main router using React Router v6
export const router = createBrowserRouter([
    {
        // Main app layout for authenticated routes
        path: '/',
        element: <AppLayout />,
        errorElement: <Error />, // Fallback for unmatched routes
        children: [
            { path: '/', element: <Dashboard /> }, // Dashboard page (home)
            { path: '/orders', element: <Orders /> } // Orders page
        ]
    },

    {
        // Auth layout for authentication-related routes
        path: '/',
        element: <AuthLayout />,
        children: [
            { path: '/sign-in', element: <SignIn /> }, // Sign-in page
            { path: '/sign-up', element: <SignUp /> } // Sign-up page
        ]
    },

    {
        path: '*',
        element: <NotFound /> // Catch-all for 404 Not Found
    },
])