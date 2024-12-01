// components/adminUI/students/Student.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import EditStudentModal from "./EditStudentModal";
import StudentHoursModal from "./StudentHoursModal";
// import ScheduleStudent from "./ScheduleStudentModal";
// import StudentHoursModal from "./StudentHoursModal";
// import { formatPhoneNumber } from "../../../utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { formatPhoneNumber } from "../../utils/utils";

const Student = ({ student, refresh }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  const getPermitExpiryColor = () => {
    const expiryDate = new Date(student.permitExpiryDate);
    const currentDate = new Date();
    const differenceInDays = (expiryDate - currentDate) / (1000 * 3600 * 24);

    if (differenceInDays < 0) return styles.expired;
    if (differenceInDays <= 7) return styles.expiringSoon;
    return {};
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setAccordionOpen(!accordionOpen)}
      >
        <View style={styles.headerContent}>
          <Text
            style={styles.name}
          >{`${student.firstName} ${student.lastName}`}</Text>
          <Text style={styles.classText}>{`Class ${student.clas}`}</Text>
        </View>
        <Ionicons
          name={accordionOpen ? "remove" : "add"}
          size={24}
          color="black"
        />
      </TouchableOpacity>

      {accordionOpen && (
        <View style={styles.content}>
          <Text style={styles.infoText}>
            DOB: <Text style={styles.infoValue}>{student.DOB}</Text>
          </Text>
          <Text style={styles.infoText}>
            Driver's License #:{" "}
            <Text style={styles.infoValue}>{student.DLnumber}</Text>
          </Text>
          <Text style={styles.infoText}>
            Phone:{" "}
            <Text style={styles.infoValue}>
              {formatPhoneNumber(student.phone)}
            </Text>
          </Text>
          <Text style={styles.infoText}>
            Email: <Text style={styles.infoValue}>{student.email}</Text>
          </Text>
          <Text style={[styles.infoText, getPermitExpiryColor()]}>
            Permit Expiry Date:{" "}
            <Text style={styles.infoValue}>{student.permitExpiryDate}</Text>
          </Text>
          {/* <View style={styles.buttonContainer}>
            <EditStudentModal info={student} refresh={refresh} />
          </View> */}
          <View style={styles.buttonContainer}>
            <EditStudentModal info={student} refresh={refresh} />
            <StudentHoursModal
              studentId={student._id}
              studentName={`${student.firstName} ${student.lastName}`}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    padding: 8,
    marginVertical: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    textTransform: "uppercase",
  },
  classText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  content: {
    marginTop: 16,
  },
  infoText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  infoValue: {
    fontWeight: "normal",
  },
  expired: {
    backgroundColor: "#DC2626",
    borderRadius: 8,
    padding: 4,
  },
  expiringSoon: {
    backgroundColor: "#F97316",
    borderRadius: 8,
    padding: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  hoursButton: {
    backgroundColor: "#1F2937",
    padding: 8,
    borderRadius: 8,
    marginLeft: "auto",
  },
  buttonText: {
    color: "white",
    textTransform: "uppercase",
  },
});

export default Student;
