import { Link } from 'react-router-dom'
import SignUp from '../pages/SignUp';
import Signin from '../pages/SignIn';
import UserJobs from '../pages/UserJobs';
import { useAuth } from "../context/AuthContext";
import { SaveIcon } from './UserIcons';

export default function Navbar() {
    const { user, signUp, login, logout, loading} = useAuth();
    return  (
    <nav>
        <Link to="/" ><div className="logo" >JobHunt<span>BOT</span></div> </Link>
        <div className="nav-links">
            {user ? (
                <>
                    <Link to="/user-jobs" className="nav-btn nav-btn-outline"><SaveIcon /></Link>
                    <h1 className="nav-btn nav-btn-outline">Welcome, {user.email}!</h1>
                    <button onClick={logout} className="nav-btn nav-btn-outline">Sign Out</button>
                </>
            ) : (
                <>
                     <Link to="/user-jobs" className="nav-btn nav-btn-outline"><SaveIcon /></Link>
                    <Link to="/signin" className="nav-btn nav-btn-outline">Sign In</Link>
                    <Link to="/signup" className="nav-btn nav-btn-fill" element={<SignUp />}>Get Started</Link>
                </>
            )}

        </div>
    </nav>
    )
}

