import { Entypo } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Platform,
  ImageBackground,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useTheme, ActivityIndicator, MD3LightTheme } from "react-native-paper";
import Constants from "expo-constants";

type Quote = {
  quote: string;
  author: string;
  category: string;
};

const generateBoxShadowStyles = (theme: typeof MD3LightTheme) => {
  if (Platform.OS === "ios") {
    return {
      shadowColor: theme.colors.secondary,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.46,
      shadowRadius: 11.14,
    };
  }
  if (Platform.OS === "android") {
    return {
      elevation: 5,
    };
  }

  if (Platform.OS === "web") {
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
  const [quote, setQuote] = useState<Quote>();
  const [backgroundImage, setBackgroundImage] = useState<any>();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const initialize = async () => {
    try {
      const quoteResult = await fetch(
        `https://${Constants.expoConfig!.extra?.SERVER_URL}/quote`
      );
      const result = await quoteResult.json();

      if (result) {
        setQuote(result.todaysQuote);
        setBackgroundImage(result.authorImage);
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
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <View
        style={{
          width: "100%",
          alignItems: "flex-start",
          padding: 20,
          paddingBottom: 25,
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
              fontSize: 26,
              color: theme.colors.secondary,
              fontFamily: "Maven Pro",
              marginBottom: 5,
            }}
          >
            Quote of the Day
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: theme.colors.secondary,
              fontFamily: "Maven Pro",
            }}
          >
            {new Date().toLocaleDateString("en-us", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
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
                  marginRight: 15,
                  marginTop: -20,
                }}
              >
                <Entypo name="quote" size={35} color={theme.colors.secondary} />
              </View>
              <Text
                style={{
                  fontSize: 26,
                  color: theme.colors.secondary,
                  fontFamily: "DM Serif Display",
                  // lineHeight: 26 + 26 * 0.75,
                  textAlign: "center",
                  flex: 1,
                }}
              >
                {quote?.quote}
              </Text>
              <View
                style={{
                  marginBottom: -20,
                  marginLeft: 15,
                  display: "flex",
                  alignSelf: "flex-end",
                }}
              >
                <Entypo name="quote" size={35} color={theme.colors.secondary} />
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
                {quote?.author}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
