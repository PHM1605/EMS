import {Link, Outlet, useNavigate} from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/logout')
    .then(result=>{
      if (result.data.Status) {
        localStorage.removeItem("valid");
        navigate('/');
      }
    })
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-auto col-2 px-0 px-sm-2">
          <div className="d-flex flex-column align-items-center align-items-sm-start bg-dark vh-100 pt-2 px-3">
            <Link to="/dashboard" className="fs-5 text-white text-decoration-none d-none d-sm-inline">
              MinTek
            </Link>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0">
              <li>
                <Link to="/dashboard" className="nav-link text-white px-0">
                  <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className="ms-2">
                    Dashboard
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/employee" className="nav-link text-white ps-0 pe-1">
                  <i className="fs-4 bi-people ms-2"></i>
                  <span className="ms-2">
                    Employees
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/category" className="nav-link text-white px-0">
                  <i className="fs-4 bi-columns ms-2"></i>
                  <span className="ms-2">
                    Category
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/profile" className="nav-link px-0 text-white">
                  <i className="fs-4 bi-person ms-2"></i>
                  <span className="ms-2">
                    Profile
                  </span>
                </Link>
              </li>
              <li onClick={handleLogout}>
                <Link className="nav-link px-0 text-white">
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2">
                    Logout
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col m-0 p-0">
          <div className="d-flex justify-content-center p-2 shadow">
            <h4>Employee Management System</h4>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;