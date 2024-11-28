import { StyleSheet } from "react-native";

const RegisterPageStyles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loginContainer: {
    width: "100%",
    backgroundColor: "rgba(17, 24, 39, 0.8)", // Dark gray with opacity
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    color: "#6B7280",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#374151",
    color: "white",
    borderRadius: 8,
    padding: 10,
    width: "100%",
    height: 50, // Explicit height
    justifyContent: "center", // Centers the text vertically
  },
  picker: {
    backgroundColor: "#374151",
    color: "#888",
    width: "100%",
    height: 50,
  },
  registerContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: 15,
  },
  registerText: {
    color: "#6B7280",
  },
  registerLink: {
    color: "#6B7280",
    textDecorationLine: "underline",
  },
  registerButton: {
    width: "100%",
    backgroundColor: "#0F766E",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  registerButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  successText: {
    color: "green",
    marginTop: 10,
  },
  pickerContainer: {
    backgroundColor: "#374151",
    borderRadius: 8,
    overflow: "hidden", // This is important for iOS
  },
});

export default RegisterPageStyles;
