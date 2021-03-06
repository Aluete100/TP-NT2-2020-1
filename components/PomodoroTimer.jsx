import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import { vibrate } from "../utils";
import Header from "./Header";

class PomodoroTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOnWorkTime: true,
      workMinuteTimer: 24,
      workSecondsTimer: 59,
      relaxMinuteTimer: 4,
      relaxSecondsTimer: 59,
    };
  }

  componentDidMount() {
    this._intervalController();
  }

  componentDidUpdate() {
    if (this.state.workSecondsTimer === 0) {
      this.setState((prevState) => ({
        workMinuteTimer: prevState.workMinuteTimer - 1,
        workSecondsTimer: 59,
      }));
    }

    if (
      (this.state.workMinuteTimer === 0 && this.state.workSecondsTimer === 0) ||
      (this.state.relaxMinuteTimer === 0 && this.state.relaxSecondsTimer === 0)
    ) {
      this._restartTimer();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  async _restartTimer() {
    console.log("Cambio el modo del cronomentro");

    vibrate();
    clearInterval(this.interval);

    await this.setState((prevState) => ({
      isOnWorkTime: !prevState.isOnWorkTime,
    }));

    this._intervalController();
  }

  _intervalController() {
    console.log("Reinicio el intervalo");

    if (this.state.isOnWorkTime) {
      this.interval = setInterval(
        () =>
          this.setState((prevState) => ({
            workSecondsTimer: prevState.workSecondsTimer - 1,
          })),
        1000
      );
    } else {
      this.interval = setInterval(
        () =>
          this.setState((prevState) => ({
            relaxSecondsTimer: prevState.relaxSecondsTimer - 1,
          })),
        1000
      );
    }
  }

  _renderMinutes() {
    const minutes = this.state.isOnWorkTime
      ? this.state.workMinuteTimer
      : this.state.relaxMinuteTimer;

    const seconds = this.state.isOnWorkTime
      ? this.state.workSecondsTimer
      : this.state.relaxSecondsTimer;

    return (
      <Text style={styles.timerText}>
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </Text>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.timerContainer}>{this._renderMinutes()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  timerContainer: {
    flex: 1,
    width: "100%",
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  timerText: {
    fontSize: 90,
    color: "white",
  },
  actionsContainer: {},
  startButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 200,
    borderColor: "pink",
    borderWidth: 10,
    borderRadius: 100,
  },
  startButtonText: {
    color: "pink",
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default PomodoroTimer;
