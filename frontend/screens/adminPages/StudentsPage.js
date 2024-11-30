// screens/admin/StudentsScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  ImageBackground,
} from "react-native";
import studentServices from "../../services/userService";
import Student from "../../components/admin/Student";
// import AddStudentModal from "../../components/adminUI/students/AddStudentModal";

const StudentsScreen = ({ route }) => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { imageBackground } = route.params;

  const fetchStudents = async () => {
    try {
      const response = await studentServices.getAllStudents();
      setStudents(response.data.students);
    } catch (error) {
      console.error("Error fetching students:", error);
      Alert.alert("Error", "Failed to fetch students");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const showSuccess = (message) => {
    Alert.alert("Success", message);
  };

  const filteredStudents = students.filter((student) =>
    student.firstName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const standardStudents = filteredStudents
    .filter((student) => student.transmission === "Standard")
    .sort((a, b) => a.firstName.localeCompare(b.firstName));

  const automaticStudents = filteredStudents
    .filter((student) => student.transmission === "Automatic")
    .sort((a, b) => a.firstName.localeCompare(b.firstName));

  return (
    <ImageBackground source={imageBackground} style={styles.imageBackground}>
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by student name..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* <AddStudentModal
        refresh={fetchStudents}
        onSuccess={() => showSuccess("Student Added Successfully")}
      /> */}

        <ScrollView>
          <View style={styles.transmissionSection}>
            <Text style={styles.sectionTitle}>
              Standard Transmission Students
            </Text>
            {standardStudents.map((student) => (
              <Student
                key={student._id}
                student={student}
                onSuccess={() => showSuccess("Appointment Added Successfully")}
                refresh={fetchStudents}
              />
            ))}
          </View>

          <View style={styles.transmissionSection}>
            <Text style={styles.sectionTitle}>
              Automatic Transmission Students
            </Text>
            {automaticStudents.map((student) => (
              <Student
                key={student._id}
                student={student}
                onSuccess={() => showSuccess("Appointment Added Successfully")}
                refresh={fetchStudents}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = {
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
    marginTop: 16,
    backgroundColor: "white",
  },
  transmissionSection: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#1F2937",
    color: "white",
    padding: 8,
  },
};

export default StudentsScreen;
