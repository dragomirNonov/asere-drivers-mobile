import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import userService from "../../services/userService";
import styles from "../../styles/EditStudentModalStyles";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Alert } from "react-native";

const EditStudentModal = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showDOBPicker, setShowDOBPicker] = useState(false);
  const [showPermitPicker, setShowPermitPicker] = useState(false);
  const [editedInfo, setEditedInfo] = useState({
    firstName: props.info.firstName,
    lastName: props.info.lastName,
    transmission: props.info.transmission,
    DOB: props.info.DOB,
    DLnumber: props.info.DLnumber,
    phone: props.info.phone,
    email: props.info.email,
    permitExpiryDate: props.info.permitExpiryDate,
    clas: props.info.clas,
    id: props.info._id,
  });

  const handleChange = (name, value) => {
    setEditedInfo({
      ...editedInfo,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await userService.editStudent(editedInfo);
      props.refresh();
      setShowModal(false);
    } catch (error) {
      console.error(`Failed to edit student: ${error.message}`);
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this student?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await userService.deleteStudent(props.info._id);
              props.refresh();
              setShowModal(false);
            } catch (error) {
              console.error(`Failed to delete student: ${error.message}`);
            }
          },
        },
      ]
    );
  };

  const onDOBChange = (event, selectedDate) => {
    setShowDOBPicker(false);
    if (selectedDate) {
      const date = new Date(selectedDate);
      const formattedDate = date.toLocaleDateString("en-CA"); // Formats as YYYY-MM-DD
      handleChange("DOB", formattedDate);
    }
  };

  const onPermitExpiryChange = (event, selectedDate) => {
    setShowPermitPicker(false);
    if (selectedDate) {
      const date = new Date(selectedDate);
      const formattedDate = date.toLocaleDateString("en-CA"); // Formats as YYYY-MM-DD
      handleChange("permitExpiryDate", formattedDate);
    }
  };

  return (
    <>
      <Pressable style={styles.editButton} onPress={() => setShowModal(true)}>
        <Text style={styles.editButtonText}>Edit</Text>
      </Pressable>
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Student Info</Text>
              <Pressable onPress={() => setShowModal(false)}>
                <Text style={styles.modalCloseButton}>×</Text>
              </Pressable>
            </View>
            <View style={styles.modalBody}>
              <View style={styles.formField}>
                <Text style={styles.formLabel}>First Name:</Text>
                <TextInput
                  style={styles.formInput}
                  name="firstName"
                  value={editedInfo.firstName}
                  onChangeText={(value) => handleChange("firstName", value)}
                />
              </View>
              <View style={styles.formField}>
                <Text style={styles.formLabel}>Last Name:</Text>
                <TextInput
                  style={styles.formInput}
                  name="lastName"
                  value={editedInfo.lastName}
                  onChangeText={(value) => handleChange("lastName", value)}
                />
              </View>

              {/* <View style={styles.formField}>
                <Text style={styles.formLabel}>Transmission:</Text>
                <TextInput
                  style={styles.formInput}
                  name="transmission"
                  value={editedInfo.transmission}
                  onChangeText={(value) => handleChange("transmission", value)}
                />
              </View> */}

              <View style={styles.formField}>
                <Text style={styles.formLabel}>Transmission:</Text>
                <View style={styles.pickerInput}>
                  <Picker
                    selectedValue={editedInfo.transmission}
                    style={styles.picker}
                    dropdownIconColor="white"
                    onValueChange={(value) => handleChange("clas", value)}
                  >
                    <Picker.Item label="Standard" value="Standard" />
                    <Picker.Item label="Automatic" value="Automatic" />
                  </Picker>
                </View>
              </View>

              <View style={styles.formField}>
                <Text style={styles.formLabel}>Class:</Text>
                <View style={styles.pickerInput}>
                  <Picker
                    selectedValue={editedInfo.clas}
                    style={styles.picker}
                    dropdownIconColor="white"
                    onValueChange={(value) => handleChange("clas", value)}
                  >
                    <Picker.Item label="A" value="A" />
                    <Picker.Item label="B" value="B" />
                  </Picker>
                </View>
              </View>

              {/* <View style={styles.formField}>
                <Text style={styles.formLabel}>Class:</Text>
                <TextInput
                  style={styles.formInput}
                  name="clas"
                  value={editedInfo.clas}
                  onChangeText={(value) => handleChange("clas", value)}
                />
              </View> */}

              {/* <View style={styles.formField}>
                <Text style={styles.formLabel}>Date of Birth:</Text>
                <TextInput
                  style={styles.formInput}
                  name="DOB"
                  value={editedInfo.DOB}
                  onChangeText={(value) => handleChange("DOB", value)}
                />
              </View> */}
              <View style={styles.formField}>
                <Text style={styles.formLabel}>Date of Birth:</Text>
                <TouchableOpacity
                  style={[styles.formInput]}
                  onPress={() => setShowDOBPicker(true)}
                >
                  <Text style={{ color: editedInfo.DOB ? "black" : "black" }}>
                    {editedInfo.DOB || "Select Date of Birth"}
                  </Text>
                </TouchableOpacity>

                {showDOBPicker && (
                  <DateTimePicker
                    value={
                      editedInfo.DOB ? new Date(editedInfo.DOB) : new Date()
                    }
                    mode="date"
                    display="default"
                    onChange={onDOBChange}
                    maximumDate={new Date()}
                    minimumDate={new Date(1940, 0, 1)}
                  />
                )}
              </View>
              <View style={styles.formField}>
                <Text style={styles.formLabel}>Driver's License #:</Text>
                <TextInput
                  style={styles.formInput}
                  name="DLnumber"
                  value={editedInfo.DLnumber}
                  onChangeText={(value) => handleChange("DLnumber", value)}
                />
              </View>
              <View style={styles.formField}>
                <Text style={styles.formLabel}>Phone:</Text>
                <TextInput
                  style={styles.formInput}
                  name="phone"
                  value={editedInfo.phone}
                  onChangeText={(value) => handleChange("phone", value)}
                />
              </View>
              <View style={styles.formField}>
                <Text style={styles.formLabel}>Email:</Text>
                <TextInput
                  style={styles.formInput}
                  name="email"
                  value={editedInfo.email}
                  onChangeText={(value) => handleChange("email", value)}
                />
              </View>

              {/* <View style={styles.formField}>
                <Text style={styles.formLabel}>Permit Expiry Date:</Text>
                <TextInput
                  style={styles.formInput}
                  name="permitExpiryDate"
                  value={editedInfo.permitExpiryDate}
                  onChangeText={(value) =>
                    handleChange("permitExpiryDate", value)
                  }
                />
              </View> */}

              <View style={styles.formField}>
                <Text style={styles.formLabel}>Permit Expiry Date:</Text>
                <TouchableOpacity
                  style={[styles.formInput]}
                  onPress={() => setShowPermitPicker(true)}
                >
                  <Text
                    style={{
                      color: editedInfo.permitExpiryDate ? "black" : "black",
                    }}
                  >
                    {editedInfo.permitExpiryDate || "Select Date of Birth"}
                  </Text>
                </TouchableOpacity>

                {showPermitPicker && (
                  <DateTimePicker
                    value={
                      editedInfo.permitExpiryDate
                        ? new Date(editedInfo.permitExpiryDate)
                        : new Date()
                    }
                    mode="date"
                    display="default"
                    onChange={onPermitExpiryChange}
                    maximumDate={new Date()}
                    minimumDate={new Date(1940, 0, 1)}
                  />
                )}
              </View>
            </View>
            <View style={styles.modalFooter}>
              <Pressable
                style={[styles.modalButton, styles.deleteButton]}
                onPress={handleDelete}
              >
                <Text style={styles.modalButtonText}>Delete</Text>
              </Pressable>
              {/* <Pressable
                style={[styles.modalButton]}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.closeButton}>Close</Text>
              </Pressable> */}
              <Pressable
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSubmit}
              >
                <Text style={styles.modalButtonText}>Save Changes</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default EditStudentModal;
