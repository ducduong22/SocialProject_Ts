import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/preview/stylesheets/css/Login.css";
import logo from "../assets/preview/image/logoWeb.png";
import { useDispatch } from "react-redux";
import { loginRequest } from "../store/login/userSlice";
import { Login } from "../container/type";
import { Button, Form, Input } from "antd";

const LoginPage: React.FC = () => {
  const [user, setUserState] = useState<Login>({
    name: "",
    email: "",
    password: "",
  });
  const [status, setStatus] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      const email = user.email;
      const password = user.password;
      dispatch(loginRequest({ email, password }));
      setStatus("Login successful! Redirecting to homepage...");
      setTimeout(() => {
        navigate("/homepage");
      }, 2000);
    } catch (error) {
      setStatus("Login failed. Please try again.");
    }
  };

  return (
    <div className="page min-h-screen bg-gray-800 items-center justify-center ">
      <div className="flex">
        <div className="flex flex-row">
          {/* Left side */}
          <div className="left p-6 text-white flex flex-col justify-center">
            <h3 className="gradient-text">Global Connection</h3>
            <h4 className="text-linen">
              Welcome <br />
              Start your journey <br />
            </h4>
          </div>
          {/* Right side */}
          <div className="right p-6 flex flex-col justify-center items-center">
            <div className="form p-2 bd-highlight">
              <img className="logo-page-login" src={logo} alt="Logo" />
              <Form onFinish={onFinish}>
                <div className="form-group">
                  <Form.Item>
                    <Input
                      className="label_input mt-2 border border-dark mb-2 bg-slate-800"
                      type="email"
                      id="email"
                      placeholder="Email or phone number"
                      value={user.email}
                      onChange={(e) =>
                        setUserState((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      required
                    ></Input>
                  </Form.Item>
                </div>
                <div className="form-group">
                  <Form.Item>
                    <Input.Password
                      className="label_input border border-dark text-white mb-2 custom-password-input bg-slate-800"
                      type="password"
                      id="password"
                      placeholder="Password"
                      value={user.password}
                      onChange={(e) =>
                        setUserState((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      required
                    ></Input.Password>
                  </Form.Item>
                </div>
                <div className="form-group">
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="Login-button"
                    >
                      Login
                    </Button>
                  </Form.Item>
                </div>
              </Form>
              {status && <p style={{ color: "green" }}>{status}</p>}
              <Link
                className="Forgot-link text-decoration-none"
                to="/login/forgot-password"
              >
                Forgot password?
              </Link>
              <div className="line"></div>
              <Link
                to="/login/Register"
                className="Create-account-button text-decoration-none"
              >
                Create a new account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
