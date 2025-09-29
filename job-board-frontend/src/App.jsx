import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { JobProvider } from './context/JobContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import JobDetailsPage from './pages/JobDetailsPage';

function App() {
  return (
    <Router>
      <JobProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/jobs/:id" element={<JobDetailsPage />} />
          </Routes>
        </div>
      </JobProvider>
    </Router>
  );
}

export default App;