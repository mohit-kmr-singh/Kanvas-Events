import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import ExploreEvents from './pages/ExploreEvents';
import EventDetails from './pages/EventDetails';
import Registration from './pages/Registration';
import NotFound from './pages/NotFound';
import StubPage from './pages/StubPage';

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <WishlistProvider>
          <AuthProvider>
            <BrowserRouter>
              <div className="flex flex-col min-h-screen transition-colors duration-300">
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/events" element={<ExploreEvents />} />
                    <Route path="/events/:id" element={<EventDetails />} />
                    <Route path="/events/:id/register" element={<Registration />} />
                    <Route path="/registration-success" element={<StubPage title="Registration Success" />} />
                    <Route path="/my-registrations" element={<StubPage title="My Registrations" />} />
                    <Route path="/about" element={<StubPage title="About Us" />} />
                    <Route path="/contact" element={<StubPage title="Contact Us" />} />
                    <Route path="/wishlist" element={<StubPage title="Event Wishlist" />} />
                    <Route path="/calendar" element={<StubPage title="Event Calendar" />} />
                    <Route path="/login" element={<StubPage title="Demo Login" />} />
                    <Route path="/signup" element={<StubPage title="Demo Sign Up" />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
                <ScrollToTop />
              </div>
            </BrowserRouter>
          </AuthProvider>
        </WishlistProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
