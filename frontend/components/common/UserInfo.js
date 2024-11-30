// components/common/UserInfo.js
import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import userService from "../../services/userService";

const UserInfo = ({ userRole, userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userId) {
      userService
        .getUserById(userId)
        .then((response) => {
          setUser(response.data.user);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
  }, [userId]);

  if (!userId) {
    return <Text style={styles.text}>Error: Missing user ID</Text>;
  }

  if (!user) {
    return <ActivityIndicator size="small" color="#F59E0B" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.text}>Welcome! </Text>
        {/* <Text style={styles.text}>Dragomir </Text> */}
        <Text style={styles.text}>{user.firstName} </Text>
        <Text style={styles.text}>{user.lastName}</Text>
        {/* <Text style={styles.text}>Nonov</Text> */}
      </View>
      <Text style={styles.text}>Logged in as a: {userRole}</Text>
    </View>
  );
};

const styles = {
  container: {
    padding: 8,
  },
  row: {
    flexDirection: "row",
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
};

export default UserInfo;
