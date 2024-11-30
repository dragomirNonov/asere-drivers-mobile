import { StyleSheet } from "react-native";

export default StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
  },
  navbar: {
    backgroundColor: "#1F2937",
    padding: 16,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    height: 48,
    width: 48,
  },
  mobileMenu: {
    marginTop: 16,
  },
  mobileMenuItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#374151",
  },
  menuText: {
    color: "#F59E0B",
    fontSize: 16,
  },
  logoutButton: {
    padding: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#F59E0B",
    borderRadius: 4,
  },
});
