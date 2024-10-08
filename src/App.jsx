import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Account from "./pages/Account";
import AuthMiddleware from "./middlewares/AuthMiddleware";
import ChangePassword from "./pages/ChangePassword";
export default function App() {
  const { loginWithPopup, user, isLoading, isAuthenticated, logout } =
    useAuth0();

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {isLoading ? (
          <p>Loading...</p>
        ) : isAuthenticated ? (
          <>
            <span>Chào bạn: {user.name}</span>
            <Link to="/account" className="btn btn-outline-primary btn-sm">
              Tài khoản
            </Link>
            <Link
              to="/change-password"
              className="btn btn-outline-primary btn-sm"
            >
              Đổi mật khẩu
            </Link>
            <button
              className="btn btn-danger btn-sm"
              onClick={() =>
                logout({
                  logoutParams: { returnTo: import.meta.env.VITE_APP_URL },
                })
              }
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() =>
              loginWithPopup({
                authorizationParams: {
                  ui_locales: "vi",
                },
              })
            }
          >
            Login
          </button>
        )}
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<AuthMiddleware />}>
          <Route path="/account" element={<Account />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>
      </Routes>
    </div>
  );
}
