import { StyleSheet } from "react-native";

export default StyleSheet.create({
  editButton: {
    backgroundColor: "",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    // marginLeft: "auto",
    marginRight: 4,
    backgroundColor: "#1F2937",
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  modalContent: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    width: "100%",
    maxWidth: 500,
    overflow: "hidden",
  },
  modalHeader: {
    backgroundColor: "slate-800",
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1F2937",
  },
  modalTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalCloseButton: {
    color: "white",
    fontSize: 24,
  },
  modalBody: {
    padding: 20,
  },
  formField: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 16,
    color: "#1F2937",
    paddingRight: 8,
    fontWeight: "bold",
  },
  pickerInput: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 1,
    color: "white",
    borderRadius: 6,
    padding: 8,
    fontSize: 16,
    // width: "100%",
    height: 40, // Explicit height
    justifyContent: "center", // Centers the text vertically
  },
  picker: {
    // color: "#888",
    width: "100%",
    // height: 50,
  },
  formInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray-400",
    borderRadius: 6,
    padding: 8,
    fontSize: 16,
    backgroundColor: "white",
    borderColor: "#e5e5e5",
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  modalButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginLeft: 12,
  },
  deleteButton: {
    backgroundColor: "red",
  },
  closeButton: {
    color: "red",
    // borderWidth: 1,
  },
  saveButton: {
    backgroundColor: "rgb(16 185 129 )",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
