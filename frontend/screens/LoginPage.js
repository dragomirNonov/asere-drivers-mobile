import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/LoginPageStyles";
import truckImage from "../assets/truck3.png";
import userService from "../services/userService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginPage = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (!phone || !password) {
      setErrorMessage("Please enter both phone and password");
      return;
    }

    try {
      const response = await userService.login({ phone, password });

      if (response.status === 200) {
        await AsyncStorage.setItem("token", response.data.token);
        // Alert.alert("Success", "Logged in successfully!");

        // Decode token to get role
        const decodeToken = (token) => {
          try {
            return JSON.parse(atob(token.split(".")[1]));
          } catch (error) {
            console.error("Error decoding token:", error);
            return null;
          }
        };

        const decodedToken = decodeToken(response.data.token);
        if (decodedToken?.role === "Manager") {
          navigation.navigate("Admin", {
            userRole: decodedToken.role,
            userId: decodedToken.userId,
          });
        } else {
          Alert.alert("Success", "Logged in successfully!");
        }
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Login failed";
      setErrorMessage(errorMsg);
      Alert.alert("Login Error", errorMsg);
    }
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

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
        <View style={styles.loginContainer}>
          <Text style={styles.title}>SIGN IN</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholderTextColor="#888"
              placeholder="Enter your phone number"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#888"
              placeholder="Enter your password"
            />
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={handleRegister}>
              <Text style={styles.registerLink}>Register</Text>
            </TouchableOpacity>
          </View>
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default LoginPage;
