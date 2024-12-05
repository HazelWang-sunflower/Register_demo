import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import App from "../App";
import NotFound from "../pages/NotFound";
import SignIn from "../pages/SignIn/SignIn";
import ResetPassword from "../pages/SignIn/ResetPassword";

const routes = [
    {
        path: '/',
        element: <App />,
        children:[
            // {
            //     path: '/',
            //     element: <Layout/>
            // }
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/sign-in',
        element: <SignIn />
    },
    {
        path:'/reset-password',
        element: <ResetPassword />
    },
    {
        path: '*',
        element: <NotFound />
    }
]

const router = createBrowserRouter(routes)

export default router