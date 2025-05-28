import { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(import.meta.env.VITE_API_URL + '/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => alert(data.message))
      .catch(err => alert('Error: ' + err.message));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">My Portfolio</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">About Me</h2>
        <p className="text-lg">Hi! I'm a developer showcasing my work. Feel free to explore my projects and get in touch!</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map(project => (
            <div key={project.id} className="p-4 border rounded shadow">
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p>{project.description}</p>
              <a href={project.link} className="text-blue-500" target="_blank" rel="noopener noreferrer">View Project</a>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Contact Me</h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            value={form.message}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          ></textarea>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Send</button>
        </form>
      </section>
    </div>
  );
}

export default App;