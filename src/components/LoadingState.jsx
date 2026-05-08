export function LoadingState() {
  return (
    <div className="state-container">
      <div className="skeleton-list">
        {[...Array(4)].map((_, i) => (
          <div className="skeleton-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="skeleton-top">
              <div className="skeleton-lines">
                <div className="skeleton-line title" />
                <div className="skeleton-line subtitle" />
                <div className="skeleton-tags">
                  <div className="skeleton-tag" />
                  <div className="skeleton-tag" />
                  <div className="skeleton-tag" />
                </div>
              </div>
              <div className="skeleton-btn" />
            </div>
            <div className="skeleton-line body" />
            <div className="skeleton-line body short" />
            <div className="skeleton-footer">
              <div className="skeleton-line date" />
              <div className="skeleton-apply" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function EmptyState({ icon, message }) {
  return (
    <div className="state-container">
      <div className="empty-state-box">
        <span className="empty-icon">{icon}</span>
        <p className="empty-message">{message}</p>
      </div>
    </div>
  );
}