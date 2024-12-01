import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ImageBackground, StatusBar } from "react-native";
import LoginPage from "./screens/LoginPage";
import RegisterPage from "./screens/RegisterPage";
import AdminScreen from "./screens/AdminScreen";
import truckImage from "./assets/truck3.png";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <ImageBackground
        source={truckImage}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: "transparent" },
                animationEnabled: true,
              }}
            >
              <Stack.Screen name="Login" component={LoginPage} />
              <Stack.Screen name="Register" component={RegisterPage} />
              <Stack.Screen name="Admin" component={AdminScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </ImageBackground>
    </>
  );
};

export default App;
