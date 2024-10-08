import { View, Text, useColorScheme } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { store } from "../store/store";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ApolloProvider, gql } from "@apollo/client";
import { pokemonClient } from "../apollo"; // Import the Apollo Client instance
import { authClient } from "../apollo"; // Import the Apollo Client instance
import { ThemeProvider } from "@shopify/restyle";
import { darkTheme, lightTheme } from "../theme";

import productData from "../products.json";

export default function _layout() {
  const navigation = useNavigation();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  async function loadFonts() {
    try {
      await Font.loadAsync({
        "Nexa-Regular": require("../assets/fonts/Nexa-Regular.otf"),
        "Nexa-Light": require("../assets/fonts/Nexa-Light.otf"),
        "Nexa-Bold": require("../assets/fonts/Nexa-Bold.otf"),
      });
      setFontsLoaded(true);
    } catch (error) {
      console.error("Error loading fonts", error);
      setFontsLoaded(false);
    }
  }
  const colorScheme = useColorScheme();
  const selectedTheme = colorScheme === "dark" ? darkTheme : lightTheme;

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync(); // Keep the splash screen visible
      await loadFonts(); // Load fonts
      SplashScreen.hideAsync(); // Hide the splash screen
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  const PRODUCTS_QUERY = gql`
    query GetProducts {
      products {
        id
        name
        price
        image
      }
    }
  `;

  // client.writeQuery({
  //   query: PRODUCTS_QUERY,
  //   data: {
  //     products: productData,
  //   },
  // });
  
  return (
    <Provider store={store}>
      <ThemeProvider theme={selectedTheme}>
      <ApolloProvider client={authClient}>
        <ApolloProvider client={pokemonClient}>
          <GestureHandlerRootView>
            <Stack
              screenOptions={{
                contentStyle: { backgroundColor: "#fff" },
                headerTitleAlign: "center",
              }}
            >
              <Stack.Screen
                name="SignUp"
                options={{
                  headerStyle: {
                    backgroundColor: "#000000",
                  },
                  headerTitleStyle: {
                    color: "#fff",
                    fontSize: 20,
                    fontFamily: "NexaBold",
                  },
                  headerTitle: "Sign Up",
                  headerBackTitleVisible: false,
                  headerLeft: () => (
                    <Ionicons
                      name="arrow-back"
                      size={24}
                      color="#fff"
                      style={{ marginLeft: 10 }} // Adjust style as needed
                      onPress={() => navigation.goBack()}
                    />
                  ),
                }}
              />
              <Stack.Screen
                name="LogIn"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="userProfile"
                options={{
                  headerStyle: {
                    backgroundColor: "#000000",
                  },
                  headerTitleStyle: {
                    color: "#fff",
                    fontSize: 20,
                    fontFamily: "NexaBold",
                  },
                  headerTitle: "Profile",
                  headerBackTitleVisible: false,
                  headerLeft: () => (
                    <Ionicons
                      name="arrow-back"
                      size={24}
                      color="#fff"
                      style={{ marginLeft: 10 }} // Adjust style as needed
                      onPress={() => navigation.goBack()}
                    />
                  ),
                }}
              />

              <Stack.Screen
                name="(drawer)"
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="(modals)"
                options={{
                  headerShown: false,
                }}
              />
            </Stack>
          </GestureHandlerRootView>
        </ApolloProvider>
      </ApolloProvider>
      </ThemeProvider>
    </Provider>
  );
}
