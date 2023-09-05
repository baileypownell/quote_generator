import React, { useEffect, useState } from "react";
import { Text, View, Linking, ImageBackground } from "react-native";
import axios from "axios";
import { Button, useTheme } from "react-native-paper";
import Constants from "expo-constants";

type Quote = {
  quote: string;
  author: string;
  category: string;
};

export const Quote = () => {
  const theme = useTheme();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<any>();

  const fetchQuote = async () => {
    return await axios.get("https://api.api-ninjas.com/v1/quotes", {
      headers: { "X-Api-Key": "le8onx1k4AYN0HIVuXX8lg==JbiSdCGpXxqciIQq" },
    });
  };

  const fetchAuthorImage = async (authorName: string) => {
    return await axios.get(
      `https://customsearch.googleapis.com/customsearch/v1?key=${Constants.expoConfig.extra.GOOGLE_SEARCH_API_KEY}&cx=${Constants.expoConfig.extra.GOOGLE_SEARCH_ENGINE_ID}&q=${authorName}
        &num=1&searchType=image`
    );
  };

  const initialize = async () => {
    const quoteResult = await fetchQuote();

    if (quoteResult.status === 200) {
      setQuote(quoteResult.data[0]);

      const authorImageResult = await fetchAuthorImage(
        quoteResult.data[0].author
      );

      if (authorImageResult.status === 200) {
        setBackgroundImage(authorImageResult.data.items[0]);
      }
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
      source={{ uri: backgroundImage.link }}
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

      {/* <Image
        style={{ width: 50, height: 50 }}
        source={{ uri: backgroundImage.link }}
      /> */}

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
