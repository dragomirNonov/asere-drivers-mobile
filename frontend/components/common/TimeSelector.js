import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";

const TimeSelector = ({
  clockedIn,
  clockedOut,
  onClockedInChange,
  onClockedOutChange,
}) => {
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  // Convert 24-hour time to 12-hour AM/PM format
  const formatTimeDisplay = (time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const hourNum = parseInt(hours);
    const period = hourNum >= 12 ? "PM" : "AM";
    const displayHour = hourNum % 12 || 12;
    return `${displayHour}:${minutes} ${period}`;
  };

  // Convert 12-hour AM/PM time back to 24-hour format
  const convertToMilitaryTime = (time) => {
    if (!time) return "";
    const [timeWithoutPeriod, period] = time.split(" ");
    let [hours, minutes] = timeWithoutPeriod.split(":");
    hours = parseInt(hours);

    if (period === "PM" && hours !== 12) {
      hours += 12;
    } else if (period === "AM" && hours === 12) {
      hours = 0;
    }

    return `${hours.toString().padStart(2, "0")}:${minutes}`;
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 16; hour++) {
      const formattedHour = hour.toString().padStart(2, "0");
      slots.push(`${formattedHour}:00`);
      slots.push(`${formattedHour}:30`);
    }
    slots.push("17:00");
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const getNextAvailableTime = (selectedTime) => {
    const currentIndex = timeSlots.indexOf(selectedTime);
    return timeSlots[currentIndex + 1] || timeSlots[timeSlots.length - 1];
  };

  const handleClockedInChange = (time) => {
    const militaryTime = convertToMilitaryTime(time);
    onClockedInChange(militaryTime);
    setShowStartPicker(false);

    if (clockedOut && militaryTime >= clockedOut) {
      const nextTime = getNextAvailableTime(militaryTime);
      onClockedOutChange(nextTime);
    }
  };

  const handleClockedOutChange = (time) => {
    const militaryTime = convertToMilitaryTime(time);
    onClockedOutChange(militaryTime);
    setShowEndPicker(false);
  };

  // Filter time slots based on selected start time
  const filteredEndTimeSlots = clockedIn
    ? timeSlots.filter((time) => time > clockedIn)
    : timeSlots;

  const TimePickerModal = ({
    visible,
    onClose,
    value,
    onChange,
    timeSlots,
    title,
  }) => (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <Pressable onPress={onClose}>
              <Text style={styles.modalCloseButton}>×</Text>
            </Pressable>
          </View>
          <ScrollView style={styles.timeList}>
            {timeSlots.map((time) => (
              <Pressable
                key={time}
                style={[
                  styles.timeOption,
                  formatTimeDisplay(time) === formatTimeDisplay(value) &&
                    styles.selectedTimeOption,
                ]}
                onPress={() => onChange(formatTimeDisplay(time))}
              >
                <Text
                  style={[
                    styles.timeOptionText,
                    formatTimeDisplay(time) === formatTimeDisplay(value) &&
                      styles.selectedTimeOptionText,
                  ]}
                >
                  {formatTimeDisplay(time)}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {/* Start Time Selector */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Start Time</Text>
        <Pressable
          style={styles.input}
          onPress={() => setShowStartPicker(true)}
        >
          <Text style={styles.inputText}>
            {clockedIn ? formatTimeDisplay(clockedIn) : "Start time"}
          </Text>
        </Pressable>
      </View>

      {/* End Time Selector */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>End Time</Text>
        <Pressable
          style={[styles.input, !clockedIn && styles.inputDisabled]}
          onPress={() => clockedIn && setShowEndPicker(true)}
        >
          <Text
            style={[styles.inputText, !clockedIn && styles.inputTextDisabled]}
          >
            {clockedOut ? formatTimeDisplay(clockedOut) : "End time"}
          </Text>
        </Pressable>
      </View>

      {/* Time Picker Modals */}
      <TimePickerModal
        visible={showStartPicker}
        onClose={() => setShowStartPicker(false)}
        value={clockedIn}
        onChange={handleClockedInChange}
        timeSlots={timeSlots}
        title="Select Start Time"
      />

      <TimePickerModal
        visible={showEndPicker}
        onClose={() => setShowEndPicker(false)}
        value={clockedOut}
        onChange={handleClockedOutChange}
        timeSlots={filteredEndTimeSlots}
        title="Select End Time"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
  },
  inputContainer: {
    flex: 1,
  },
  label: {
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
  inputDisabled: {
    backgroundColor: "#f5f5f5",
    borderColor: "#e0e0e0",
  },
  inputText: {
    color: "#000",
  },
  inputTextDisabled: {
    color: "#999",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 8,
    width: "100%",
    maxHeight: "70%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalCloseButton: {
    fontSize: 24,
    fontWeight: "bold",
  },
  timeList: {
    maxHeight: 300,
  },
  timeOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  selectedTimeOption: {
    backgroundColor: "#1F2937",
  },
  timeOptionText: {
    fontSize: 16,
  },
  selectedTimeOptionText: {
    color: "white",
  },
});

export default TimeSelector;
