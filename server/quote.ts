interface Quote {
  quote: string;
  author: string;
  category: string;
}

class Quote {
  __quote: Quote | undefined;
  __authorImage: any;

  constructor() {
    this.__quote = undefined;
  }

  setQuote(quote: Quote) {
    this.__quote = quote;
  }

  getQuote() {
    return this.__quote;
  }

  setAuthorImage(image: any) {
    this.__authorImage = image;
  }

  getAuthorImage(): any {
    return this.__authorImage;
  }
}

export default Quote;
