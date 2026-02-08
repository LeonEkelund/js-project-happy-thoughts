import { useState } from "react";

function ThoughtCard({ thought, onLike, onDelete, onEdit, isOwner }) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(thought.message);

  const handleSave = () => {
    onEdit(thought._id, editText);
    setEditing(false);
  };

  return (
    <article className="relative mb-6 border border-gray-200 bg-white p-4 shadow-[6px_6px_0_#000]">
      {isOwner && (
        <div className="absolute right-3 top-3 flex gap-2">
          <button onClick={() => setEditing(!editing)} title="Edit">✏️</button>
          <button onClick={() => onDelete(thought._id)} title="Delete">🗑️</button>
        </div>
      )}

      {editing ? (
        <div className="pr-16">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full resize-none border border-gray-300 p-2 text-sm outline-none focus:border-red-400"
            rows={2}
          />
          <div className="mt-1 flex gap-2">
            <button
              onClick={handleSave}
              className="rounded-full bg-gradient-to-b from-red-300 to-red-500 px-3 py-1 text-xs font-semibold text-white hover:brightness-110"
            >
              Save
            </button>
            <button
              onClick={() => { setEditing(false); setEditText(thought.message); }}
              className="rounded-full border border-gray-300 px-3 py-1 text-xs font-semibold hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="whitespace-pre-wrap text-md tracking-wide text-gray-900 pr-16">
          {thought.message}
        </p>
      )}

      <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
        <button
          type="button"
          onClick={() => onLike(thought._id)}
          className="inline-flex items-center gap-2 px-3 py-1"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-200 text-lg">
            ❤️
          </span>
          <span className="text-gray-700">x {thought.hearts}</span>
        </button>

        <span>
          {new Date(thought.createdAt).toLocaleString("en-GB", {
            hour12: false
          })}
        </span>
      </div>
    </article>
  );
}

export default ThoughtCard;
