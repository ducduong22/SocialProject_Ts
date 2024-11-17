import "../assets/preview/stylesheets/css/CreateAccount.css";
import logo from "../assets/preview/image/logoWeb.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerRequest } from "../store/login/userSlice"; // Ensure the action is correctly imported
import { Login } from "../container/type";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const [user, setUserState] = useState<Login>({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [status, setStatus] = useState<"success" | "failure" | "">("");

  const dispatch = useDispatch(); // No typing applied here
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.password === confirmPassword) {
      dispatch(registerRequest(user)); // Dispatching the action
      navigate("/login");
    } else {
      alert("Passwords do not match");
      setStatus("failure");
    }
  };

  return (
    <div className="page min-h-screen bg-gray-800 items-center justify-center ">
      <div className="flex">
        <div className="flex flex-row">
          <div className="left p-6 text-white flex flex-col justify-center">
            <h3 className="gradient-text-register">Global Connection </h3>
            <h4 className="text-white">
              Welcome <br />
              Create an account to connect with your friends <br />
            </h4>
          </div>
          <div className="right p-6 flex flex-col justify-center items-center">
            <div className="form p-2 bd-highlight">
              <img className="logo-page-register" src={logo} alt="Logo" />
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Username"
                    className="label_input border border-dark mb-2"
                    value={user.name}
                    onChange={(e) =>
                      setUserState((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email"
                    className="label_input border border-dark mb-2"
                    value={user.email}
                    onChange={(e) =>
                      setUserState((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Password"
                    className="label_input border border-dark mb-2"
                    value={user.password}
                    onChange={(e) =>
                      setUserState((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="label_input border border-dark mb-2"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="line"></div>
                <div className="form-button">
                  <button type="submit" className="button-sign-up">
                    Register
                  </button>
                  {status === "failure" && (
                    <p style={{ color: "red" }}>
                      Please fill in all fields completely or check passwords.
                    </p>
                  )}
                </div>
                <div className="form-button">
                  <div className="d-flex mb-3 mt-1">
                    <div className="text-white p-2">
                      Already have an account?
                    </div>
                    <Link className="p-2" to="/login">
                      Login
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
