import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import { register } from "../../store/features/authSlice/authSlice";
import "./RegisterPage.css"



const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invalidRegister, setInvalidRegister] = useState(false);
  const [organization, setOrganization] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const organizationToSend = organization === "IDF" ? location : organization;
      await dispatch(register({ username, password, organization: organizationToSend }));
      navigate(`/`);
    } catch (error) {
      console.error("cannot register");
      setInvalidRegister(true);
    } finally {
      setUsername("");
      setPassword("");
    }
  };

  const handleOrganizationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrganization(e.target.value);
    setLocation(""); 
  };

  return (
    <div className="register-form">
        <h2>Register</h2>
      <form  onSubmit={handleRegister}>
        <div className="input-box">
          <label> Username : </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label> Password : </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
        <label>Organization:</label>
        <select value={organization} onChange={handleOrganizationChange}>
          <option value="">Select Organization</option>
          <option value="IDF">IDF</option>
          <option value="Hezbollah">Hezbollah</option>
          <option value="Hamas">Hamas</option>
          <option value="IRGC">IRGC</option>
          <option value="Houthis">Houthis</option>
        </select>
      </div>

      {organization === "IDF" && (
        <div>
          <label>Location:</label>
          <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">Select Organization</option>
          <option value="IDF - North">IDF - North</option>
          <option value="IDF - South">IDF - South</option>
          <option value="IDF - Center">IDF - Center</option>
          <option value="IDF - West Bank">IDF - West Bank</option>
          </select>
        </div>
      )}
        <input type="submit" />
      </form>
      <p style={{ color: "red" }}>{invalidRegister && "failed to register"}</p>
      <p className="back-login">
        Back to 
        {
          <Link to={"/"}>
            <button className="button-login-back"> Login</button>
          </Link>
        }
      </p>
    </div>
  );
};

export default Register;
