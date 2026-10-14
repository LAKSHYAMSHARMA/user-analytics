import { useState } from 'react';
import './HeatmapView.css';
import api from '../services/api';

const HeatmapView = () => {
  const [url, setUrl] = useState('');
  const [clicks, setClicks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchHeatmap = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await api.get(
        `/api/heatmap?url=${encodeURIComponent(url)}`
      );
      setClicks(response.data);
    } catch {
      setError('Unable to load heatmap data.');
      setClicks([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="heatmap-view">
      <div className="heatmap-heading">
        <h2>Heatmap</h2>
        <p>Explore where visitors interact with a page.</p>
      </div>
      <form
        className="heatmap-search"
        onSubmit={(event) => {
          event.preventDefault();
          fetchHeatmap();
        }}
      >
        <span className="heatmap-search-icon">⌕</span>
        <input
          type="text"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="Enter a page URL to inspect"
          aria-label="Page URL"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Data'}
        </button>
      </form>
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