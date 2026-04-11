"use client";
import WeatherMap from "@/components/weather/WeatherMap";

import { useEffect, useState, useMemo } from "react";
import {
  WiDaySunny,
  WiHumidity,
  WiStrongWind,
  WiBarometer,
  WiDayCloudy,
  WiCloud,
  WiCloudy,
  WiRain,
} from "react-icons/wi";
import { FiCalendar, FiClock } from "react-icons/fi";
import { WiSunrise, WiSunset } from "react-icons/wi";
import { FiMapPin } from "react-icons/fi";
import { MdOutlineLocationSearching } from "react-icons/md";
import { BsGlobe2 } from "react-icons/bs";
import { WiDust } from "react-icons/wi";
import { FiActivity } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import { FiSun } from "react-icons/fi";
import { FiCloud } from "react-icons/fi";

import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  CartesianGrid,
} from "recharts";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

const page = () => {
  const [coords, setCoords] = useState(null);
  const [current, setCurrent] = useState(null);
  const [aqi, setAqi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uv, setUV] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  // ================= LOCATION =================
  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation not supported");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (err) => {
        console.error("Location error:", err);
        setLoading(false);
      },
    );
  }, []);
  // ================= LOGGER =================
  const logAllData = (coords, weatherData, aqiData, uvData) => {
    // COORDS
    console.group("Coordinates");
    console.table(coords);
    console.groupEnd();

    // 🌤 WEATHER
    if (weatherData) {
      console.group("🌤 Current Weather");

      console.log("City:", weatherData.name);
      console.log("Temperature:", weatherData.main?.temp, "°C");
      console.log("Feels Like:", weatherData.main?.feels_like, "°C");
      console.log("Humidity:", weatherData.main?.humidity, "%");
      console.log("Pressure:", weatherData.main?.pressure, "hPa");
      console.log("Wind Speed:", weatherData.wind?.speed, "m/s");

      console.log("Condition:", weatherData.weather?.[0]?.main);
      console.log("Description:", weatherData.weather?.[0]?.description);

      console.groupEnd();
    }

    // 🌬 WIND DIRECTION (NEW GROUP)
    if (weatherData) {
      console.group("🌬 Wind Details");

      const windDeg = weatherData.wind?.deg;
      const windSpeed = weatherData.wind?.speed;

      const getWindDirectionLabel = (deg) => {
        if (deg >= 337.5 || deg < 22.5) return "North";
        if (deg < 67.5) return "North-East";
        if (deg < 112.5) return "East";
        if (deg < 157.5) return "South-East";
        if (deg < 202.5) return "South";
        if (deg < 247.5) return "South-West";
        if (deg < 292.5) return "West";
        return "North-West";
      };

      console.log("Direction (deg):", windDeg, "°");
      console.log("Direction (label):", getWindDirectionLabel(windDeg));
      console.log("Wind Speed:", windSpeed, "m/s");

      console.groupEnd();
    }

    // 🌥 CLOUDS + VISIBILITY
    if (weatherData) {
      console.group("🌥 Atmosphere");

      const cloudPercent = weatherData.clouds?.all;
      console.log("Cloud Coverage:", cloudPercent, "%");

      const visibilityMeters = weatherData.visibility || 0;
      console.log(
        "Visibility:",
        visibilityMeters,
        "meters",
        `(${(visibilityMeters / 1000).toFixed(1)} km)`,
      );

      console.groupEnd();
    }

    // AQI
    if (aqiData) {
      console.group("Air Quality");

      const aqiLevel = aqiData?.list?.[0]?.main?.aqi;
      const pm25 = aqiData?.list?.[0]?.components?.pm2_5;

      console.log("AQI Level (1–5):", aqiLevel);
      console.log("PM2.5:", pm25, "µg/m³");
      console.log("Components:", aqiData?.list?.[0]?.components);

      console.groupEnd();
    }

    // UV INDEX
    if (uvData) {
      console.group("UV Index");

      const uvIndex = uvData?.current?.uvi;

      console.log("UV Index:", uvIndex);

      let uvLabel = "Unknown";
      if (uvIndex <= 2) uvLabel = "Low";
      else if (uvIndex <= 5) uvLabel = "Moderate";
      else if (uvIndex <= 7) uvLabel = "High";
      else if (uvIndex <= 10) uvLabel = "Very High";
      else if (uvIndex > 10) uvLabel = "Extreme";

      console.log("UV Category:", uvLabel);

      console.groupEnd();
    }
    // 5-DAY FORECAST (FROM 3-HOUR DATA)
    if (forecastData?.list) {
      console.group("📅 5-Day Forecast");

      const dailyList = forecastData.list.filter((item) =>
        item.dt_txt.includes("12:00:00"),
      );

      dailyList.slice(0, 5).forEach((day, i) => {
        const date = new Date(day.dt * 1000);

        const dayName = date.toLocaleDateString("en-US", {
          weekday: "long",
        });

        console.group(`Day ${i + 1} → ${dayName}`);

        console.log("Temperature:", day.main?.temp, "°C");
        console.log("Feels Like:", day.main?.feels_like, "°C");

        console.log("Condition:", day.weather?.[0]?.main);
        console.log("Description:", day.weather?.[0]?.description);

        console.log("Humidity:", day.main?.humidity, "%");
        console.log("Pressure:", day.main?.pressure, "hPa");

        console.log("Wind Speed:", day.wind?.speed, "m/s");
        console.log("Clouds:", day.clouds?.all, "%");
        console.groupEnd();
      });

      console.groupEnd();
    }
    // TEMPERATURE DISTRIBUTION
    if (tempDistribution?.length) {
      console.group("Temperature Distribution");

      tempDistribution.forEach((item, i) => {
        console.group(`Slot ${i + 1} → ${item.name}`);

        console.log("Temperature:", item.value, "°C");

        let category = "Unknown";
        if (item.value <= 15) category = "Cold";
        else if (item.value <= 22) category = "Cool";
        else if (item.value <= 28) category = "Warm";
        else if (item.value <= 35) category = "Hot";
        else category = "Extreme";

        console.log("Category:", category);

        console.groupEnd();
      });

      console.groupEnd();
    }

    // WEATHER METRICS (RADAR DATA)
    if (weatherData || aqiData) {
      console.group("Weather Metrics (Radar)");

      const humidity = weatherData?.main?.humidity ?? 0;
      const pressure = weatherData?.main?.pressure ?? 0;
      const wind = weatherData?.wind?.speed ?? 0;
      const visibility = weatherData?.visibility
        ? weatherData.visibility / 1000
        : 0;

      const aqiLevel = aqiData?.list?.[0]?.main?.aqi ?? 0;

      console.log("Humidity:", humidity, "%");
      console.log("AQI Level (1–5):", aqiLevel);
      console.log("Wind Speed:", wind, "m/s");
      console.log("Pressure:", pressure, "hPa");
      console.log("Visibility:", visibility.toFixed(1), "km");

      // Structured table (nice for debugging)
      console.table([
        { Metric: "Humidity", Value: `${humidity}%` },
        { Metric: "AQI", Value: aqiLevel },
        { Metric: "Wind Speed", Value: `${wind} m/s` },
        { Metric: "Pressure", Value: `${pressure} hPa` },
        { Metric: "Visibility", Value: `${visibility.toFixed(1)} km` },
      ]);

      console.groupEnd();
    }
  };
  // ================= FETCH =================
  useEffect(() => {
    if (!coords) return;

    const fetchAllData = async () => {
      try {
        // WEATHER
        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric`,
        );
        const weatherData = await weatherRes.json();

        // AQI
        const aqiRes = await fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`,
        );
        const aqiData = await aqiRes.json();

        // UV INDEX (OneCall API)
        const uvRes = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=minutely,hourly,daily,alerts&appid=${API_KEY}&units=metric`,
        );
        const uvData = await uvRes.json();
        // SAFE EXTRACTION
        const uvValue = uvData?.current?.uvi ?? null;

        // 🌤 5-DAY / 3-HOUR FORECAST
        const forecastRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric`,
        );
        const forecastJson = await forecastRes.json();
        setForecastData(forecastJson);

        setCurrent(weatherData);
        setAqi(aqiData);

        logAllData(coords, weatherData, aqiData, uvData);

        // LOGGER
        logAllData(coords, weatherData, aqiData);

        // SET STATE
        setCurrent(weatherData);
        setAqi(aqiData);
        setUV(uvValue);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [coords]);
  // ================= AQI PROCESS =================
  const aqiValue = aqi?.list?.[0]?.main?.aqi;
  const mapAQI = (val) => {
    switch (val) {
      case 1:
        return { value: 50, label: "Good", color: "text-green-400" };
      case 2:
        return { value: 100, label: "Moderate", color: "text-yellow-400" };
      case 3:
        return { value: 150, label: "Unhealthy", color: "text-orange-400" };
      case 4:
        return { value: 200, label: "Very Unhealthy", color: "text-red-400" };
      case 5:
        return { value: 300, label: "Severe", color: "text-purple-400" };
      default:
        return { value: "--", label: "Loading", color: "text-gray-400" };
    }
  };
  const aqiStatus = mapAQI(aqiValue);
  // ================= UV PROCESS =================
  const getUVStatus = (uv) => {
    if (uv <= 2) return { label: "Low", color: "text-green-400" };
    if (uv <= 5) return { label: "Moderate", color: "text-yellow-400" };
    if (uv <= 7) return { label: "High", color: "text-orange-400" };
    if (uv <= 10) return { label: "Very High", color: "text-red-400" };
    return { label: "Extreme", color: "text-purple-400" };
  };
  const uvStatus = getUVStatus(uv || 0);
  // ================= Cloud Visibility PROCESS =================
  //CLOUD STATUS LOGIC
  const getCloudStatus = (val) => {
    if (val <= 20)
      return {
        label: "Clear",
        color: "text-blue-300",
        icon: WiDaySunny,
      };

    if (val <= 50)
      return {
        label: "Partly Cloudy",
        color: "text-gray-300",
        icon: WiDayCloudy,
      };

    if (val <= 80)
      return {
        label: "Cloudy",
        color: "text-gray-400",
        icon: WiCloud,
      };

    return {
      label: "Overcast",
      color: "text-gray-500",
      icon: WiCloudy,
    };
  };
  const cloudStatus = getCloudStatus(current?.clouds?.all || 0);
  const CloudIcon = cloudStatus.icon;
  // ================= Wind Direction PROCESS =================
  const getWindDirectionLabel = (deg) => {
    if (deg >= 337.5 || deg < 22.5) return "North";
    if (deg < 67.5) return "North-East";
    if (deg < 112.5) return "East";
    if (deg < 157.5) return "South-East";
    if (deg < 202.5) return "South";
    if (deg < 247.5) return "South-West";
    if (deg < 292.5) return "West";
    return "North-West";
  };
  // ================= DAILY FORECAST DATA =================
  const dailyData =
    forecastData?.list?.filter((item) => item.dt_txt.includes("12:00:00")) ||
    [];
  // ================= TEMPERATURE DISTRIBUTION =================
  const tempDistribution = useMemo(() => {
    if (!forecastData?.list) return [];

    const getTempByTime = (time) => {
      const item = forecastData.list.find((d) => d.dt_txt.includes(time));
      return item?.main?.temp || 0;
    };

    return [
      { name: "Morning", value: getTempByTime("06:00:00") },
      { name: "Afternoon", value: getTempByTime("12:00:00") },
      { name: "Evening", value: getTempByTime("18:00:00") },
      { name: "Night", value: getTempByTime("21:00:00") },
    ];
  }, [forecastData]);

  // ================= RADAR DATA =================
  const radarData = [
    {
      metric: "Humidity",
      value: current?.main?.humidity ?? 0,
    },
    {
      metric: "AQI",
      value: aqiStatus?.value ?? 0,
    },

    {
      metric: "Cloud Visibility",
      value: Math.round((current?.visibility ?? 0) / 100), // scale
    },
    {
      metric: "Wind",
      value: Math.round((current?.wind?.speed ?? 0) * 10), // scaled
    },
    {
      metric: "Pressure",
      value: Math.round((current?.main?.pressure ?? 0) / 10), // scaled
    },
  ];
  // ================= OVERVIEW CHART DATA =================
  const chartData =
    forecastData?.list?.slice(0, 8).map((item) => {
      const time = new Date(item.dt * 1000).toLocaleTimeString([], {
        hour: "2-digit",
      });

      return {
        time,
        temp: item.main.temp,
        humidity: item.main.humidity,
      };
    }) || [];
  // ================= RETURN (ONLY LOADING CHECK HERE) =================
  if (loading || !current) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading weather...
      </div>
    );
  }
  return (
    <section className="h-screen w-full bg-[#0b1220] text-white overflow-hidden">
      {/* INNER WRAPPER (padding here instead of root) */}
      <div className="h-full p-4">
        {/* GRID ROOT */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-full">
          {/* ================= LEFT COLUMN ================= */}
          <div className="flex flex-col gap-4 h-full min-h-0">
            {/* BIG WEATHER CARD */}
            <div className="h-[220px] relative bg-white/10 backdrop-blur-xl rounded-2xl p-5 shadow-lg overflow-hidden">
              {/* 🌈 BACKGROUND GLOW */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 blur-2xl opacity-60"></div>

              {/* CONTENT */}
              <div className="relative z-10 h-full flex flex-col justify-between">
                {/* TOP */}
                <div>
                  <h2 className="text-lg font-semibold">TODAY</h2>
                </div>

                {/* CENTER */}
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-5xl font-bold">
                      {current?.main?.temp !== undefined
                        ? Math.round(current.main.temp)
                        : "--"}
                      °
                    </div>

                    <p className="text-sm opacity-70 capitalize">
                      {current?.weather?.[0]?.description || "Loading..."}
                    </p>
                  </div>

                  {/* ICON (SMART MAPPING) */}
                  {(() => {
                    const condition = current?.weather?.[0]?.main;

                    switch (condition) {
                      case "Clear":
                        return (
                          <WiDaySunny size={60} className="text-yellow-400" />
                        );
                      case "Clouds":
                        return <WiCloud size={60} className="text-gray-300" />;
                      case "Rain":
                        return <WiRain size={60} className="text-blue-400" />;
                      case "Drizzle":
                        return <WiRain size={60} className="text-blue-300" />;
                      case "Thunderstorm":
                        return <WiRain size={60} className="text-purple-400" />;
                      default:
                        return (
                          <WiDaySunny size={60} className="text-yellow-400" />
                        );
                    }
                  })()}
                </div>

                {/* BOTTOM STATS */}
                <div className="flex justify-between text-xs opacity-70">
                  <div className="flex items-center gap-1">
                    <WiHumidity size={18} />
                    <span>{current?.main?.humidity ?? "--"}%</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <WiStrongWind size={18} />
                    <span>{current?.wind?.speed ?? "--"} m/s</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <WiBarometer size={18} />
                    <span>{current?.main?.pressure ?? "--"} hPa</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SMALL CITY CARDS */}
            <div className="flex flex-col gap-4 flex-1 min-h-0">
              {/* DAY / DATE / TIME CARD */}
              <div className="h-[80px] bg-white/10 backdrop-blur-xl rounded-xl px-4 flex items-center justify-between">
                {/* LEFT */}
                <div className="flex flex-col">
                  <p className="text-sm font-semibold">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                    })}
                  </p>

                  <p className="text-xs opacity-60">
                    {new Date().toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-2">
                    <FiClock className="opacity-70" />
                    <p className="text-sm font-semibold">
                      {new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <FiCalendar className="opacity-70" />
                    <p className="text-xs opacity-60">Local Time</p>
                  </div>
                </div>
              </div>
              {/* Wind Direction */}
              <div className="h-[110px] bg-white/10 backdrop-blur-xl rounded-2xl px-4 py-3 flex items-center justify-between shadow-md">
                {/* LEFT → TEXT */}
                <div>
                  <p className="text-sm font-semibold">Wind Direction</p>
                  <div className="flex items-center gap-4 mt-2">
                    {/* COLUMN 1 → DEGREE */}
                    <div>
                      <p className="text-3xl font-bold">
                        {current?.wind?.deg !== undefined
                          ? Math.round(current.wind.deg)
                          : "--"}
                        °
                      </p>
                    </div>

                    {/* COLUMN 2 → DETAILS */}
                    <div className="flex flex-col justify-center">
                      <p className="text-xs opacity-60">
                        {getWindDirectionLabel(current?.wind?.deg)}
                      </p>

                      <p className="text-xs opacity-50">
                        Wind: {current?.wind?.speed ?? "--"} m/s
                      </p>
                    </div>
                  </div>
                </div>

                {/* RIGHT → COMPASS */}
                <div className="relative w-20 h-20 flex items-center justify-center">
                  {/* Glow Ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 via-transparent to-purple-500/20 blur-md" />

                  {/* Outer Ring */}
                  <div className="absolute inset-0 rounded-full border border-white/20" />

                  {/* Direction Labels */}
                  <span className="absolute top-1 text-[10px] opacity-60">
                    N
                  </span>
                  <span className="absolute bottom-1 text-[10px] opacity-60">
                    S
                  </span>
                  <span className="absolute left-1 text-[10px] opacity-60">
                    W
                  </span>
                  <span className="absolute right-1 text-[10px] opacity-60">
                    E
                  </span>

                  {/* Rotating Needle */}
                  <div
                    className="absolute w-full h-full flex items-center justify-center transition-transform duration-700 ease-out"
                    style={{
                      transform: `rotate(${current?.wind?.deg ?? 0}deg)`,
                    }}
                  >
                    {/* Needle */}
                    <div className="w-[2px] h-8 bg-gradient-to-b from-white to-transparent rounded-full shadow-lg" />

                    {/* Arrow tip */}
                    <div className="absolute top-2 w-2 h-2 bg-white rotate-45" />
                  </div>

                  {/* Center Dot */}
                  <div className="w-2 h-2 bg-white rounded-full z-10" />
                </div>
              </div>
              {/* LOCATION SIDE */}
              <div className="h-[80px] bg-white/10 backdrop-blur-xl rounded-xl px-4 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <FiMapPin size={20} className="text-blue-400" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">Current Location</p>
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end text-xs opacity-60">
                    <MdOutlineLocationSearching size={14} />
                    <span>
                      Lat: {coords?.lat ? coords.lat.toFixed(3) : "--"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 justify-end text-xs opacity-60 mt-1">
                    <BsGlobe2 size={14} />
                    <span>
                      Lon: {coords?.lon ? coords.lon.toFixed(3) : "--"}
                    </span>
                  </div>
                </div>
              </div>
              {/* SUNRISE & SUNSET*/}
              <div className="h-[80px] bg-white/10 backdrop-blur-xl rounded-xl px-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <WiSunrise size={28} className="text-yellow-400" />
                  <div>
                    <p className="text-xs opacity-60">Sunrise</p>
                    <p className="text-sm font-semibold">
                      {current?.sys?.sunrise
                        ? new Date(
                            current.sys.sunrise * 1000,
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "--"}
                    </p>
                  </div>
                </div>

                <div className="w-px h-10 bg-white/20" />

                {/* SUNSET */}
                <div className="flex items-center gap-3">
                  <WiSunset size={28} className="text-orange-400" />
                  <div>
                    <p className="text-xs opacity-60">Sunset</p>
                    <p className="text-sm font-semibold">
                      {current?.sys?.sunset
                        ? new Date(
                            current.sys.sunset * 1000,
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "--"}
                    </p>
                  </div>
                </div>
              </div>
              {/* AQI */}
              <div className="h-[80px] bg-white/10 backdrop-blur-xl rounded-xl px-4 flex items-center justify-between shadow-md">
                {/* LEFT */}
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <WiDust size={22} className="text-purple-300" />
                  </div>

                  <div>
                    <p className="text-xs opacity-60">Air Quality Index</p>
                    <p className="text-sm font-semibold">AQI Level</p>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <FiActivity size={14} className={aqiStatus.color} />

                    <span className={`text-lg font-bold ${aqiStatus.color}`}>
                      {aqiStatus.value}
                    </span>
                  </div>

                  <p className={`text-xs ${aqiStatus.color}`}>
                    {aqiStatus.label}
                  </p>
                </div>
              </div>
              {/* UV Index */}
              <div className="h-[80px] bg-white/10 backdrop-blur-xl rounded-xl px-4 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <WiDaySunny size={22} className="text-yellow-300" />
                  </div>

                  <div>
                    <p className="text-xs opacity-60">UV Index</p>
                    <p className="text-sm font-semibold">Sun Exposure</p>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <FiSun size={14} className={uvStatus.color} />
                    <span className={`text-lg font-bold ${uvStatus.color}`}>
                      {typeof uv === "number" ? uv.toFixed(1) : "--"}
                    </span>
                  </div>

                  <p className={`text-xs ${uvStatus.color}`}>
                    {uvStatus.label}
                  </p>
                </div>
              </div>
              {/* Visibility */}
              <div className="h-[80px] bg-white/10 backdrop-blur-xl rounded-xl px-4 flex items-center justify-between shadow-md">
                {/* LEFT - VISIBILITY */}
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <FiEye size={20} className="text-blue-300" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold"> Cloud Visibility</p>
                    <p className="text-sm ">
                      {current?.visibility
                        ? (current.visibility / 1000).toFixed(1)
                        : "--"}{" "}
                      km
                    </p>
                  </div>
                </div>

                {/* RIGHT - CLOUDS */}
                <div className="flex items-center gap-2 justify-end">
                  <CloudIcon size={20} className={cloudStatus.color} />
                  <span
                    className={`text-sm font-semibold ${cloudStatus.color}`}
                  >
                    {cloudStatus.label}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= MIDDLE COLUMN ================= */}
          <div className="md:col-span-2 flex flex-col gap-4 h-full min-h-0">
            {/* 5 DAY FORECAST */}
            <div className="h-[220px] bg-white/10 backdrop-blur-xl rounded-2xl flex flex-col p-4">
              {/* TITLE */}
              <h3 className="text-sm mb-3 font-semibold">5-Day Forecast</h3>

              {/* GRID */}
              <div className="grid grid-cols-5 gap-3 flex-1">
                {dailyData.length ? (
                  dailyData.slice(0, 5).map((day, i) => {
                    const date = new Date(day.dt * 1000);

                    const dayName = date.toLocaleDateString("en-US", {
                      weekday: "short",
                    });

                    const weatherMain = day.weather?.[0]?.main;

                    return (
                      <div
                        key={i}
                        className="flex flex-col justify-between items-center h-full py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                      >
                        {/* DAY */}
                        <p className="text-xs opacity-70">{dayName}</p>

                        {/* ICON */}
                        <div className="flex-1 flex items-center justify-center">
                          {weatherMain === "Clear" ? (
                            <WiDaySunny size={34} className="text-yellow-400" />
                          ) : weatherMain === "Clouds" ? (
                            <WiCloud size={34} className="text-gray-300" />
                          ) : weatherMain === "Rain" ? (
                            <WiRain size={34} className="text-blue-400" />
                          ) : weatherMain === "Drizzle" ? (
                            <WiRain size={34} className="text-blue-300" />
                          ) : weatherMain === "Thunderstorm" ? (
                            <WiRain size={34} className="text-purple-400" />
                          ) : (
                            <WiDaySunny size={34} className="text-yellow-400" />
                          )}
                        </div>

                        {/* TEMP */}
                        <p className="text-lg font-bold">
                          {Math.round(day.main.temp)}°
                        </p>
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-5 flex items-center justify-center text-xs opacity-50">
                    Loading forecast...
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 bg-white/5 rounded-2xl min-h-0 flex flex-col gap-4">
              {/* ================= TOP ROW ================= */}
              <div className="flex-1 grid grid-cols-2 gap-4">
                {/* ================= TEMPERATURE DISTRIBUTION ================= */}
                <div className="rounded-xl p-3 flex flex-col h-full">
                  {/* TITLE */}
                  <p className="text-xs font-bold mb-2">
                    Temperature Distribution
                  </p>

                  {/* CHART */}
                  <div className="flex-1 bg-white/5 rounded-lg flex items-center justify-center">
                    {tempDistribution.length ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={tempDistribution}
                            cx="50%"
                            cy="50%"
                            innerRadius={42}
                            outerRadius={68}
                            paddingAngle={4}
                            dataKey="value"
                          >
                            {/* 🎨 FIXED 4-COLOR SYSTEM */}
                            {["#60a5fa", "#3b82f6", "#2563eb", "#1d4ed8"].map(
                              (color, index) => (
                                <Cell key={index} fill={color} />
                              ),
                            )}
                          </Pie>

                          {/* 🔥 WHITE TOOLTIP */}
                          <Tooltip
                            formatter={(value, name) => [
                              <span style={{ color: "#ffffff" }}>
                                {value.toFixed(1)}°C
                              </span>,
                              <span style={{ color: "#ffffff" }}>{name}</span>,
                            ]}
                            contentStyle={{
                              background: "rgba(15,23,42,0.95)",
                              border: "1px solid rgba(255,255,255,0.15)",
                              borderRadius: "12px",
                              padding: "8px 12px",
                              fontSize: "12px",
                              color: "#ffffff",
                            }}
                            itemStyle={{ color: "#ffffff" }}
                            labelStyle={{ display: "none" }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <p className="text-xs opacity-50">
                        Loading temperature data...
                      </p>
                    )}
                  </div>

                  {/* 🔥 LEGEND */}
                  <div className="grid grid-cols-2 gap-2 mt-3 text-[10px] opacity-90">
                    {tempDistribution.map((item, i) => {
                      const colors = [
                        "#60a5fa",
                        "#3b82f6",
                        "#2563eb",
                        "#1d4ed8",
                      ];

                      return (
                        <div key={i} className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: colors[i] }}
                          />
                          <span>
                            {item.name}: {item.value.toFixed(1)}°
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* HUMIDITY / AQI */}
                <div className=" rounded-xl p-3 flex flex-col">
                  <p className="text-xs font-bold mb-2">Humidity / AQI</p>

                  <div className="flex-1 bg-white/5 rounded-lg">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData}>
                        {/* GRID */}
                        <PolarGrid stroke="rgba(255, 255, 255, 0.46)" />

                        {/* AXIS */}
                        <PolarAngleAxis
                          dataKey="metric"
                          tick={{ fill: "#ffffff", fontSize: 12 }}
                        />

                        <PolarRadiusAxis
                          stroke="rgba(255,255,255,0.2)"
                          tick={false}
                        />

                        {/* RADAR */}
                        <Radar
                          name="Weather"
                          dataKey="value"
                          stroke="#9660fa"
                          fill="#60fa8e"
                          fillOpacity={0.4}
                        />

                        {/* TOOLTIP */}
                        <Tooltip
                          formatter={(value, name) => {
                            if (name === "Wind")
                              return [`${value / 10} m/s`, name];
                            if (name === "Pressure")
                              return [`${value * 10} hPa`, name];
                            if (name === "AQI") return [`${value}`, name];
                            return [`${value}%`, name];
                          }}
                          contentStyle={{
                            background: "rgba(15,23,42,0.95)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "12px",
                            fontSize: "12px",
                            color: "#fff",
                          }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* ================= DIVIDER ================= */}
              <div className="h-px bg-white/10" />

              {/* ================= BOTTOM ROW ================= */}
              <div className="flex-1 bg-white/5 rounded-xl p-3">
                {/* LEGEND / EXPLANATION */}
                <div className="flex justify-center gap-4 mt-2 text-[10px] opacity-70">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                    <span>Line = Temperature</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-300 opacity-60"></span>
                    <span>Bar = Humidity</span>
                  </div>
                </div>
                {chartData.length ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={chartData}>
                      {/* DEFINITIONS (GRADIENT) */}
                      <defs>
                        <linearGradient
                          id="humidityGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#60a5fa"
                            stopOpacity={0.6}
                          />
                          <stop
                            offset="100%"
                            stopColor="#3b82f6"
                            stopOpacity={0.2}
                          />
                        </linearGradient>
                      </defs>

                      {/* GRID */}
                      <CartesianGrid
                        stroke="rgba(255,255,255,0.1)"
                        strokeDasharray="3 3"
                      />

                      {/* X AXIS */}
                      <XAxis
                        dataKey="time"
                        stroke="#aaa"
                        tick={{ fontSize: 10 }}
                        tickFormatter={(value) => value} // already formatted
                      />

                      {/* 🔥 ADVANCED TOOLTIP */}
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (!active || !payload?.length) return null;

                          const temp = payload.find(
                            (p) => p.dataKey === "temp",
                          )?.value;
                          const humidity = payload.find(
                            (p) => p.dataKey === "humidity",
                          )?.value;

                          return (
                            <div
                              style={{
                                background: "rgba(15,23,42,0.95)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: "12px",
                                padding: "10px 12px",
                                fontSize: "12px",
                                color: "#fff",
                              }}
                            >
                              <p>Temp: {temp?.toFixed(1)}°C</p>
                              <p>Humidity: {humidity}%</p>
                              <p>
                                Feel: {(temp + humidity * 0.02).toFixed(1)}°C
                              </p>

                              <p>
                                Comfort:{" "}
                                {humidity > 70
                                  ? "Humid"
                                  : humidity > 40
                                    ? "Pleasant"
                                    : "Dry"}
                              </p>
                            </div>
                          );
                        }}
                      />

                      {/* TEMPERATURE LINE */}
                      <Line
                        type="monotone"
                        dataKey="temp"
                        stroke="#60a5fa"
                        strokeWidth={3}
                        dot={false}
                      />

                      {/* HUMIDITY BAR (GRADIENT + 60% LOOK) */}
                      <Bar
                        dataKey="humidity"
                        fill="url(#humidityGradient)"
                        radius={[6, 6, 0, 0]}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-xs opacity-50">
                    Loading overview...
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN (MAP) ================= */}
          <div className="h-full">
            <div className="h-full relative bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg">
              {/* MAP */}
              <div className="absolute inset-0">
                <WeatherMap
                  lat={coords?.lat}
                  lon={coords?.lon}
                  temp={Math.round(current?.main?.temp || 0)}
                  city={current?.name}
                />
              </div>

              {/* TOP OVERLAY */}
              <div className="absolute top-4 left-4 right-4 bg-black/40 backdrop-blur-md rounded-xl p-3">
                <p className="text-xs opacity-70">Location</p>
                <p className="font-semibold">{current?.name || "Loading..."}</p>
              </div>

              {/* BOTTOM OVERLAY */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-md rounded-xl p-4 text-center">
                <div className="text-3xl font-bold">
                  {Math.round(current?.main?.temp || 0)}°
                </div>

                <p className="text-sm opacity-70 capitalize">
                  {current?.weather?.[0]?.description || "Loading..."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
