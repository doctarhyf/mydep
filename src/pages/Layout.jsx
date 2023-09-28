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
                className={({ isActive, isPending }) => {
                  let def =
                    " text-white hover:bg-teal-100 hover:text-teal-800 p-2 rounded-md";

                  return isActive ? def + " bg-teal-100 text-teal-800 " : def;
                }}
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
