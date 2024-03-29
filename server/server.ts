import { load } from "./deps.ts";
import { daily } from "https://deno.land/x/deno_cron@v1.0.0/cron.ts";
import Quote from "./quote.ts";

const todaysQuote = new Quote();

const fetchQuote = async () => {
  try {
    const env = await load();
    const APININJAS_API_KEY = env["APININJAS_API_KEY"];
    const quoteResponse = await fetch("https://api.api-ninjas.com/v1/quotes", {
      headers: { "X-Api-Key": APININJAS_API_KEY },
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

  const imageResponse = await fetch(
    `https://customsearch.googleapis.com/customsearch/v1?key=${GOOGLE_SEARCH_API_KEY}&cx=${GOOGLE_SEARCH_ENGINE_ID}&q=${authorName}&num=1&searchType=image&imgSize=xlarge`
  );

  const result = await imageResponse.json();
  return result;
};

const determineQuoteOfTheDay = async () => {
  try {
    const quoteOfTheDay = await fetchQuote();
    const selectedQuote = quoteOfTheDay[0];
    if (quoteOfTheDay && !quoteOfTheDay.error) {
      const authorImageResult = await fetchAuthorImage(selectedQuote.author);
      if (authorImageResult) {
        todaysQuote.setQuote(selectedQuote);
        todaysQuote.setAuthorImage(authorImageResult.items[0].link);
      } else {
        throw new Error("No quote of the day");
      }
    } else {
      throw new Error("No quote of the day could be determined");
    }
  } catch (error) {
    // how to handle errors in deno?
    console.log(error);
  }
};

determineQuoteOfTheDay();
daily(() => {
  // runs at 12AM GMT (UTC)
  const fiveHours = 18000000; // 5 hour delay to set quote in US Eastern time
  setTimeout(() => {
    determineQuoteOfTheDay();
  }, fiveHours);
  determineQuoteOfTheDay();
});

const handler = (request: Request): any => {
  if (request.url.split("/")[3] === "quote") {
    if (!todaysQuote.getQuote()) {
      return new Response(`No quote`, { status: 500 });
    }
    return new Response(
      JSON.stringify({
        todaysQuote: todaysQuote.getQuote(),
        authorImage: todaysQuote.getAuthorImage(),
      }),
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } else {
    return new Response(`${request.url} not found :)`, {
      status: 404,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
};

Deno.serve(handler);
console.log(`HTTP webserver running. Access it at: http://localhost:8000/`);
