import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View, Platform, ImageBackground, Image } from "react-native";
import { useTheme, ActivityIndicator, MD3LightTheme } from "react-native-paper";

type Quote = {
  quote: string;
  author: string;
  category: string;
};

const generateBoxShadowStyles = (theme: MD3LightTheme) => {
  if (Platform.OS === "ios") {
    return {
      shadowColor: theme.colors.secondary,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.46,
      shadowRadius: 11.14,
    };
  } else if (Platform.OS === "android") {
    return {
      elevation: 17,
      shadowColor: theme.colors.secondary,
    };
  } else if (Platform.OS === "web") {
    return {
      shadowOffset: { width: 5, height: 5 },
      shadowColor: theme.colors.secondary,
      shadowOpacity: 0.46,
      shadowRadius: 11.14,
    };
  }
};

export const Quote = () => {
  const theme = useTheme();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<any>();
  const [error, setError] = useState(false);

  const initialize = async () => {
    try {
      const quoteResult = await axios.get("http://localhost:8000/quote");

      if (quoteResult.status === 200) {
        setQuote(quoteResult.data.todaysQuote);
        setBackgroundImage(quoteResult.data.authorImage);
      } else {
        setError(true);
      }
    } catch (e) {
      console.log(e);
      setError(true);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  if (!quote || !backgroundImage) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <ActivityIndicator size="large" animating={true} color={theme.colors.secondary} />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          background: theme.colors.primary,
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            color: theme.colors.secondary,
            fontFamily: "Maven Pro, sans-serif",
          }}
        >
          Yikes. There was an error.
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        background: theme.colors.primary,
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
            borderBottom: `5px solid ${theme.colors.secondary}`,
            borderRadius: "5px",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              color: theme.colors.secondary,
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
                style={{
                  transform: "scaleX(-1)",
                  marginRight: "30px",
                  marginTop: "-20px",
                }}
              >
                <Entypo
                  name="quote"
                  size={50}
                  color={theme.colors.secondary}
                />
              </View>
              <Text
                style={{
                  fontSize: 38,
                  color: theme.colors.secondary,
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
                  marginLeft: "30px",
                  flexDirection: "row",
                  display: "flex",
                  alignItems: "self-end",
                }}
              >
                <Entypo
                  name="quote"
                  size={50}
                  color={theme.colors.secondary}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "20px",
              }}
            >
              <View
                style={{
                  marginBottom: "15px",
                  borderRadius: "50%",
                  ...generateBoxShadowStyles(theme),
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
                  color: theme.colors.secondary,
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

        {/* <Button
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
        </Button> */}
      </View>
    </View>
  );
};
