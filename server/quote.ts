
interface Quote {
  quote: string;
  author: string;
  category: string;
}

class Quote {
  __quote: Quote | undefined;

  constructor() {
    this.__quote = undefined;
  }


  setQuote(quote: Quote) {
    this.__quote = quote;
  }

  getQuote() {
    return this.__quote;
  }
}

export default Quote;