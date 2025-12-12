import { useState } from "react";

function ThoughtForm({ onSubmit, error }) {
  const [message, setMessage] = useState("");

  const remaining = 140 - message.length;
  const remainingClass =
    remaining < 0 ? "text-red-500" : "text-gray-500";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await onSubmit(message);

    if (result?.ok) {
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative mb-6 border border-gray-200 bg-gray-100 p-4 shadow-[6px_6px_0_#000]"
    >
      <label className="mb-2 block text-sm font-semibold text-gray-800">
        What’s making you happy right now?
      </label>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full resize-none border border-gray-300 p-3 text-sm text-gray-900 outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400"
        rows={3}
      />

      <div className="mt-2 flex items-center justify-between text-xs">
        <p className={remainingClass}>{remaining} characters left</p>
        {error && <p className="text-red-500">{error}</p>}
      </div>

      <button
        type="submit"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-red-300 to-red-500 px-6 py-2 text-sm font-semibold text-white shadow-md transition hover:brightness-110 sm:w-auto"
      >
        💌 Send Happy Thought 💌
      </button>
    </form>
  );
}

export default ThoughtForm;
