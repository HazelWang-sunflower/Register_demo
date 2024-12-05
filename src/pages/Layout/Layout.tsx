import { useNavigate } from "react-router-dom";
import { logout } from "../../services/login.service";

function Layout() {
    const navigate = useNavigate()
    const logoutHandler = async() =>{
        const data = await logout();
        if(data.code === 200) {
            navigate('/login')
        }
    }

    return (
        <>
        <h1>Layout</h1>
        <button onClick={logoutHandler}>
            Logout
        </button>
        </>
    )
}

export default Layout