import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import TimeSelector from "../common/TimeSelector";

const NewSessionForm = ({ onSubmit, onCancel }) => {
  const [date, setDate] = useState(new Date());
  const [clockedIn, setClockedIn] = useState("");
  const [clockedOut, setClockoutOut] = useState("");
  const [maneuver, setManeuver] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const maneuverOptions = ["Pre Trip", "Straight Back", "Off Set", "Road"];

  const handleSubmit = () => {
    onSubmit({
      date,
      clockedIn: clockedIn,
      clockedOut: clockedOut,
      maneuver,
    });
    resetForm();
  };

  const resetForm = () => {
    setDate(new Date());
    setClockedIn("");
    setClockoutOut("");
    setManeuver("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Session</Text>

      <Pressable
        style={styles.dateInput}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.inputLabel}>Date</Text>
        <Text style={styles.dateText}>
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </Text>
      </Pressable>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}
      <TimeSelector
        clockedIn={clockedIn}
        clockedOut={clockedOut}
        onClockedInChange={setClockedIn}
        onClockedOutChange={setClockoutOut}
      />

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Maneuver</Text>
        <View style={styles.maneuverButtons}>
          {maneuverOptions.map((option) => (
            <Pressable
              key={option}
              style={[
                styles.maneuverButton,
                maneuver === option && styles.maneuverButtonActive,
              ]}
              onPress={() => setManeuver(option)}
            >
              <Text
                style={[
                  styles.maneuverButtonText,
                  maneuver === option && styles.maneuverButtonTextActive,
                ]}
              >
                {option}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, styles.cancelButton]}
          onPress={onCancel}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.submitButton]}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  dateInput: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  dateText: {
    fontSize: 16,
  },
  maneuverButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  maneuverButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  maneuverButtonActive: {
    backgroundColor: "#1F2937",
    borderColor: "#1F2937",
  },
  maneuverButtonText: {
    color: "#666",
  },
  maneuverButtonTextActive: {
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: 16,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
  },
  cancelButton: {
    backgroundColor: "#666",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default NewSessionForm;
