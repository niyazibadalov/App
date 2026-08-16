import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary yaxaladığı xəta:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', border: '2px solid #e74c3c', borderRadius: '8px', margin: '20px', backgroundColor: '#fdf2f2' }}>
          <h2 style={{ color: '#e74c3c', marginTop: 0 }}>Xəta baş verdi!</h2>
          <p>Bu komponentdə xəta yarandı, lakin Error Boundary tətbiqin qalan hissəsinin çökməsinin qarşısını aldı.</p>
          <button 
            onClick={() => window.location.reload()} 
            style={{ padding: '8px 16px', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Səhifəni yenilə
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;