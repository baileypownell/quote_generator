import React, { useEffect, useState } from "react";
import { Text, View, Linking, ImageBackground } from "react-native";
import axios from "axios";
import { Button, useTheme } from "react-native-paper";

type Quote = {
  quote: string;
  author: string;
  category: string;
};

export const Quote = () => {
  const theme = useTheme();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<any>();

  const initialize = async () => {
    try {
      const quoteResult = await axios.get("http://localhost:8000/quote");
      console.log("testResult: ", quoteResult);

      if (quoteResult.status === 200) {
        setQuote(quoteResult.data.todaysQuote);
        console.log("setting to: ", quoteResult.data.authorImage);
        setBackgroundImage(quoteResult.data.authorImage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  if (!quote || !backgroundImage) {
    return <Text>Loading...</Text>;
  }

  return (
    <ImageBackground
      source={{ uri: backgroundImage }}
      style={{
        alignItems: "flex-start",
        width: "100%",
        height: "100%",
        padding: 20,
        paddingTop: 100,
      }}
    >
      <Text style={{ fontSize: 24 }}>Quote of the Day</Text>
      <View
        style={{
          padding: 20,
          paddingBottom: 80,
          flexGrow: 1,
        }}
      >
        <View>
          <View style={{ paddingTop: 15, paddingBottom: 30 }}>
            <Text style={{ fontSize: 28 }}>{JSON.stringify(quote.quote)}</Text>
          </View>

          <Text style={{ fontSize: 18 }}>- {quote.author}</Text>
        </View>
      </View>

      <Button
        textColor={theme.colors.surfaceVariant}
        icon="google"
        theme={{ roundness: 3 }}
        accessibilityLabel={`Learn More about ${quote.author}`}
        mode="contained"
        onPress={() =>
          Linking.openURL(`https://google.com/search?q=${quote.author}`)
        }
      >
        {`${quote.author}`}
      </Button>
    </ImageBackground>
  );
};
