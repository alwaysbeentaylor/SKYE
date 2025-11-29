import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center',
          fontFamily: 'system-ui, sans-serif',
          color: '#ef4444'
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Er is een fout opgetreden</h1>
          <p style={{ marginBottom: '1rem' }}>{this.state.error?.message}</p>
          <pre style={{ 
            background: '#f3f4f6', 
            padding: '1rem', 
            borderRadius: '0.5rem',
            overflow: 'auto',
            textAlign: 'left',
            fontSize: '0.875rem'
          }}>
            {this.state.error?.stack}
          </pre>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '1rem',
              padding: '0.75rem 1.5rem',
              background: '#0ea5e9',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Pagina opnieuw laden
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;





