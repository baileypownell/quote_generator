import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image, Linking, Text, View } from "react-native";
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

      if (quoteResult.status === 200) {
        setQuote(quoteResult.data.todaysQuote);
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
    <View
      style={{
        width: "100%",
        height: "100%",
        // background: "#3A3335",
        // background: "#F5F4F5",
        background: "#FDE8E9",
        padding: 20,
        paddingTop: 100,
      }}
    >
      <View style={{ width: "100%", height: "100%", alignItems: "flex-start" }}>
        <Text
          style={{
            fontSize: 24,
            // color: "#3A3335",
            color: "#5D4954",
            fontFamily: "DM Serif Display, serif",
          }}
        >
          Quote of the Day
        </Text>
        <View
          style={{
            padding: 20,
            paddingBottom: 80,
            flexGrow: 1,
          }}
        >
          <View>
            <View
              style={{
                paddingTop: 15,
                paddingBottom: 30,
              }}
            >

              <View
                style={[
                  {
                    transform: 'scaleX(-1)',
                  },
                ]}
              >
                <Entypo
                  name="quote"
                  size={50}
                  color="#5D4954"
                />
              </View>
              <Text
                style={{
                  fontSize: 38,
                  color: "#5D4954",
                  fontFamily: "DM Serif Display, serif",
                  lineHeight: "1.5",
                  fontWeight: undefined,
                }}
              >
                {quote.quote}
              </Text>
              <Entypo name="quote" size={50} color="#5D4954" />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingTop: "20px",
              }}
            >
              <Image
                style={{ width: "250px", height: "250px", borderRadius: "50%" }}
                source={{ uri: backgroundImage }}
              ></Image>

              <Text
                style={{
                  fontSize: 30,
                  // color: "#3A3335",
                  color: "#5D4954",
                  marginLeft: "15px",
                  fontFamily: "DM Serif Display, serif",
                }}
              >
                {quote.author}
              </Text>
            </View>
          </View>
        </View>

        <Button
          textColor={theme.colors.surfaceVariant}
          style={{
            backgroundColor: "#754F5B",
          }}
          elevation={5}
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
      </View>
    </View>
  );
};
