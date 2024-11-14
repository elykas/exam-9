import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { io } from "socket.io-client";
import { Missile, missleData } from "../../types/userType";
import "./DefensePage.css"
const DefensePage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [missiles, setMissiles] = useState<Missile[]>([]);
  const socket = io("http://localhost:5000");
  const missilesData = missleData;

  useEffect(() => {
    if (user?.organization.name) {
        socket.emit("join_room", user.organization.name);
      }
    socket.on("missile-launched", (data: Missile) => {
        setMissiles((prevMissiles) => [...prevMissiles,{ ...data, status: "Launched", timeToHit: data.timeToHit },
        ]);
      });

    socket.on("missile-hit", (data) => {
      setMissiles((prevMissiles) =>
        prevMissiles.map((missile) => missile.missileName === data.missileName? { ...missile, status: "Hit" }: missile
        )
      );
    });

    socket.on("interception-success", (data) => {
      setMissiles((prevMissiles) =>
        prevMissiles.map((missile) => missile.missileName === data.missileName?
       { ...missile, status: "Intercepted" }: missile
        )
      );
    });

    return () => {
        if (user?.organization.name) {
            socket.emit("leave_room", user.organization.name);
          }
          socket.disconnect();
        };
      }, [socket, user]);

  const handleInterceptMissile = (missileName:string, remainingTime:number| undefined,region:string) => {
    if (!remainingTime) return;
    const interceptorName = missilesData.filter((interceptor) =>
        interceptor.intercepts.includes(missileName)
      );
    
    socket.emit("intercept_missile", {
      region,
      missileName,
      interceptorName,
      remainingTime,
    });
  };
  return (
    <div className="defense-page">
      <h1>Organization: {user?.organization.name}</h1>
      <div className="nav-bar">
        <h3>Avaliable Ammo</h3>
        <div>
          {user?.organization.resources.map((resource, index) => (
            <span key={index}>
              {resource.name}: {resource.amount}
            </span>
          ))}
        </div>
      </div>
        <h2>Launched Rockets</h2>
        <table >
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
              <td>{missile.timeToHit}s</td>
              <td>{missile.status}</td>
              <td>
                {missile.status === "Launched" && (
                  <button
                    onClick={() =>
                      handleInterceptMissile(missile.missileName, missile.timeToHit,missile.region)
                    }
                  >
                    Intercept
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DefensePage;
