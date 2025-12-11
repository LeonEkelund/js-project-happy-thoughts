import ThoughtCard from "./ThoughtCard";

function ThoughtList({ thoughts, onLike }) {
  return (
    <section className="mt-4">
      {thoughts.map((thought) => (
        <ThoughtCard
          key={thought._id}
          thought={thought}
          onLike={onLike}
        />
      ))}
    </section>
  );
}

export default ThoughtList;
