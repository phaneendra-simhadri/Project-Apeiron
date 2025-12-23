import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children?: ReactNode;
    fallback?: ReactNode;
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
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-red-500 p-8 text-center font-mono border border-red-900/30 m-4 rounded-xl">
                    <h2 className="text-2xl font-bold mb-4 tracking-widest uppercase">Critical System Failure</h2>
                    <p className="text-slate-400 max-w-lg mb-8">
                        The simulation has encountered an unrecoverable anomaly.
                        <br /><br />
                        <span className="text-xs opacity-50 font-mono text-red-400 bg-red-900/10 p-2 rounded block">
                            {this.state.error?.toString()}
                        </span>
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-red-900/20 border border-red-500/50 rounded hover:bg-red-500/20 transition-colors text-red-200"
                    >
                        REBOOT SYSTEM
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
