import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Platform,
  ImageBackground,
  SafeAreaView,
} from "react-native";
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
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const initialize = async () => {
    try {
      const quoteResult = await axios.get(
        "https://quotes-generator.deno.dev/quote"
      );

      if (quoteResult.status === 200) {
        setQuote(quoteResult.data.todaysQuote);
        setBackgroundImage(quoteResult.data.authorImage);
        setLoaded(true);
        setError(false);
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

  if (!loaded && !error) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          backgroundColor: theme.colors.secondary,
        }}
      >
        <ActivityIndicator
          size="large"
          animating={true}
          color={theme.colors.primary}
        />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          backgroundColor: theme.colors.primary,
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            color: theme.colors.secondary,
            fontFamily: "Maven Pro",
          }}
        >
          Yikes. There was an error.
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: theme.colors.primary,
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          alignItems: "flex-start",
          padding: 20,
          paddingBottom: 10,
          paddingTop: 15,
        }}
      >
        <View
          style={{
            width: "100%",
            paddingBottom: 15,
            marginBottom: 15,
            borderBottomWidth: 5,
            borderBottomColor: theme.colors.secondary,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              color: theme.colors.secondary,
              fontFamily: "Maven Pro",
            }}
          >
            Quote of the Day
          </Text>
        </View>
        <View
          style={{
            paddingTop: 20,
            flexGrow: 1,
            width: "100%",
            alignItems: "center",
          }}
        >
          <View>
            <View
              style={{
                width: "100%",
                paddingTop: 15,
                paddingBottom: 30,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  transform: "scaleX(-1)",
                  marginRight: 30,
                  marginTop: -20,
                }}
              >
                <Entypo name="quote" size={40} color={theme.colors.secondary} />
              </View>
              <Text
                style={{
                  fontSize: 30,
                  color: theme.colors.secondary,
                  fontFamily: "DM Serif Display",
                  lineHeight: 30 + 30 * 1.15,
                  textAlign: "center",
                  flex: 1,
                }}
              >
                {quote.quote}
              </Text>
              <View
                style={{
                  marginBottom: -20,
                  marginLeft: 30,
                  flexDirection: "row",
                  display: "flex",
                  alignItems: "end",
                }}
              >
                <Entypo name="quote" size={40} color={theme.colors.secondary} />
              </View>
            </View>

            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                paddingTop: 20,
              }}
            >
              <View
                style={{
                  marginBottom: 15,
                  borderRadius: 250 / 2,
                  ...generateBoxShadowStyles(theme),
                }}
              >
                <ImageBackground
                  source={{ uri: backgroundImage }}
                  resizeMode="cover"
                  style={{
                    width: 250,
                    height: 250,
                  }}
                  imageStyle={{
                    borderRadius: 250 / 2,
                  }}
                ></ImageBackground>
              </View>

              <Text
                style={{
                  fontSize: 30,
                  color: theme.colors.secondary,
                  marginTop: 15,
                  fontFamily: "Maven Pro",
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
    </SafeAreaView>
  );
};
