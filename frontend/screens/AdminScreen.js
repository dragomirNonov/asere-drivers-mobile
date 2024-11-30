// screens/AdminScreen.js
import React from "react";
import { View, ImageBackground, ScrollView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navbar from "../components/admin/Navbar";
import UserInfo from "../components/common/UserInfo";
import StudentsScreen from "./adminPages/StudentsPage";
// import AppointmentsScreen from "./admin/AppointmentsScreen";
// import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import truckImage from "../assets/truck3.png";
import styles from "../styles/ImageBackgroundStyles";

const Stack = createNativeStackNavigator();

const AdminScreen = () => {
  const route = useRoute();
  const { userRole, userId } = route.params;

  return (
    <ImageBackground
      source={truckImage}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ flex: 1 }}>
          <Navbar />
          {/* <UserInfo userRole={userRole} userId={userId} /> */}
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="Students"
              component={StudentsScreen}
              initialParams={{ imageBackground: truckImage }}
            />
            {/* <Stack.Screen name="Appointments" component={AppointmentsScreen} /> */}
          </Stack.Navigator>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default AdminScreen;
