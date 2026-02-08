import { useState, useEffect } from "react";
import ThoughtForm from "./components/ThoughtForm";
import ThoughtList from "./components/ThoughtList";
import AuthModal from "./components/AuthModal";
import { getThoughts, postThought, likeThought, deleteThought, updateThought } from "./api/thoughts";

function App() {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [modal, setModal] = useState(null);

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

  const handleSubmit = async (message) => {
    setError(null);

    if (!user) {
      setError("Please log in to post a thought.");
      return { ok: false };
    }

    const newThought = await postThought(message);

    if (newThought.message && !newThought.error && !newThought.errors) {
      setThoughts((prev) => [newThought, ...prev]);
      return { ok: true };
    } else {
      setError("Your thought must be 5–140 characters.");
      return { ok: false };
    }
  };

  const handleDelete = async (id) => {
    await deleteThought(id);
    setThoughts((prev) => prev.filter((t) => t._id !== id));
  };

  const handleEdit = async (id, message) => {
    const updated = await updateThought(id, message);
    setThoughts((prev) =>
      prev.map((t) => (t._id === id ? { ...t, message: updated.message } : t))
    );
  };

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
      <header className="flex items-center justify-end gap-2 px-4 py-3">
        {user ? (
          <>
            <span className="text-sm text-gray-600">Hi, {user.username}</span>
            <button
              onClick={() => { localStorage.removeItem("user"); setUser(null); }}
              className="rounded-full border border-gray-300 px-3 py-1 text-xs font-semibold hover:bg-gray-100"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setModal("login")}
              className="rounded-full border border-gray-300 px-3 py-1 text-xs font-semibold hover:bg-gray-100"
            >
              Login
            </button>
            <button
              onClick={() => setModal("register")}
              className="rounded-full bg-gradient-to-b from-red-300 to-red-500 px-3 py-1 text-xs font-semibold text-white hover:brightness-110"
            >
              Register
            </button>
          </>
        )}
      </header>

      {modal && (
        <AuthModal
          mode={modal}
          onClose={() => setModal(null)}
          onSuccess={(data) => { setUser(data); setModal(null); }}
        />
      )}

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
          <ThoughtList
            thoughts={thoughts}
            onLike={handleLike}
            onDelete={handleDelete}
            onEdit={handleEdit}
            userId={user?.id}
          />
        )}
      </main>
    </div>
  );
}

export default App;
