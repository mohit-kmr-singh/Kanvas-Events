import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import RegistrationSuccess from './pages/RegistrationSuccess';
import MyRegistrations from './pages/MyRegistrations';
import Contact from './pages/Contact';
import Wishlist from './pages/Wishlist';
import CalendarView from './pages/CalendarView';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <WishlistProvider>
          <AuthProvider>
            <BrowserRouter>
              <div className="flex flex-col min-h-screen bg-[#FDFBF7] text-[#121B28] dark:bg-[#121B28] dark:text-[#F4F2EE] transition-colors duration-300">
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/events" element={<ExploreEvents />} />
                    <Route path="/events/:id" element={<EventDetails />} />
                    <Route path="/events/:id/register" element={<Registration />} />
                    <Route path="/registration-success" element={<RegistrationSuccess />} />
                    <Route path="/my-registrations" element={<MyRegistrations />} />
                    <Route path="/about" element={<Navigate to="/" replace />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/calendar" element={<CalendarView />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
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
