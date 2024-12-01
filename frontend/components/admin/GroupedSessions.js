import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import SessionItem from "./SessionItem";

const GroupedSessions = ({ sessions, formatDate, fetchSessions }) => {
  // Define the order of maneuvers
  const maneuverOrder = ["Pre Trip", "Straight Back", "Off Set", "Road"];

  // Group sessions by maneuver
  const groupedSessions = sessions.reduce((groups, session) => {
    const maneuver = session.maneuver || "Uncategorized";
    if (!groups[maneuver]) {
      groups[maneuver] = [];
    }
    groups[maneuver].push(session);
    return groups;
  }, {});

  // Calculate total hours per maneuver
  const maneuverTotals = Object.entries(groupedSessions).reduce(
    (totals, [maneuver, maneuverSessions]) => {
      totals[maneuver] = maneuverSessions.reduce(
        (sum, session) => sum + (parseFloat(session.duration) || 0),
        0
      );
      return totals;
    },
    {}
  );

  // Create an array of maneuver entries in the specified order
  const orderedManeuvers = maneuverOrder
    .filter((maneuver) => groupedSessions[maneuver]) // Only include maneuvers that have sessions
    .map((maneuver) => [maneuver, groupedSessions[maneuver]]);

  // Add any remaining maneuvers that weren't in the specified order
  const remainingManeuvers = Object.entries(groupedSessions).filter(
    ([maneuver]) => !maneuverOrder.includes(maneuver)
  );

  const allManeuvers = [...orderedManeuvers, ...remainingManeuvers];

  return (
    <ScrollView style={styles.container}>
      {allManeuvers.map(([maneuver, maneuverSessions]) => (
        <View key={maneuver} style={styles.maneuverGroup}>
          <View style={styles.maneuverHeader}>
            <Text style={styles.maneuverTitle}>{maneuver}</Text>
            <Text style={styles.maneuverTotal}>
              Total: {maneuverTotals[maneuver].toFixed(1)}h
            </Text>
          </View>
          {maneuverSessions.map((session) => (
            <SessionItem
              key={session._id}
              session={session}
              formatDate={formatDate}
              fetchSessions={fetchSessions}
            />
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
  },
  maneuverGroup: {
    marginBottom: 16,
  },
  maneuverHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1F2937",
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  maneuverTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  maneuverTotal: {
    color: "white",
    fontSize: 14,
  },
});

export default GroupedSessions;
