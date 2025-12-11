import { useState, useEffect } from "react";
import ThoughtForm from "./components/ThoughtForm";
import ThoughtList from "./components/ThoughtList";
import { getThoughts, postThought, likeThought } from "./api/thoughts";

function App() {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. FETCH
  useEffect(() => {
    const loadThoughts = async () => {
      try {
        setLoading(true);
        const data = await getThoughts();
        setThoughts(data);
      } catch (err) {
        setError("Could not load happy thoughts.");
      } finally {
        setLoading(false);
      }
    };

    loadThoughts();
  }, []);

  // 2. HANDLE SUBMIT FORM
  const handleSubmit = async (message) => {
    setError(null);

    const newThought = await postThought(message);

    if (newThought.message && !newThought.errors) {
      setThoughts((prev) => [newThought, ...prev]);
      return { ok: true };
    } else {
      setError("Your thought must be 5–140 characters.");
      return { ok: false };
    }
  };

  // 3. LIKE LOGIC
  const handleLike = async (id) => {
    setThoughts((prev) =>
      prev.map((t) =>
        t._id === id ? { ...t, hearts: t.hearts + 1 } : t
      )
    );

    try {
      await likeThought(id);
    } catch (err) {
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-xl px-4 py-8">
        <h1 className="mb-6 text-center text-4xl font-bold tracking-tight">
          Happy Thoughts 💌
        </h1>

        <ThoughtForm onSubmit={handleSubmit} error={error} />

        {loading ? (
          <p className="mt-4 text-center text-gray-600">
            Loading happy thoughts
          </p>
        ) : (
          <ThoughtList thoughts={thoughts} onLike={handleLike} />
        )}
      </main>
    </div>
  );
}

export default App;
