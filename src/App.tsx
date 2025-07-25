import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DynamicForm from './components/DynamicForm';
import type { FormSchema } from './types/formSchema';

const FORM_SCHEMA_URL = 'https://sharejson.com/api/v1/uzjxOUc_5VccqT-1XiEYf';

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
    <h1 className="text-3xl font-bold mb-4">Dynamic Form Builder</h1>
    <Link to="/form" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Go to Form</Link>
  </div>
);

const FormPage = () => {
  const [schema, setSchema] = useState<FormSchema | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(FORM_SCHEMA_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch schema');
        return res.json();
      })
      .then((data) => {
        console.log('Fetched schema:', data);

        setSchema(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading form schema...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">Error: {error}</div>;
  if (!schema) return <div className="min-h-screen flex items-center justify-center">No schema found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <DynamicForm schema={schema} />
    </div>
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/form" element={<FormPage />} />
    </Routes>
  </Router>
);

export default App;
