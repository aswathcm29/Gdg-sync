/* eslint-disable react/no-unescaped-entities */

import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster,toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import gdgImage from '../../assets/images/gdg-bgremove.png'

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [contactno,setContactno] = useState("");
  const navigate = useNavigate();

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
 useEffect(()=>{
  if(token){
    const role = localStorage.getItem("role");
    navigate(role === 'admin' ? '/admin/dashboard' : '/user/home');
  }
 },[token,navigate])

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      if (!username || !password || !email || !password) {
         toast.error('Please fill all the fields');
         return
      }
      
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}users/signup`,{
        username: username,
        password: password,
        email:email,
        contactno:contactno
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      if(response.status===200){
      toast.success('Login Successful');
      const { token, role ,email} = response.data.message;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('role', email);
      document.cookie = `token = ${token}`
      }
    } catch (err) {
      toast.error('Login failed')
      console.error(err);
    }
  };
  
  return (
    <div className="relative h-[100vh] flex flex-col items-center justify-center bg-black p-[1rem]">
    <div className="absolute flex  flex-row-reverse items-center justify-between opacity-10 pointer-events-none">
      {/* <p className="hidden lg:block text-[6rem] text-white text-right p-[1rem]">Get your GDG events managed </p> */}
      <img src={gdgImage} className="w-[100%] hidden md:block"></img>
      <img src={gdgImage} className="w-[100%] hidden md:block"></img>

      
    </div>
    <div className="relative z-10 container shadow-sm shadow-white flex flex-col">
      <div className="heading">Register</div>
      <div className="form" action="">
        <input
          placeholder="Username"
          id="username"
          type="text"
          className="input"
          onChange={((e)=>setUsername(e.target.value))}
        />
         <input
          placeholder="Email"
          id="email"
          type="email"
          className="input"
          onChange={((e)=>setEmail(e.target.value))}
        />
         <input
          placeholder="Phone number"
          id="contactno"
          type="number"
          className="input"
          onChange={(e)=>setContactno(e.target.value)}
        />
        <input
          placeholder="Password"
          id="password"
          type="password"
          className="input"
          onChange={(e)=>setPassword(e.target.value)}
        />
        <button onClick={(e)=>handleLogin(e)} className="login-button" >Register</button>
        <p className="text-white text-center">
            Have an account ?
            <Link to='/login'><span className="text-gray-400 hover:text-gray-300"> Login</span></Link>
          </p>
      </div>
    </div>
    <Toaster/>
    </div>
  
  )
}

export default Signup