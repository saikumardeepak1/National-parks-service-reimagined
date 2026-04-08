import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import ParksListPage from './pages/ParksListPage';
import ParkPage from './pages/ParkPage';
import PassesPage from './pages/PassesPage';
import ReservationsPage from './pages/ReservationsPage';

// Gate: on any fresh browser session, always return to landing first
function SessionGate({ children }) {
  if (!sessionStorage.getItem('nps_entered')) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home"     element={<SessionGate><HomePage /></SessionGate>} />
        <Route path="/parks"    element={<SessionGate><ParksListPage /></SessionGate>} />
        <Route path="/park/:id" element={<SessionGate><ParkPage /></SessionGate>} />
        <Route path="/passes"   element={<SessionGate><PassesPage /></SessionGate>} />
        <Route path="/reservations" element={<SessionGate><ReservationsPage /></SessionGate>} />
        <Route path="/yosemite" element={<Navigate to="/park/62" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
