import '../App.css'
import '../signup.css'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { UserIcon, EmailIcon, PasswordIcon, GoogleIcon, GitHubIcon } from '../components/UserIcons.jsx';
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";

export default function Forgotpass() {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, watch } = useForm({  mode: "onSubmit", criteriaMode: "all" });
    const [formData, setFormData] = useState({ email: "" });
    const { resetPassword , resetError } = useAuth();
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await resetPassword(data.email);
            setSuccess(true);
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
              <h2>Forgot Password</h2>
            </div>

            <form id="forgotPasswordForm" onSubmit={handleSubmit(onSubmit)}>
              <div className = "error-container">       
                {success && <span className="form-error-message"> Reset link sent successfully! </span>} 
                {resetError && <span className="form-error-message"> {resetError} </span>}
                {errors.email && <span className="form-error-message">Email is required</span>}
              </div>

              <div className="field">
                <label htmlFor="email">Email address</label>
                <div className="input-wrap">
                  {EmailIcon({ size: 20, color: '#888', style: { position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)' } })}
                  <input className="form-input" type="email" id="email" name="email" placeholder="Donald.Bulanadi@example.com" 
                  {...register("email", { 
                    required: true  })} />
                </div>

              </div>

              <button type="submit" className="btn-submit">
                <span>{loading ? 'Sending reset link...' : 'Send Reset Link'}</span>
              </button>

            </form>
            
          </div>
        </div>
      </div>
    )
}

