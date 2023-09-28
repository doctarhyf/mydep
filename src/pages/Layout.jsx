import { Outlet, Link } from "react-router-dom";
import { ROUTES } from "../helpers/flow";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to={ROUTES.NEW_ITEM.path}>New Item</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
