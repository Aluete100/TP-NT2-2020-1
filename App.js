import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import PomodoroTimer from "./components/PomodoroTimer";

export default function App() {
  return <PomodoroTimer />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
