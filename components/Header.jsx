import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Reloj Pomodoro</Text>
        <TouchableOpacity></TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    width: "100%",
    backgroundColor: "blue",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
  },
});

export default Header;
