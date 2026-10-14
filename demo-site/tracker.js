(function () {
  const BACKEND_URL = 'http://localhost:5000/api/events';

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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch((err) => console.error(err));
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