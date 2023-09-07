import { daily, load } from "./deps.ts";
import Quote from "./quote.ts";

const todaysQuote = new Quote();

const fetchQuote = async () => {
  try {
    const quoteResponse = await fetch("https://api.api-ninjas.com/v1/quotes", {
      headers: { "X-Api-Key": "le8onx1k4AYN0HIVuXX8lg==JbiSdCGpXxqciIQq" },
    });
    const result = await quoteResponse.json();
    if (result.message === "Internal server error") {
      throw new Error("api-ninjas could not fetch a quote.");
    }
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const fetchAuthorImage = async (authorName: string) => {
  const env = await load();
  const GOOGLE_SEARCH_API_KEY = env["GOOGLE_SEARCH_API_KEY"];
  const GOOGLE_SEARCH_ENGINE_ID = env["GOOGLE_SEARCH_ENGINE_ID"];

  return await fetch(
    `https://customsearch.googleapis.com/customsearch/v1?key=${GOOGLE_SEARCH_API_KEY}&cx=${GOOGLE_SEARCH_ENGINE_ID}&q=${authorName}&num=1&searchType=image`
  );
};

const determineQuoteOfTheDay = async () => {
  try {
    const quoteOfTheDay = await fetchQuote();
    if (quoteOfTheDay) {
      todaysQuote.setQuote(quoteOfTheDay);
    } else {
      throw new Error("No quote of the day");
    }

    // const authorImage = fetchAuthorImage();
  } catch (error) {
    // learn how to handle errors in deno
    console.log(error);
  }
};

determineQuoteOfTheDay();
daily(() => {
  determineQuoteOfTheDay();
});

const handler = (request: Request): Response => {
  if (request.url.includes("/quote")) {
    if (!todaysQuote.getQuote()) {
      return new Response("No quote", { status: 500 });
    }
    return new Response(JSON.stringify(todaysQuote.getQuote()), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } else {
    return new Response(`${request.url} not found`, {
      status: 404,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
};

Deno.serve(handler);
console.log(`HTTP webserver running. Access it at: http://localhost:8000/`);
