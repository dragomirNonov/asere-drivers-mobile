import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import sessionService from "../../services/sessionService";

const SessionItem = ({ session, formatDate, fetchSessions }) => {
  const handleDelete = async () => {
    Alert.alert(
      "Delete Session",
      "Are you sure you want to delete this session?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await sessionService.deleteSessionById(session._id);
              if (fetchSessions) {
                await fetchSessions();
              }
            } catch (error) {
              console.error("Error deleting session:", error);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.sessionItem}>
      <View style={styles.sessionDetails}>
        <View style={styles.timeContainer}>
          <View style={styles.timeBlock}>
            <Text style={styles.timeLabel}>Clock In</Text>
            <Text style={styles.timeValue}>{session.clockedIn}</Text>
          </View>
          <View style={styles.timeBlock}>
            <Text style={styles.timeLabel}>Clock Out</Text>
            <Text style={styles.timeValue}>{session.clockedOut}</Text>
          </View>
          <View style={styles.timeBlock}>
            <Text style={styles.timeLabel}>Duration</Text>
            <Text style={styles.timeValue}>{session.duration}h</Text>
          </View>
        </View>
        <View style={styles.iconsContainer}>
          <View style={styles.dateBlock}>
            <Text style={styles.dateLabel}>Date:</Text>
            <Text style={styles.dateValue}>{formatDate(session.date)}</Text>
          </View>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="edit" size={24} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} style={styles.iconButton}>
            <MaterialIcons name="delete" size={24} color="#ff4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sessionItem: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  iconButton: {
    paddingHorizontal: 5,
  },
  sessionDetails: {
    backgroundColor: "white",
    borderRadius: 4,
    padding: 8,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  timeBlock: {
    alignItems: "center",
  },
  dateBlock: {
    flex: 1,
    flexDirection: "row",
  },
  timeLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 14,
    fontWeight: "bold",
  },
  dateLabel: {
    paddingRight: 5,
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
  },
  dateValue: {
    color: "#666",
    fontSize: 14,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

export default SessionItem;
