import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard'; // Import AdminDashboard component
import Courses from './components/Courses';
import Detail from './components/Detail';
import DocumentManager from './components/DocumentManager';
import NoteEditor from './components/NoteEditor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} /> {/* Route for Login */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* Route for Admin Dashboard */}
        <Route path="/courses" element={<Courses />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/documents" element={<DocumentManager />} />
        <Route path="/note-editor" element={<NoteEditor />} />
      </Routes>
    </Router>
  );
}

export default App;