import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/AdminNavbarStyles";
import truckImage from "../../assets/truck3.png";

const navLinks = [
  { title: "Students", link: "Students" },
  { title: "Appointments", link: "Appointments" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.navigate("Login");
  };

  return (
    // <ImageBackground
    //   source={truckImage}
    //   style={styles.backgroundImage}
    //   resizeMode="cover"
    // >
    //   <ScrollView
    //     contentContainerStyle={styles.container}
    //     keyboardShouldPersistTaps="handled"
    //   >
    <View style={styles.navbar}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.logo}
          />
        </View>

        <TouchableOpacity onPress={() => setIsMenuOpen(!isMenuOpen)}>
          <Ionicons
            name={isMenuOpen ? "close" : "menu"}
            size={30}
            color="#F59E0B"
          />
        </TouchableOpacity>
      </View>

      {isMenuOpen && (
        <View style={styles.mobileMenu}>
          {navLinks.map((link, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate(link.link);
                setIsMenuOpen(false);
              }}
              style={styles.mobileMenuItem}
            >
              <Text style={styles.menuText}>{link.title}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.menuText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
    //   </ScrollView>
    // </ImageBackground>
  );
};

export default Navbar;
