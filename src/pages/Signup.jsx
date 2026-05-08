import '../App.css'
import '../signup.css'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { UserIcon, EmailIcon, PasswordIcon, GoogleIcon, GitHubIcon } from '../components/UserIcons.jsx';
import { useAuth } from "../context/AuthContext";
import { useNavigate,Link } from "react-router-dom";


export default function Signup() {
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, watch } = useForm({  mode: "onSubmit", criteriaMode: "all" });
    const [formData, setFormData] = useState({ password: "", email: "" });
    const password = watch("password", "");
    const conditions = {
      lowercase: /[a-z]/.test(password) && errors.password?.type !== "lowercase",
      uppercase: /[A-Z]/.test(password) && errors.password?.type !== "uppercase",
      number: /[0-9]/.test(password) && errors.password?.type !== "number",
      special: /[!@#$%^&*]/.test(password) && errors.password?.type !== "special",
    };
    const allValid = Object.values(conditions).every(Boolean);
    const { signUp, signupError } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            // await signUp(data.firstName, data.lastName, data.email, data.password);
            await signUp(data.email, data.password);
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
            const success = true;
            if (success) {
                navigate("/");
              }
        }
    };


    return (
      <div className="page">
        <div className="panel-right">
          <div className="form-card">

            <div className="form-header">
              <h2>Create account</h2>
              {/* <Link to="/signin"><p>Already have one?Sign in</p></Link> */}
            </div>

            <form id="signupForm" onSubmit={handleSubmit(onSubmit)}>
              <div className = "error-container">
                  {loading && <span className="form-error-message">Creating Account. Please Wait</span>}
                  {/* {errors.firstName && <span className="form-error-message">First name is required</span>}
                  {errors.lastName && <span className="form-error-message">Last name is required</span>} */}
                  {signupError && <span className="form-error-message"> {signupError} </span>}
                  {errors.email && <span className="form-error-message">Email is required</span>}
                  {errors.password?.type === "required" && <span className="form-error-message">Password  is required</span>}
                  {/* {errors.terms && <span className="form-error-message">You must agree to the terms</span>} */}
                  </div>

            {/* 
              <div className="form-row">
                  
                <div className="field">
                  <label htmlFor="fname">First name</label>
                  <div className="input-wrap">
                    {UserIcon({ size: 20, color: '#888', style: { position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)' } })}
                    <input className="form-input" type="text" id="firstName" name="firstName" placeholder="Donald" {...register("firstName", { required: true })} />
                  </div>
              
                </div>
                <div className="field">
                  <label htmlFor="lname">Last name</label>
                  <div className="input-wrap">
                    {UserIcon({ size: 20, color: '#888', style: { position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)' } })}
                    <input className="form-input" type="text" id="lastName" name="lastName" placeholder="Bulanadi" {...register("lastName", { required: true })} />
                  </div>
                
                </div>
              </div> */}

              <div className="field">
                <label htmlFor="email">Email address</label>
                <div className="input-wrap">
                  {EmailIcon({ size: 20, color: '#888', style: { position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)' } })}
                  <input className="form-input" type="email" id="email" name="email" placeholder="Donald.Bulanadi@example.com" 
                  {...register("email", { 
                    required: true  })} />
                </div>

              </div>

              <div className="field">
                <label htmlFor="password">Password</label>
                <div className="input-wrap">
                  {PasswordIcon(({ size: 20, color: '#888', style: { position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)' } }))}
                  <input className="form-input" type="password" id="password" name="password" placeholder="Create a strong password" 
                  {...register("password", {
                    required: true,
                    minLength: 8,
                    validate: {
                      lowercase: (v) => /[a-z]/.test(v) || "Must contain a lowercase letter",
                      uppercase: (v) => /[A-Z]/.test(v) || "Must contain an uppercase letter",
                      number: (v) => /[0-9]/.test(v) || "Must contain a number",
                      special: (v) => /[!@#$%^&*]/.test(v) || "Must contain a special character",
                    }
                  })} />

                  {/* <button type="button" className="toggle-pw"></button> */}
                </div>

                  <div className="card">
                  <p className="card-title">Your password must contain:</p>
                  <ul className="req-list">
              
                    <li className="req-item">
                      <span className={`icon sm ${!watch('password')? 'unchecked': errors.password?.type === 'minLength'? 'checked-error': 'checked'}`}></span>
                      <span className={errors.password?.type === "minLength" ? "error-message-password" : "error"}>Password must be at least 8 characters long</span>
                    </li>
              
                    <li className="req-item">
                      <span className={`icon sm ${
                        !password
                          ? 'unchecked'
                          : allValid
                            ? 'checked'
                            : 'checked-error'
                      }`}></span>
                      Password Requirements
                    </li>
              
                  </ul>
              
                  <ul className="sub-list">
                    <li className="sub-item checked-sub">
                      <span className={`icon sm ${!password ? 'unchecked' : conditions.lowercase ? 'checked' : 'checked-error'}`}></span> 
                      <span className={errors.password?.types?.lowercase ? 'error-message-password' : ''}>Must Contain Lower case letters (a-z)</span>
                    </li>
        
                    <li className="sub-item checked-sub">
                      <span className={`icon sm ${!password ? 'unchecked' : conditions.uppercase ? 'checked' : 'checked-error'}`}></span>
                      <span className={errors.password?.types?.uppercase ? 'error-message-password' : ''}>Must Contain Upper case letters (A-Z)</span>   
                    </li>

                    <li className="sub-item checked-sub">
                      <span className={`icon sm ${!password ? 'unchecked' : conditions.number ? 'checked' : 'checked-error'}`}></span>
                      <span className={errors.password?.types?.number ? 'error-message-password' : ''}>Must Contain  Numbers (0-9)</span>
                    </li>
              
                    <li className="sub-item checked-sub">
                      <span className={`icon sm ${!password ? 'unchecked' : conditions.special ? 'checked' : 'checked-error'}`}></span>
                      <span className={errors.password?.types?.special ? 'error-message-password' : ''}>Must Contain Special characters (e.g. !@#$%^&*)</span>
                    </li>
              
                  </ul>
                </div>

              </div>

              {/* <div className="check-row">
                <input type="checkbox" id="terms" name="terms" { ...register("terms", { required: true }) }/>
                <label htmlFor="terms">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></label>
              </div> */}

              <button type="submit" className="btn-submit">
                <span>{loading ? 'Creating Account...' : 'Create my account'}</span>
              </button>

            </form>
{/* 
            <div className="divider">or continue with</div>

            <div className="social-row">
                <button type="button" className="btn-social">
                    {GoogleIcon({ size: 17, color: '#888' })} Google
                </button>
                <button type="button" className="btn-social">
                    {GitHubIcon({ size: 17, color: '#888' })} GitHub
                </button>
            </div> */}

            
          </div>
        </div>
      </div>
    )
}

