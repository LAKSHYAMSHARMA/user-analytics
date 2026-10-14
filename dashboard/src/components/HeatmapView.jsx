import { useEffect, useState } from 'react';
import './HeatmapView.css';
import api from '../services/api';

const HeatmapView = () => {
  const [clicks, setClicks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchHeatmap = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await api.get('/api/heatmap');
      setClicks(response.data);
    } catch {
      setError('Unable to load heatmap data.');
      setClicks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadHeatmap = window.setTimeout(fetchHeatmap, 0);

    return () => window.clearTimeout(loadHeatmap);
  }, []);

  return (
    <div className="heatmap-view">
      <div className="heatmap-heading">
        <h2>Heatmap</h2>
        <p>Explore where visitors interact with a page.</p>
      </div>
      <button
        className="heatmap-refresh"
        type="button"
        onClick={fetchHeatmap}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Refresh activity'}
      </button>
      {error && <p className="heatmap-error">{error}</p>}
      <div className="heatmap-stage">
        <svg className="heatmap-canvas" viewBox="0 0 800 600" preserveAspectRatio="none">
          {clicks.map((click, index) => (
            <circle
              className="heatmap-dot"
              key={`${click.x}-${click.y}-${index}`}
              cx={click.x}
              cy={click.y}
              r="5"
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default HeatmapView;