/* eslint-disable react/no-unescaped-entities */

import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import gdgImage from '../../assets/images/gdg-bgremove.png';
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function getCookieValue(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }

  const token = getCookieValue('token');
  useEffect(() => {
    if (token) {
      const role = localStorage.getItem("role");
      navigate(role === 'admin' ? '/admin/dashboard' : '/user/home');
    }
  }, [token, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!email || !password) {
        toast.error('Please fill all the fields');
        setLoading(false); 
        return;
      }

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}users/login`, {
        email: email,
        password: password
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.status === 200) {
        toast.success('Login Successful');
        const { token, role, email, username, id } = response.data.message;
        dispatch(loginSuccess({ email, username, id, token, role }));
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('email', email);
        localStorage.setItem('username', username);
        document.cookie = `token=${token}`;
        navigate(role === 'admin' ? '/admin/dashboard' : '/user/home');
      }
    } catch (err) {
      toast.error('Login failed');
      console.error(err);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="relative h-[100vh] flex flex-col items-center justify-center min-h-screen p-[1rem] bg-black">
      <div className="absolute flex flex-row-reverse items-center justify-between opacity-10 pointer-events-none">
        <img src={gdgImage} className="w-[100%] hidden md:block"></img>
        <img src={gdgImage} className="w-[100%]"></img>
      </div>
      <div className="relative z-10 container shadow-sm shadow-white flex flex-col">
        <div className="heading">Sign In</div>
        <div className="form">
          <input
            placeholder="Email"
            id="email"
            type="email"
            className="input" 
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <input
            placeholder="Password"
            id="password"
            type="password"
            className="input" 
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading} 
          />
          <span className="forgot-password">
            <a href="#">Forgot Password ?</a>
          </span>
          <button
            onClick={(e) => handleLogin(e)}
            className={`login-button ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading} 
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          <p className="text-white text-center">
            Don't have an account ?
            <Link to='/signup'><span className="text-gray-400 hover:text-gray-300"> Register</span></Link>
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
