import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import WhyChooseUs from './pages/WhyChooseUs';
import Industries from './pages/Industries';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 relative">
        {/* Animated background orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl opacity-20"></div>
        </div>

        {/* Main content */}
        <div className="relative z-10">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/why-choose-us" element={<WhyChooseUs />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;