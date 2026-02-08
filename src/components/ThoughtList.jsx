import ThoughtCard from "./ThoughtCard";

function ThoughtList({ thoughts, onLike, onDelete, onEdit, userId }) {
  return (
    <section className="mt-4">
      {thoughts.map((thought) => (
        <ThoughtCard
          key={thought._id}
          thought={thought}
          onLike={onLike}
          onDelete={onDelete}
          onEdit={onEdit}
          isOwner={userId && thought.user?._id === userId}
        />
      ))}
    </section>
  );
}

export default ThoughtList;
