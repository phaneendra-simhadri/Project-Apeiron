import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import StarField from './components/StarField';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Detail = lazy(() => import('./pages/Detail'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md z-50">
    <div className="relative">
      <div className="w-24 h-24 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="relative min-h-screen text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-100 flex flex-col">
          <StarField />

          {/* Background Gradient Orbs */}
          <div className="fixed top-0 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[128px] pointer-events-none" />
          <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-cyan-900/10 rounded-full blur-[128px] pointer-events-none" />

          {/* Main Content */}
          <main className="relative z-10 transition-all duration-500 flex-grow">
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/topic/:id" element={<Detail />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;