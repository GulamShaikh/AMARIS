function WeatherCard({ data }) {
  return (
    <div className="rounded-2xl p-4 bg-gradient-to-br from-blue-100 to-indigo-100 shadow">
      <h3 className="text-lg font-semibold">{data.city}</h3>
      <p>{data.condition}</p>
      <p>🌡 {data.temp}°C</p>
      <p>💧 {data.humidity}%</p>
      <p>🌬 {data.wind} m/s</p>
    </div>
  );
}