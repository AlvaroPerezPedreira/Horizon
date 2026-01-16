import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import type { User } from "firebase/auth";
import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";
import StatsPage from "./pages/StatsPage";

function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage onLogin={setUser} />} />
        <Route
          path="/home"
          element={user ? <HomePage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/map"
          element={user ? <MapPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/stats"
          element={user ? <StatsPage /> : <Navigate to="/" replace />}
        />
      </Routes>
    </>
  );
}

export default App;
