import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const AttackPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="attack-page">
      <h1>Organization: {user?.organization.name}</h1>
      <div className="nav-bar">
        <h3>Avaliable Ammo</h3>
        <div>
        <label>Location</label>
        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="East">East</option>
          <option value="West">West</option>
        </select>
          {user?.organization.resources.map((resource, index) => (
            <span key={index}>
              {resource.name}: {resource.amount}
            </span>
          ))}
        </div>
      </div>
        <h2>Launched Rockets</h2>
        <table style={{ width: "100%", border: "1px solid black", borderCollapse: "collapse", marginTop: "10px" }}>
        <thead>
          <tr>
            <th>Rocket</th>
            <th>Time to Hit</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {user?.organization.resources.map((rocket, index) => (
            <tr key={index}>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttackPage;
