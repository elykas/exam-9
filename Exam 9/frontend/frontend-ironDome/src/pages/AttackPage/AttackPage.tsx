import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Missile } from "../../types/userType";
import { io } from "socket.io-client";
import "./AttackPage.css"

const AttackPage = () => {
   
        const { user } = useSelector((state: RootState) => state.auth);
        const [location, setLocation] = useState("");
        const [missiles, setMissiles] = useState<Missile[]>([]);
        const socket = io("http://localhost:5000");
        useEffect(() => {
            if (location) {
              const roomName = `IDF - ${location}`;
                socket.emit("join_room", roomName);
              }
          
            socket.on("missile-launched", (data) => {
              setMissiles((prev) => [...prev, { ...data, status: "Launched" }]);
              console.log(data);
              
            });
        
            socket.on("missile-inAir", (data) => {
              setMissiles((prev) =>
                prev.map((missile) =>
                  missile.missileName === data.missileName ? { ...missile, timeToHit: data.count } : missile
                )
              );
            });
        
            socket.on("missile-hit", (data) => {
              setMissiles((prev) =>
                prev.map((missile) =>
                  missile.missileName === data.missileName ? { ...missile, status: "Hit" } : missile
                )
              );
            });
            return () => {
                if (location) {
                  const roomName = `IDF - ${location}`;
                    socket.emit("leave_room", roomName);
                  }
                  socket.disconnect();
                };
              }, [location]);

            const handleLaunchMissile = (missileName: string) => {
              console.log("333");
              
                socket.emit("launch-missile", { userId: user?._id, region: location, missileName });
              };
      
  return (
    <div className="attack-page">
      <h1>Organization: {user?.organization.name}</h1>
      <div className="nav-bar">
        <h3>Avaliable Ammo</h3>
        <div >
        <label>Location</label>
        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="East">East</option>
          <option value="West">West</option>
        </select>
        {user?.organization.resources.map((resource, index) => (
            <button key={index} onClick={() => handleLaunchMissile(resource.name)}>
              {resource.name}: {resource.amount}
            </button>
          ))}
        </div>
      </div>
        <h2>Launched Rockets</h2>
        <table>
        <thead>
          <tr>
            <th>Rocket</th>
            <th>Time to Hit</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {missiles.map((missile, index) => (
            <tr key={index}>
              <td>{missile.missileName}</td>
              <td>{missile.timeToHit}</td>
              <td>{missile.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttackPage;
