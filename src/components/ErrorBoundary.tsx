import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
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
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-bg-primary p-10 text-center">
          <div className="max-w-xl w-full bg-bg-card border border-border-soft rounded-[40px] p-16 shadow-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-status-error/5 pointer-events-none" />
            <div className="w-20 h-20 bg-status-error/10 text-status-error rounded-[28px] flex items-center justify-center mx-auto mb-10 border border-status-error/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-4xl font-display text-text-primary mb-6 uppercase tracking-tighter font-medium">Protocol Interrupted</h2>
            <p className="text-text-muted text-[13px] mb-12 uppercase tracking-[0.2em] leading-relaxed max-w-sm mx-auto opacity-70">
              A temporal aberration has manifested within the archive. We must re-initialize the link to maintain structural integrity.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="btn-primary w-full py-6 text-[10px] font-black uppercase tracking-[0.4em] !rounded-[24px]"
            >
              Re-initialize Link
            </button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <pre className="mt-12 p-6 bg-black/40 border border-border-soft rounded-2xl text-left text-[10px] text-status-error/80 overflow-auto max-h-48 scrollbar-hide font-mono uppercase tracking-tighter">
                {this.state.error.toString()}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
