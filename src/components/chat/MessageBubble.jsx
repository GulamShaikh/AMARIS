function MessageBubble({ msg }) {
  const isUser = msg.role === "user";

  if (msg.type === "weather") {
    return <WeatherCard data={msg.data} />;
  }

  if (msg.type === "news") {
    return <NewsCard data={msg.data} />;
  }

  return (
    <div className={`flex ${isUser ? "justify-end" : ""}`}>
      <div className="rounded-2xl px-4 py-3 bg-gray-100">
        {msg.content}
      </div>
    </div>
  );
}