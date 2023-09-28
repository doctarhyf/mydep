import { Outlet, Link, NavLink } from "react-router-dom";
import { ROUTES } from "../helpers/flow";

const Layout = () => {
  return (
    <>
      <nav>
        <ul className="flex flex-col sm:flex-row p-4 bg-teal-600 text-white justify-around">
          {Object.values(ROUTES).map((rt, i) => (
            <li key={i}>
              <NavLink
                to={rt.path}
                className={({ isActive }) => (isActive ? "bg-red-500" : "")}
              >
                {rt.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
