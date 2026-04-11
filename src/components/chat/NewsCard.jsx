function NewsCard({ data }) {
  return (
    <div className="space-y-3">
      {data.articles.map((a, i) => (
        <div key={i} className="p-3 border rounded-xl">
          <p className="font-medium">{a.title}</p>
          <a href={a.url} target="_blank">
            Read more
          </a>
        </div>
      ))}
    </div>
  );
}
