import { StyleSheet } from "react-native";

const LoginPageStyles = StyleSheet.create({
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
  },
  registerContainer: {
    flexDirection: "row",
    width: "100%",
    marginTop: 10,
    marginBottom: 15,
  },
  registerText: {
    color: "#6B7280",
  },
  registerLink: {
    color: "#6B7280",
    textDecorationLine: "underline",
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#0F766E",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  homeButton: {
    marginTop: 15,
    padding: 10,
  },
  homeButtonText: {
    color: "#6B7280",
  },
});

export default LoginPageStyles;
