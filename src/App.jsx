import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import QuoteListPage from './pages/QuoteListPage';
import CreateQuotePage from './pages/createQuoteList';
import ProtectedRoute from './pages/ProtectedRoute';
import Navbar from './pages/Navbar';
import { Suspense } from 'react';

function App() {
  return (
    <Suspense fallback={<div className='flex justify-center absolute top-[50%] left-[50%]'> <span className="loader"></span></div>}>
      <Router>
        <ProtectedRoute><Navbar /></ProtectedRoute>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/quotes" element={<ProtectedRoute><QuoteListPage /></ProtectedRoute>} />
          <Route path="/create-quote" element={<ProtectedRoute><CreateQuotePage /></ProtectedRoute>} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
