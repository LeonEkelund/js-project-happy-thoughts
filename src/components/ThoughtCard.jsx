function ThoughtCard({ thought, onLike }) {
  return (
    <article className="relative mb-6 border border-gray-200 bg-white p-4 shadow-[6px_6px_0_#000]">
      <p className="whitespace-pre-wrap text-md tracking-wide text-gray-900">
        {thought.message}
      </p>

      <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
        <button
          type="button"
          onClick={() => onLike(thought._id)}
          className="inline-flex items-center gap-2 px-3 py-1"
        >
          {/* HEART BUBBLE */}
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-200 text-lg">
            ❤️
          </span>

          {/* HEART COUNT */}
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
