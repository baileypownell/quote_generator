import React, { useEffect, useState } from "react";
import { Text, View, Linking } from "react-native";
import axios from "axios";
import { Button } from "react-native-paper";

type Quote = {
  quote: string;
  author: string;
  category: string;
};

export const Quote = () => {
  const [quote, setQuote] = useState<{ quote: Quote; date: number } | null>(
    null
  );

  const fetchQuote = async () => {
    const res = await axios.get("https://api.api-ninjas.com/v1/quotes", {
      headers: { "X-Api-Key": "le8onx1k4AYN0HIVuXX8lg==JbiSdCGpXxqciIQq" },
    });

    if (res.status === 200) {
      const chosenQuote: Quote = res.data[0];
      setQuote({ quote: chosenQuote, date: new Date().getDate() });
    }
  };

  useEffect(() => {
    if (!quote || quote.date !== new Date().getDate()) {
      fetchQuote();
    }
  }, []);

  if (!quote) {
    return <Text>Loading...</Text>;
  }

  return (
    <View
      style={{
        alignItems: "flex-start",
        width: "100%",
        height: "100%",
        padding: 20,
        paddingTop: 100,
        flex: 1,
      }}
    >
      <Text style={{ fontSize: 24 }}>Quote of the Day</Text>
      <View
        style={{
          padding: 20,
          justifyContent: "space-between",
          flexDirection: "column",
          height: "100%",
          paddingBottom: 80,
        }}
      >
        <View>
          <View style={{ paddingTop: 15, paddingBottom: 30 }}>
            <Text style={{ fontSize: 28 }}>
              {JSON.stringify(quote.quote.quote)}
            </Text>
          </View>

          <Text style={{ fontSize: 18 }}>- {quote.quote.author}</Text>
        </View>
        <Button
          icon="google"
          accessibilityLabel={`Learn More about ${quote.quote.author}`}
          mode="contained"
          onPress={() => Linking.openURL(`https://google.com/search?q=${quote.quote.author}`)}
        >
          {`${quote.quote.author}`}
        </Button>
      </View>
    </View>
  );
};
