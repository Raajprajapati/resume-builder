// src/App.jsx
import { ResumeProvider } from './contexts/ResumeContext';
import ResumeBuilder from './components/ResumeBuilder';

function App() {
  return (
    <ResumeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8">
        <ResumeBuilder />
      </div>
    </ResumeProvider>
  );
}

export default App;