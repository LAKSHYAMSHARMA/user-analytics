import { useState, useEffect } from 'react';
import axios from 'axios';
import './SessionsView.css';

const SessionsView = () => {
  const [sessions, setSessions] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [sessionsLoading, setSessionsLoading] = useState(true);
  const [timelineLoading, setTimelineLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isCurrent = true;

    const fetchSessions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/sessions');
        if (isCurrent) {
          setSessions(response.data);
        }
      } catch {
        if (isCurrent) {
          setError('Unable to load sessions.');
        }
      } finally {
        if (isCurrent) {
          setSessionsLoading(false);
        }
      }
    };

    fetchSessions();

    return () => {
      isCurrent = false;
    };
  }, []);

  useEffect(() => {
    if (!selectedSessionId) {
      return undefined;
    }

    let isCurrent = true;

    const fetchTimeline = async () => {
      setTimelineLoading(true);
      setError('');

      try {
        const response = await axios.get(
          `http://localhost:5000/api/events/${encodeURIComponent(selectedSessionId)}`
        );
        if (isCurrent) {
          setTimeline(response.data);
        }
      } catch {
        if (isCurrent) {
          setError('Unable to load the selected session.');
          setTimeline([]);
        }
      } finally {
        if (isCurrent) {
          setTimelineLoading(false);
        }
      }
    };

    fetchTimeline();

    return () => {
      isCurrent = false;
    };
  }, [selectedSessionId]);

  return (
    <div className="sessions-view">
      <div className="sessions-heading">
        <div>
          <h2>Sessions</h2>
          <p>Review visitor activity and follow each user journey.</p>
        </div>
        {!sessionsLoading && sessions.length > 0 && (
          <span className="sessions-count">{sessions.length} sessions</span>
        )}
      </div>
      {error && <p className="sessions-error">{error}</p>}
      {sessionsLoading ? (
        <div className="sessions-message">Loading sessions...</div>
      ) : sessions.length === 0 ? (
        <div className="sessions-message">No sessions found.</div>
      ) : (
        <div className="sessions-table-wrap">
          <table className="sessions-table">
            <thead>
              <tr>
                <th>Session ID</th>
                <th>Total events</th>
                <th>Journey</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr
                  key={session.sessionId}
                  className={selectedSessionId === session.sessionId ? 'selected' : ''}
                >
                  <td className="session-id">{session.sessionId}</td>
                  <td><span className="event-count">{session.eventCount}</span></td>
                  <td>
                    <button
                      type="button"
                      className={`journey-button ${selectedSessionId === session.sessionId ? 'active' : ''}`}
                      onClick={() => setSelectedSessionId(
                        selectedSessionId === session.sessionId ? null : session.sessionId
                      )}
                    >
                      {selectedSessionId === session.sessionId ? 'Hide Journey' : 'View Journey'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedSessionId && (
        <section className="journey-panel">
          <h3>User Journey</h3>
          <div className="journey-session-id">{selectedSessionId}</div>
          {timelineLoading ? (
            <div className="sessions-message">Loading journey...</div>
          ) : timeline.length === 0 ? (
            <div className="sessions-message">No events found for this session.</div>
          ) : (
            <ol className="journey-timeline">
              {timeline.map((event, index) => (
                <li className="journey-event" key={event._id || `${event.timestamp}-${index}`}>
                  <span className="journey-dot" />
                  <div className="journey-event-header">
                    <span className="journey-event-name">
                      {event.event.replace('_', ' ')}
                    </span>
                    <time className="journey-event-time">
                      {new Date(event.timestamp).toLocaleString()}
                    </time>
                  </div>
                  {event.url && <div className="journey-event-detail">{event.url}</div>}
                  {event.event === 'click' && (
                    <div className="journey-event-detail">
                      Click position: ({event.pageX}, {event.pageY})
                    </div>
                  )}
                </li>
              ))}
            </ol>
          )}
        </section>
      )}
    </div>
  );
};

export default SessionsView;