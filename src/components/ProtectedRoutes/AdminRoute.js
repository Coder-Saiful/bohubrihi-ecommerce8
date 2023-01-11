import { Route, Redirect } from "react-router-dom";
import { isAuthenticated, userInfo } from "../../utils/auth";

const AdminRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isAuthenticated() ? (
            userInfo().role === 'admin' ? children : (
                <Redirect
                    to={{
                        pathname: "/user/dashboard",
                    state: { from: location }
                    }}
                />
            )
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  export default AdminRoute;