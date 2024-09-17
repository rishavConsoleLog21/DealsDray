import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const userName = "John Doe"; 
  const handleLogout = () => {
    // Add your logout logic here
    console.log("User logged out");
    navigate("/login");
  };

  return (
    <div>
      <nav style={styles.navbar}>
        <button style={styles.button} onClick={() => navigate("/")}>
          Home
        </button>
        <button
          style={styles.button}
          onClick={() => navigate("/employee-list")}
        >
          Employee List
        </button>
        <button style={styles.button} onClick={handleLogout}>
          Logout
        </button>
        <span style={styles.userName}>{userName}</span>
      </nav>
      <div style={styles.content}>
        <h1>Welcome Admin Panel</h1>
      </div>
    </div>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#f8f9fa",
    borderBottom: "1px solid #dee2e6",
  },
  button: {
    margin: "0 10px",
    padding: "10px 20px",
    cursor: "pointer",
  },
  userName: {
    marginLeft: "auto",
    padding: "10px 20px",
  },
  content: {
    padding: "20px",
  },
};

export default Dashboard;
