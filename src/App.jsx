import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import PortalLayout from './components/portal/PortalLayout';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import WhyChooseUs from './pages/WhyChooseUs';
import Industries from './pages/Industries';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import SetNewPassword from './pages/SetNewPassword';

// Lazy-loaded portal pages for faster initial load
const AgencyDashboard = lazy(() => import('./pages/portal/AgencyDashboard'));
const ClaimStatus = lazy(() => import('./pages/portal/ClaimStatus'));
const SuperAdmin = lazy(() => import('./pages/portal/SuperAdmin'));
const AgencyDetail = lazy(() => import('./pages/portal/AgencyDetail'));
const RequiredSettings = lazy(() => import('./pages/RequiredSettings'));

const PortalFallback = () => (
  <div className="flex items-center justify-center h-64">
    <div className="w-8 h-8 border-2 border-white/20 border-t-blue-400 rounded-full animate-spin" />
  </div>
);

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isPortalPage = location.pathname.startsWith('/portal');

  return (
    <>
      <ScrollToTop />
      {isPortalPage ? (
        // Portal pages get their own full-screen layout (sidebar handles navigation)
        <Routes>
          <Route
            path="/portal/set-password"
            element={
              <ProtectedRoute allowWhenPasswordResetRequired>
                <div className="min-h-screen bg-slate-950">
                  <SetNewPassword />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/portal"
            element={
              <ProtectedRoute>
                <PortalLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/portal/dashboard" replace />} />
            <Route
              path="dashboard"
              element={
                <Suspense fallback={<PortalFallback />}>
                  <AgencyDashboard />
                </Suspense>
              }
            />
            <Route
              path="claims"
              element={
                <Suspense fallback={<PortalFallback />}>
                  <ClaimStatus />
                </Suspense>
              }
            />
            <Route
              path="settings"
              element={
                <Suspense fallback={<PortalFallback />}>
                  <RequiredSettings />
                </Suspense>
              }
            />
            <Route
              path="super-admin"
              element={
                <ProtectedRoute requiredRole="super_admin">
                  <Suspense fallback={<PortalFallback />}>
                    <SuperAdmin />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="super-admin/agencies/:agencyId"
              element={
                <ProtectedRoute requiredRole="super_admin">
                  <Suspense fallback={<PortalFallback />}>
                    <AgencyDetail />
                  </Suspense>
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      ) : (
        // Marketing / public pages with Navbar + Footer
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 relative">
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl opacity-20"></div>
          </div>
          <div className="relative z-10">
            {!isAuthPage && <Navbar />}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/why-choose-us" element={<WhyChooseUs />} />
              <Route path="/industries" element={<Industries />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            {!isAuthPage && <Footer />}
          </div>
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;