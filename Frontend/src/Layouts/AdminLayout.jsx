import { Outlet } from "react-router-dom";

const UserLayout = () => {
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