import { daily, everyMinute } from "https://deno.land/x/deno_cron/cron.ts";

console.log("deno is working");

const fetchQuote = async () => {
  const quoteResponse = await fetch("https://api.api-ninjas.com/v1/quotes", {
    headers: { "X-Api-Key": "le8onx1k4AYN0HIVuXX8lg==JbiSdCGpXxqciIQq" },
  });

  const result = await quoteResponse.json();
  return result;
};

// const fetchAuthorImage = async (authorName: string) => {
//   return await fetch(
//     `https://customsearch.googleapis.com/customsearch/v1?key=${Constants.expoConfig.extra.GOOGLE_SEARCH_API_KEY}&cx=${Constants.expoConfig.extra.GOOGLE_SEARCH_ENGINE_ID}&q=${authorName}
//         &num=1&searchType=image`
//   );
// };

const determineQuoteOfTheDay = async () => {
  try {
    const quote = await fetchQuote();
    console.log("The quote of the day is: ", quote);

    // const authorImage = fetchAuthorImage();
  } catch (error) {
    // learn how to handle errors in deno
    console.log(error);
  }
};

daily(() => {
  determineQuoteOfTheDay();
});

// everyMinute(() => determineQuoteOfTheDay());
