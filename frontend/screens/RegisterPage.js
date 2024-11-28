import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import userService from "../services/userService";
import styles from "../styles/RegisterPageStyles";
import truckImage from "../assets/truck3.png";

const RegisterPage = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    transmission: "",
    clas: "",
    DLnumber: "",
    DOB: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleChange("DOB", selectedDate.toISOString().split("T")[0]);
    }
  };

  const renderDatePicker = () => {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date of Birth</Text>
        <TouchableOpacity
          style={[styles.input]}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={{ color: formData.DOB ? "white" : "#888" }}>
            {formData.DOB || "Select Date of Birth"}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={formData.DOB ? new Date(formData.DOB) : new Date()}
            mode="date"
            display="default"
            onChange={onDateChange}
            maximumDate={new Date()}
            minimumDate={new Date(1940, 0, 1)}
          />
        )}
      </View>
    );
  };

  const checkPasswordMatch = () => {
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleSubmit = async () => {
    if (!checkPasswordMatch()) {
      return;
    }

    try {
      const response = await userService.register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        transmission: formData.transmission,
        clas: formData.clas,
        DLnumber: formData.DLnumber,
        DOB: formData.DOB,
        password: formData.password,
      });

      if (response.status === 200) {
        setSuccessMessage(response.data.message);
        Alert.alert("Success", "Registration successful!");
        setTimeout(() => {
          navigation.navigate("Login");
        }, 1500);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Registration failed";
      setErrorMessage(errorMsg);
      Alert.alert("Registration Error", errorMsg);
    }
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
          <Text style={styles.title}>SIGN UP</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              value={formData.firstName}
              onChangeText={(value) => handleChange("firstName", value)}
              placeholder="Enter first name"
              placeholderTextColor="#888"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={formData.lastName}
              onChangeText={(value) => handleChange("lastName", value)}
              placeholder="Enter last name"
              placeholderTextColor="#888"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              value={formData.phone}
              onChangeText={(value) => handleChange("phone", value)}
              keyboardType="phone-pad"
              placeholder="Enter phone number"
              placeholderTextColor="#888"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(value) => handleChange("email", value)}
              keyboardType="email-address"
              placeholder="Enter email"
              placeholderTextColor="#888"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Transmission</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.transmission}
                style={styles.picker}
                dropdownIconColor="white"
                onValueChange={(value) => handleChange("transmission", value)}
              >
                <Picker.Item label="Select transmission" value="" />
                <Picker.Item label="Automatic" value="Automatic" />
                <Picker.Item label="Standard" value="Standard" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Class</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.clas}
                style={styles.picker}
                dropdownIconColor="white"
                onValueChange={(value) => handleChange("clas", value)}
              >
                <Picker.Item label="Select class" value="" />
                <Picker.Item label="A" value="A" />
                <Picker.Item label="B" value="B" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Driver's License #</Text>
            <TextInput
              style={styles.input}
              value={formData.DLnumber}
              onChangeText={(value) => handleChange("DLnumber", value)}
              placeholder="Enter license number"
              placeholderTextColor="#888"
            />
          </View>

          {renderDatePicker()}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={formData.password}
              onChangeText={(value) => handleChange("password", value)}
              secureTextEntry
              placeholder="Enter password"
              placeholderTextColor="#888"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              value={formData.confirmPassword}
              onChangeText={(value) => handleChange("confirmPassword", value)}
              secureTextEntry
              placeholder="Confirm password"
              placeholderTextColor="#888"
            />
          </View>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleSubmit}
          >
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>

          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
          {successMessage ? (
            <Text style={styles.successText}>{successMessage}</Text>
          ) : null}

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.registerLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default RegisterPage;
