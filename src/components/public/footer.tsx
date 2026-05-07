export function PublicFooter() {
  return (
    <footer className="footer bg-primary">
      <div className="container">
        <div className="text-center">
          <h3>Divinerock Engineering Services</h3>
          <p>Delivering resilient engineering solutions across Sierra Leone.</p>
          <p style={{ marginTop: '10px', opacity: 0.9 }}>© {new Date().getFullYear()} Divinerock ES. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}