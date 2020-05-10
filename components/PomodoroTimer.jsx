import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";

import { vibrate } from "../utils";
import Header from "./Header";

class PomodoroTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOnWorkTime: true,
      workMinuteTimer: 0,
      workSecondsTimer: 5,
      relaxMinuteTimer: 0,
      relaxSecondsTimer: 2,
    };
  }

  componentDidMount() {
    this._intervalController();
  }

  componentDidUpdate(previousProps, previousState) {
    if (this.state.workMinuteTimer === 0 && this.state.workSecondsTimer === 0) {
      console.log("Hora de descansar");

      this._restartTimer();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  _restartTimer() {
    console.log("Cambio el modo del cronomentro");

    vibrate();
    clearInterval(this.interval);

    this.setState((prevState) => {
      isOnWorkTime: !prevState.isOnWorkTime;
    });

    this._intervalController;
  }

  _intervalController() {
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

/*componentDidMount() {
    
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidUpdate() {
    if (this.state.isOnWorkTime) {
      console.log("Estoy en trabajo");
      this._workTimer();
    } else {
      console.log("Estoy en descansado");
      this._relaxTimer();
    }
  }

  _workTimer() {
    if (!this.state.isTimerActive) {
      this.setState({
        isTimerActive: true,
      });
      this.interval = setInterval(
        () =>
          this.setState((prevState) => ({
            workSecondsTimer: prevState.workSecondsTimer - 1,
          })),
        1000
      );
    } else if (!this.state.isTimerActive && this.state.workSecondsTimer !== 0) {
      clearInterval(this.interval);
    }

    if (this.state.workMinuteTimer === 0 && this.state.workSecondsTimer === 0) {
      vibrate();
      clearInterval(this.interval);
      this.setState({
        isOnWorkTime: false,
      });
    } else if (this.state.workSecondsTimer === 0) {
      this.setState((prevState) => ({
        workMinuteTimer: prevState.workMinuteTimer - 1,
        workSecondsTimer: 59,
      }));
    }
  }

  _relaxTimer() {
    if (this.state.isTimerActive) {
      this.interval = setInterval(
        () =>
          this.setState((prevState) => ({
            relaxSecondsTimer: prevState.relaxSecondsTimer - 1,
          })),
        1000
      );
    } else if (
      !this.state.isTimerActive &&
      this.state.relaxSecondsTimer !== 0
    ) {
      clearInterval(this.interval);
    }

    if (
      this.state.relaxMinuteTimer === 0 &&
      this.state.relaxSecondsTimer === 0
    ) {
      vibrate();
      clearInterval(this.interval);

      this.setState({
        isOnWorkTime: true,
      });
    } else if (this.state.relaxSecondsTimer === 0) {
      this.setState((prevState) => ({
        relaxMinuteTimer: prevState.relaxMinuteTimer - 1,
        relaxSecondsTimer: 59,
      }));
    }
  }*/
