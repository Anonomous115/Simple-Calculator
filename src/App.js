import React from "react";
import "./styles.css";
var minutes = "";
class App extends React.Component {
  state = {
    clicked: false,
    started: false,
    duration: 60 * 25,
    totalTime: 300,
    isSession: true,
    break: 300,
    totalbreakTime: 300
  };

  handleClick = e => {
    if (this.state.isSession) {
      if (this.state.duration >= 0) {
        if (
          e.target.value === "-" &&
          !this.state.started &&
          this.state.duration >= 60
        ) {
          this.setState({
            totalTime: this.state.duration - 60,
            duration: this.state.duration - 60
          });
        } else if (!this.state.started && e.target.value === "+") {
          this.setState({
            totalTime: this.state.duration + 60,
            duration: this.state.duration + 60
          });
        }
      }
    } else if (!this.state.isSession) {
      if (this.state.break >= 1) {
        if (e.target.value === "-" && !this.state.started) {
          this.setState({
            totalbreakTime: this.state.break - 60,
            break: this.state.break - 60
          });
        } else if (!this.state.started && e.target.value === "+") {
          this.setState({
            totalbreakTime: this.state.break + 60,
            break: this.state.break + 60
          });
        }
      }
    }
  };
  toggle = () => {
    if (this.state.isSession) {
      if (this.state.duration >= 0 && this.state.break >= 0) {
        if (!this.state.started) {
          this.setState({
            started: true,

            interval: setInterval(this.intervalSession, 1000),
            stroke:
              1267 *
              (1267 -
                ((this.state.duration / this.state.totalTime) * 100) / 100)
          });
        }
      }
    } else if (!this.state.isSession) {
      if (this.state.break >= 0) {
        if (!this.state.started) {
          this.setState({
            started: true,

            interval: setInterval(this.intervalBreak, 1000),
            stroke:
              1267 *
              (1267 -
                ((this.state.duration / this.state.totalTime) * 100) / 100)
          });
        }
      }
    }

    if (this.state.started) {
      clearInterval(this.state.interval);
      this.setState({
        started: false
      });
    }
    if (!this.state.clicked) {
      this.setState({
        clicked: true,
        totalTime: this.state.duration,
        totalbreakTime: this.state.break
      });
    }
  };
  intervalSession = () => {
    if (this.state.isSession) {
      if (this.state.duration > 0) {
        this.setState({
          duration: this.state.duration - 1
        });
      } else if (this.state.duration <= 0) {
        clearInterval(this.state.interval);
        this.setState({
          isSession: false,
          interval: setInterval(this.intervalBreak, 1000)
        });
      }
    }
  };
  intervalBreak = () => {
    if (this.state.started) {
      if (!this.state.isSession) {
        if (this.state.break >= 0) {
          this.setState({
            break: this.state.break - 1
          });
        }
        if (this.state.break <= 0) {
          clearInterval(this.state.interval);
          this.setState({
            isSession: true,
            interval: setInterval(this.intervalSession, 1000)
          });
        }
        if (this.state.break <= 0) {
          this.setState({
            duration: this.state.totalTime,
            break: this.state.totalbreakTime
          });
        }
      }
    }
  };
  reset = () => {
    clearInterval(this.state.interval);
    this.setState({
      clicked: false,
      started: false,
      duration: 60 * 25,
      totalTime: 60 * 25,
      isSession: true,
      break: 300,
      totalbreakTime: 300
    });
  };
  minPlus = () => {
    if (!this.state.started) {
      this.setState({
        duration: this.state.duration + 60,
        totalTime: this.state.duration + 60
      });
    }
  };
  minMinus = () => {
    if (this.state.duration > 0) {
      if (this.state.duration >= 60 && !this.state.started) {
        this.setState({
          duration: this.state.duration - 60,
          totalTime: this.state.duration - 60
        });
      }
    }
  };
  min = s => {
    var minutes = (Math.floor(s / 60) % 60).toString();
    if (minutes.length > 1) {
      var minutes = Math.floor(s / 60) % 60;
    } else {
      var minutes = "0" + (Math.floor(s / 60) % 60);
    }
    return minutes;
  };
  breakPlus = () => {
    if (!this.state.Started) {
      this.setState({
        break: this.state.break + 60,
        totalbreakTime: this.state.totalbreakTime + 60
      });
    }
  };
  breakMinus = () => {
    if (!this.state.Started && this.state.break > 60) {
      this.setState({
        break: this.state.break - 60,
        totalbreakTime: this.state.totalbreakTime - 60
      });
    }
  };
  sec = s => {
    var minutes = (Math.floor(s / 60) % 60).toString();
    if (minutes.length > 1) {
      var minutes = Math.floor(s / 60) % 60;
    } else {
      var minutes = "0" + (Math.floor(s / 60) % 60);
    }
    return minutes;
  };
  numformatter = (s, b) => {
    if (this.state.isSession) {
      var minutes = (Math.floor(s / 60) % 60).toString();
      var seconds = (s % 60).toString();
      var hours = Math.floor(s / 60 / 60);
      if (seconds.length > 1) {
        var seconds = (s % 60).toString();
      } else {
        seconds = "0" + (s % 60).toString();
      }
      if (minutes.length > 1) {
        var minutes = Math.floor(s / 60) % 60;
      } else if ((minutes.length = 1)) {
        var minutes = "0" + (Math.floor(s / 60) % 60);
      }

      var totaltime = minutes + ":" + seconds;
    }
    if (!this.state.isSession) {
      var hours = Math.floor(b / 60 / 60);
      var minutes = (Math.floor(b / 60) % 60).toString();
      var seconds = (b % 60).toString();
      if (seconds.length > 1) {
        var seconds = (b % 60).toString();
      } else {
        seconds = "0" + (b % 60).toString();
      }
      if (minutes.length > 1) {
        var minutes = Math.floor(b / 60) % 60;
      } else {
        var minutes = "0" + (Math.floor(b / 60) % 60);
      }

      var totaltime = minutes + ":" + seconds;
    }
    if (s <= 0 && b <= 0) {
      var totaltime = "00" + ":" + "00";
    }

    return totaltime;
  };

  render() {
    return (
      <div className="App">
        <div className="timer">
          <div className="timer">
            <svg
              width="500"
              height="600"
              viewport="0 0 300 300"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              style={{ filter: this.props.shadow }}
            >
              <circle
                id="grey-bar"
                r="200"
                cx="250"
                cy="250"
                fill="transparent"
                stroke="silver"
              />
              <circle
                id="bar"
                r="200"
                cx="250"
                cy="250"
                fill="transparent"
                strokeDasharray="1267"
                style={{
                  stroke: "green",
                  strokeDashoffset: this.state.isSession
                    ? 1267 *
                      (1267 -
                        ((this.state.duration / this.state.totalTime) * 100) /
                          100)
                    : 1267 *
                      (1267 -
                        ((this.state.break / this.state.totalbreakTime) * 100) /
                          100)
                }}
              />
            </svg>
            <h1 className="time">
              {this.numformatter(this.state.duration, this.state.break)}
            </h1>
          </div>
          <button value="+" onClick={this.handleClick}>
            +
          </button>
          <button onClick={this.toggle}>
            {this.state.started ? "STOP" : "START"}
          </button>
          <button value="-" onClick={this.handleClick}>
            -
          </button>
          <h1> </h1> <button onClick={this.reset}>reset</button>
        </div>

        <h1 className="minText">Session Length</h1>
        <div className="min-container">
          <p className="min-plus" id="+" onClick={this.minPlus}>
            ←
          </p>
          <div className="session">
            <h1> {this.min(this.state.totalTime)} </h1>
          </div>

          <p className="min-minus" id="-" onClick={this.minMinus}>
            →
          </p>
        </div>
        <div className="breakText">
          <h1>Break Length</h1>
        </div>
        <div className="break">
          <p className="breakPlus" onClick={this.breakPlus}>
            ←
          </p>
          <div className="breaker">
            <h1 className="breakTime"> {this.sec(this.state.break)} </h1>
          </div>
          <p className="breakMinus" onClick={this.breakMinus}>
            →
          </p>
        </div>
      </div>
    );
  }
}
export default App;
