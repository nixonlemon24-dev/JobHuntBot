import '../App.css'
import '../signup.css'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { UserIcon, EmailIcon, PasswordIcon, GoogleIcon, GitHubIcon } from '../components/UserIcons.jsx';
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";

export default function Signin() {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, watch } = useForm({  mode: "onSubmit", criteriaMode: "all" });
    const [formData, setFormData] = useState({password: "", email: "" });
    const password = watch("password", "");
    const { login, loginError } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await login(data.email, data.password);
            const success = true;
            if (success) {
                navigate("/"); 
            }
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
      <div className="page">
        <div className="panel-right">
          <div className="form-card">
            <div className="form-header">
              <h2>Sign in</h2>
            </div>

            <form id="signinForm" onSubmit={handleSubmit(onSubmit)}>
              <div className = "error-container">        
                {loginError && <span className="form-error-message"> {loginError} </span>}
              </div>

              <div className="field">
                <label htmlFor="email">Email address</label>
                <div className="input-wrap">
                  {EmailIcon({ size: 20, color: '#888', style: { position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)' } })}
                  <input className="form-input" type="email" id="email" name="email"
                  {...register("email", { 
                    required: true  })} />
                </div>

              </div>

              <div className="field">
                <label htmlFor="password">Password</label>
                <div className="input-wrap">
                  {PasswordIcon(({ size: 20, color: '#888', style: { position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)' } }))}
                  <input className="form-input" type="password" id="password" name="password"
                    {...register("password", { 
                    required: true  })} />
                </div>
              </div>
              
              <div className="forgot-password">
                 <Link to="/forgot-password">Forgot Password?</Link>
              </div>

              <button type="submit" className="btn-submit">
                <span>{loading ? 'Signing in...' : 'Sign in'}</span>
              </button>

            </form>
            
          </div>
        </div>
      </div>
    )
}

