import { NextResponse } from "next/server";
import OpenAI from "openai";

// ================= INIT =================
const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY || "dummy-key",
  baseURL: "https://api.groq.com/openai/v1",
});

// ================= MAIN =================
export async function POST(req) {
  try {
    const body = await req.json();
    const { message, weatherContext, coords } = body;

    console.log("ENV CHECK:");
    console.log("GROQ_API_KEY:", process.env.GROQ_API_KEY ? "✅" : "❌");
    console.log("WEATHER:", process.env.WEATHER_KEY ? "✅" : "❌");
    console.log("NEWS:", process.env.NEWS_KEY ? "✅" : "❌");

    const intent = detectIntent(message);
    console.log("Intent:", intent);

    let response;

    if (intent === "weather") {
      response = await handleWeatherIntent(message, weatherContext, coords);
    } else if (intent === "news") {
      response = await handleNewsIntent(message);
    } else {
      response = await getLLMResponse(message);
    }

    return NextResponse.json(response);
  } catch (err) {
    console.error("API ERROR:", err);

    // ULTIMATE FALLBACK — always return something
    return NextResponse.json(
      { type: "text", content: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

// ================= INTENT =================
function detectIntent(msg) {
  const text = msg.toLowerCase();

  if (
    text.includes("weather") ||
    text.includes("rain") ||
    text.includes("temperature") ||
    text.includes("forecast") ||
    text.includes("climate") ||
    text.includes("hot") ||
    text.includes("cold") ||
    text.includes("humid")
  ) {
    return "weather";
  }

  if (
    text.includes("news") ||
    text.includes("headline") ||
    text.includes("update") ||
    text.includes("latest")
  ) {
    return "news";
  }

  return "general";
}

// ================= WEATHER (SMART — uses Groq + live data) =================
async function handleWeatherIntent(message, context, coords) {
  try {
    // Step 1: Try to get fresh weather data using user's coordinates
    let weatherData = context?.weatherData || null;

    if (!weatherData && coords?.lat && coords?.lon) {
      weatherData = await fetchWeatherByCoords(coords.lat, coords.lon);
    }

    // Step 2: If still no data, try fallback city
    if (!weatherData) {
      weatherData = await fetchWeatherByCity("Mumbai");
    }

    // Step 3: If we have data, let Groq analyze it intelligently
    if (weatherData) {
      const systemPrompt = `
You are AMARIS, an intelligent weather assistant.

Use the provided real-time weather data to answer user queries.

Be:
- concise and conversational
- helpful and predictive (rain, comfort, safety)
- proactive with suggestions (carry umbrella, stay hydrated, etc.)

Format your response nicely with emojis.
Avoid raw JSON. Explain insights like a friendly human.
`;

      const userPrompt = `
User Query: ${message}

Weather Data:
${JSON.stringify(weatherData, null, 2)}
`;

      const completion = await openai.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 500,
      });

      return {
        type: "text",
        content: completion.choices[0].message.content,
      };
    }

    // Step 4: No weather data at all — let Groq answer generally
    return await getLLMResponse(
      `The user asked about weather: "${message}". Provide a helpful general response and mention that live weather data is currently unavailable.`,
    );
  } catch (err) {
    console.error("Weather handler error:", err);
    return await getLLMResponse(
      `The user asked about weather: "${message}". Provide a helpful general response.`,
    );
  }
}

// ================= WEATHER FETCH (by coordinates) =================
async function fetchWeatherByCoords(lat, lon) {
  try {
    if (!process.env.WEATHER_KEY) return null;

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_KEY}&units=metric`,
      { signal: AbortSignal.timeout(5000) },
    );

    if (!res.ok) return null;

    const data = await res.json();
    return {
      city: data.name,
      temp: data?.main?.temp,
      feels_like: data?.main?.feels_like,
      humidity: data?.main?.humidity,
      pressure: data?.main?.pressure,
      wind_speed: data?.wind?.speed,
      condition: data?.weather?.[0]?.main,
      description: data?.weather?.[0]?.description,
    };
  } catch (err) {
    console.error("Weather coords fetch error:", err.message);
    return null;
  }
}

// ================= WEATHER FETCH (by city name) =================
async function fetchWeatherByCity(city) {
  try {
    if (!process.env.WEATHER_KEY) return null;

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_KEY}&units=metric`,
      { signal: AbortSignal.timeout(5000) },
    );

    if (!res.ok) return null;

    const data = await res.json();
    return {
      city: data.name,
      temp: data?.main?.temp,
      feels_like: data?.main?.feels_like,
      humidity: data?.main?.humidity,
      pressure: data?.main?.pressure,
      wind_speed: data?.wind?.speed,
      condition: data?.weather?.[0]?.main,
      description: data?.weather?.[0]?.description,
    };
  } catch (err) {
    console.error("Weather city fetch error:", err.message);
    return null;
  }
}

// ================= NEWS (with fallback to Groq) =================
async function handleNewsIntent(message) {
  try {
    // Try fetching real news
    if (process.env.NEWS_KEY) {
      const res = await fetch(
        `https://newsdata.io/api/1/latest?apikey=${process.env.NEWS_KEY}&country=in&language=en`,
        { signal: AbortSignal.timeout(8000) },
      );

      const data = await res.json();

      if (data.status === "success" && Array.isArray(data.results) && data.results.length > 0) {
        const articles = data.results.slice(0, 5).map((item) => ({
          title: item.title,
          url: item.link,
          source: item.source_id,
        }));

        return {
          type: "news",
          articles,
        };
      }
    }

    // FALLBACK: Let Groq generate a news-style response
    return await getLLMResponse(
      `The user asked: "${message}". Provide a helpful summary of recent trending global news topics. Mention that for live headlines, they should check the News dashboard.`,
    );
  } catch (err) {
    console.error("News fetch error:", err.message);
    // FALLBACK: Let Groq handle it
    return await getLLMResponse(
      `The user asked about news: "${message}". Provide a helpful general response about current events.`,
    );
  }
}

// ================= GENERAL LLM =================
async function getLLMResponse(message) {
  try {
    const completion = await openai.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are AMARIS, a helpful AI assistant specializing in weather and news. Be concise, friendly, and use emojis where appropriate.",
        },
        { role: "user", content: message },
      ],
      max_tokens: 500,
    });

    return {
      type: "text",
      content: completion.choices[0].message.content,
    };
  } catch (err) {
    console.error("LLM ERROR:", err);
    return {
      type: "text",
      content:
        "I'm having trouble connecting to my AI brain right now. Please try again in a moment! 🔄",
    };
  }
}
