import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { ChangelogPage } from './pages/ChangelogPage';

// fix the scroll position on route changee
const ScrollFix = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // frce scroll to top 
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// TODO: add a proper 404 page later
const NotFound = () => <Navigate to="/" replace />;

export default function App() {
  return (
    <BrowserRouter>
      <ScrollFix />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/changelog" element={<ChangelogPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
