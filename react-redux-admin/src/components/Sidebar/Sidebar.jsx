import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <>
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">
                <span>Main</span>
              </li>

              <li className={`${location.pathname === "/" ? "active" : ""}`}>
                <Link to={"/"}>
                  <i className="fe fe-home"></i> <span>Dashboard</span>
                </Link>
              </li>

              <li className={location.pathname === "/tasks" ? "active" : ""}>
                <Link to={"/tasks"}>
                  <i className="fa fa-tasks"></i> <span>Tasks</span>
                </Link>
              </li>

              <li className={location.pathname === "/category" ? "active" : ""}>
                <Link to={"/category"}>
                  <i className="fe fe-bar-chart"></i> <span>Category</span>
                </Link>
              </li>

              <li className={location.pathname === "/tag" ? "active" : ""}>
                <Link to={"/tag"}>
                  <i className="fa fa-signal"></i> <span>Priority</span>
                </Link>
              </li>

              {/* <li
                className={`${location.pathname === "/brand" ? "active" : ""}`}>
                <Link to={"/brand"}>
                  <i className="fe fe-tag"></i> <span>Brands</span>
                </Link>
              </li> */}

              <li
                className={`${location.pathname === "/users" ? "active" : ""}`}>
                <Link to={"/users"}>
                  <i className="fe fe-users"></i> <span>Users</span>
                </Link>
              </li>

              {/* <li
                className={`${
                  location.pathname === "/permission" ? "active" : ""
                }`}>
                <Link to={"/permission"}>
                  <i className="fe fe-lock"></i> <span>Permission</span>
                </Link>
              </li> */}

              <li
                className={`${location.pathname === "/role" ? "active" : ""}`}>
                <Link to={"/role"}>
                  <i className="fa fa-anchor"></i> <span>Role</span>
                </Link>
              </li>

              <li
                className={`${
                  location.pathname === "/profile" ? "active" : ""
                }`}>
                <Link to={"/profile"}>
                  <i className="fa fa-user-plus"></i> <span>Profile</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
