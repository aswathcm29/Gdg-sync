import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";




const UserLayout = () => {
  const navigate = useNavigate()

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
      if(!token){
        navigate('/login');
      }
    },[navigate,token])
    return (
      <div>
        <nav>
            {/* Navbar */}
        </nav>
        <div>
          <Outlet />
        </div>
      </div>
    );
  };
  
  export default UserLayout;