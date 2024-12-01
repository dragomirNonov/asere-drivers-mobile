import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import sessionServices from "../../services/sessionService";
import GroupedSessions from "./GroupedSessions";
import NewSessionForm from "./NewSessionForm";

const StudentHoursModal = ({ studentId, studentName }) => {
  const [showModal, setShowModal] = useState(false);
  const [showNewSessionForm, setShowNewSessionForm] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [totalHours, setTotalHours] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await sessionServices.getSessionsByStudentId(studentId);
      setSessions(response.data.sessions);
      setTotalHours(response.data.totalHours);
    } catch (error) {
      setError("Failed to load sessions. Please try again.");
      setSessions([]);
      setTotalHours(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      fetchSessions();
    }
  }, [showModal]);

  const handleAddSession = async (sessionData) => {
    try {
      setLoading(true);
      setError(null);
      await sessionServices.createSession({
        ...sessionData,
        userId: studentId,
      });
      setShowNewSessionForm(false);
      fetchSessions();
    } catch (error) {
      // Check if we have a response with an error message from the backend
      if (error.message) {
        setError(error.message);
      } else {
        // Fallback error message if we don't get one from the backend
        setError("Failed to create session. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  const TotalHoursSection = () => (
    <View style={styles.totalHoursContainer}>
      <Text style={styles.totalHoursTitle}>Total Hours</Text>
      <View style={styles.totalHoursGrid}>
        <View style={styles.totalHoursItem}>
          <Text style={styles.totalHoursLabel}>Pre-Trip</Text>
          <Text style={styles.totalHoursValue}>
            {totalHours?.preTrip || "0"}
          </Text>
        </View>
        <View style={styles.totalHoursItem}>
          <Text style={styles.totalHoursLabel}>Driving</Text>
          <Text style={styles.totalHoursValue}>
            {totalHours?.driving || "0"}
          </Text>
        </View>
        <View style={styles.totalHoursItem}>
          <Text style={styles.totalHoursLabel}>Total</Text>
          <Text style={[styles.totalHoursValue, styles.totalHoursTotal]}>
            {totalHours?.total || "0"}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <>
      <Pressable style={styles.hoursButton} onPress={() => setShowModal(true)}>
        <Text style={styles.buttonText}>View Hours</Text>
      </Pressable>

      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{studentName}'s Hours</Text>
              <Pressable onPress={() => setShowModal(false)}>
                <Text style={styles.modalCloseButton}>×</Text>
              </Pressable>
            </View>

            {/* Error message section */}
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <Pressable onPress={() => setError(null)}>
                  <Text style={styles.errorDismiss}>X</Text>
                </Pressable>
              </View>
            )}

            <ScrollView
              style={styles.modalBody}
              contentContainerStyle={styles.modalBodyContent}
            >
              {loading ? (
                <ActivityIndicator size="large" color="#4CAF50" />
              ) : (
                <>
                  {showNewSessionForm && (
                    <NewSessionForm
                      onSubmit={handleAddSession}
                      onCancel={() => setShowNewSessionForm(false)}
                    />
                  )}
                  <TotalHoursSection />
                  {sessions.length > 0 ? (
                    <GroupedSessions
                      sessions={sessions}
                      formatDate={formatDate}
                      fetchSessions={fetchSessions}
                    />
                  ) : (
                    <Text style={styles.noSessionsText}>No sessions found</Text>
                  )}
                </>
              )}
            </ScrollView>

            <View style={styles.modalFooter}>
              <Pressable
                style={[styles.modalButton, styles.addButton]}
                onPress={() => setShowNewSessionForm(true)}
              >
                <Text style={styles.modalButtonText}>Add</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.closeButton]}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.modalButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: "#FEE2E2", // Light red background
    paddingHorizontal: 12,
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FCA5A5",
  },
  errorText: {
    color: "#DC2626",
    flex: 1,
    marginRight: 10,
  },
  errorDismiss: {
    color: "#DC2626",
    fontSize: 18,
    fontWeight: "bold",
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
  modalContainer: {
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
    maxHeight: "100%", // Increased from 80%
    flex: 1, // Added to ensure proper sizing
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
    fontSize: 20,
    fontWeight: "bold",
  },
  modalCloseButton: {
    fontSize: 24,
    fontWeight: "bold",
  },
  modalBody: {
    flex: 1, // Added to ensure scrolling works properly
  },
  modalBodyContent: {
    padding: 15,
  },
  totalHoursContainer: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  totalHoursTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  totalHoursGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  totalHoursItem: {
    alignItems: "center",
  },
  totalHoursLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  totalHoursValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  totalHoursTotal: {
    fontSize: 18,
    color: "#1F2937",
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
    gap: 8,
  },
  modalButton: {
    padding: 10,
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#1F2937",
  },
  closeButton: {
    backgroundColor: "#4CAF50",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 20,
  },
  noSessionsText: {
    textAlign: "center",
    marginVertical: 20,
    color: "#666",
  },
});

export default StudentHoursModal;
