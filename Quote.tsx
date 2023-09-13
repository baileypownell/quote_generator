import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Image,
  Linking,
  Text,
  View,
  Platform,
  ImageBackground,
} from "react-native";
import { Button, useTheme } from "react-native-paper";

type Quote = {
  quote: string;
  author: string;
  category: string;
};

const generateBoxShadowStyles = () => {
  console.log(Platform);
  if (Platform.OS === "ios") {
    return {
      shadowColor: "#5D4954",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.46,
      shadowRadius: 11.14,
    };
  } else if (Platform.OS === "android") {
    return {
      elevation: 17,
      shadowColor: "#5D4954",
    };
  } else if (Platform.OS === "web") {
    return {
      shadowOffset: { width: 5, height: 5 },
      shadowColor: "#5D4954",
      shadowOpacity: 0.46,
      shadowRadius: 11.14,
    };
  }
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
        background: "#FDE8E9",
        padding: 40,
        paddingTop: 100,
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          alignItems: "flex-start",
          paddingBottom: "30px",
        }}
      >
        <View
          style={{
            width: "100%",
            paddingBottom: "15px",
            marginBottom: "15px",
            borderBottom: "5px solid #5D4954",
            borderRadius: "5px",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              color: "#5D4954",
              fontFamily: "Maven Pro, sans-serif",
            }}
          >
            Quote of the Day
          </Text>
        </View>
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
                display: "flex",
                flexDirection: "row",
              }}
            >
              <View
                style={[
                  {
                    transform: "scaleX(-1)",
                    marginRight: "30px",
                    marginTop: "-20px",
                  },
                ]}
              >
                <Entypo name="quote" size={50} color="#5D4954" />
              </View>
              <Text
                style={{
                  fontSize: 38,
                  color: "#5D4954",
                  fontFamily: "DM Serif Display, serif",
                  lineHeight: "1.5",
                  textAlign: "center",
                }}
              >
                {quote.quote}
              </Text>
              <View
                style={{
                  marginBottom: "-20px",
                  flexDirection: "row",
                  display: "flex",
                  alignItems: "self-end",
                }}
              >
                <Entypo name="quote" size={50} color="#5D4954" />
              </View>
            </View>

            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "20px",
              }}
            >
              {/* <Image
                style={{
                  width: "250px",
                  height: "250px",
                  borderRadius: "50%",
                  marginBottom: "15px",
                }}
                source={{ uri: backgroundImage }}
              ></Image> */}

              <View
                style={{
                  marginBottom: "15px",
                  borderRadius: "50%",
                  ...generateBoxShadowStyles(),
                }}
              >
                <ImageBackground
                  source={backgroundImage}
                  resizeMode="cover"
                  style={{
                    width: "250px",
                    height: "250px",
                  }}
                  imageStyle={{
                    borderRadius: "50%",
                  }}
                ></ImageBackground>
              </View>

              <Text
                style={{
                  fontSize: 30,
                  color: "#5D4954",
                  marginLeft: "15px",
                  fontFamily: "DM Serif Display, serif",
                  fontStyle: "italic",
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
            ...generateBoxShadowStyles(),
          }}
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
