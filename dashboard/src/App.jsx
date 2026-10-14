import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HeatmapView from './components/HeatmapView';
import SessionsView from './components/SessionsView';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Navigate to="/sessions" replace />} />
          <Route path="sessions" element={<SessionsView />} />
          <Route path="heatmap" element={<HeatmapView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;