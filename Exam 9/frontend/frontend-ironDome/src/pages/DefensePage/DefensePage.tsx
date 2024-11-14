import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const DefensePage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [missiles, setMissiles] = useState([]);
  const socket = io("http://localhost:5000"); // Replace with your server URL

  useEffect(() => {
    socket.on("missile_launched", (data) => {
      setMissiles((prevMissiles) => [
        ...prevMissiles,
        { ...data, status: "Launched", timeToHit: data.timeToHit },
      ]);
    });

    socket.on("missile_hit", (data) => {
      setMissiles((prevMissiles) =>
        prevMissiles.map((missile) =>
          missile.missileName === data.missileName
            ? { ...missile, status: "Hit" }
            : missile
        )
      );
    });

    socket.on("interception_success", (data) => {
      setMissiles((prevMissiles) =>
        prevMissiles.map((missile) =>
          missile.missileName === data.missileName
            ? { ...missile, status: "Intercepted" }
            : missile
        )
      );
    });

    socket.on("interception_failed", (data) => {
      setMissiles((prevMissiles) =>
        prevMissiles.map((missile) =>
          missile.missileName === data.missileName
            ? { ...missile, status: "Interception Failed" }
            : missile
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const interceptMissile = (missileName, remainingTime) => {
    const interceptorName = "Iron Dome"; // Example interceptor name
    socket.emit("intercept_missile", {
      region: "North",
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
        <table style={{ width: "100%", border: "1px solid black", borderCollapse: "collapse", marginTop: "10px" }}>
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
                  <button onClick={() => interceptMissile(missile.missileName, missile.timeToHit)}>Intercept</button>
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
