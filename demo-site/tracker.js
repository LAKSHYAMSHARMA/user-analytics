(function () {
  const DEMO_API_URL = (window.DEMO_API_URL || 'https://user-analytics-backend-7m1e.onrender.com').replace(/\/$/, '');
  const BACKEND_URL = `${DEMO_API_URL}/api/events`;

  function getSessionId() {
    let id = localStorage.getItem('analytics_session_id');
    if (!id) {
      id = 'sess_' + Math.random().toString(36).substring(2, 11) + Date.now();
      localStorage.setItem('analytics_session_id', id);
    }
    return id;
  }

  function sendEvent(payload) {
    fetch(BACKEND_URL, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`Analytics request failed with status ${response.status}`);
      }
    }).catch((err) => console.error('Analytics tracking failed:', err));
  }

  window.addEventListener('load', () => {
    sendEvent({
      event: 'page_view',
      url: window.location.href,
      timestamp: new Date().toISOString(),
      sessionId: getSessionId()
    });
  });

  document.addEventListener('click', (event) => {
    sendEvent({
      event: 'click',
      pageX: event.pageX,
      pageY: event.pageY,
      url: window.location.href,
      timestamp: new Date().toISOString(),
      sessionId: getSessionId()
    });
  });

  window.AnalyticsTracker = { getSessionId, sendEvent };
})();