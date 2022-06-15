import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import Card from './card';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      letters: [],
      turns: 0,
      match: 0,
      first: {pos: null, val: null},
      second: {pos: null, val: null},
      matchedPos: [],
    };
  }
  componentDidMount() {
    this.randomizePosition();
  }

  randomizePosition = () => {
    this.setState({
      letters: this.shuffleArray(),
    });
  };
  handleMatchPair = () => {
    const {first, second} = this.state;

    if (first.val === second.val) {
      this.setState({
        matchedPos: [...this.state.matchedPos, first.pos, second.pos],
        first: {pos: null, val: null},
        second: {pos: null, val: null},
        match: this.state.match + 1,
        turns: this.state.turns + 1,
      });
    } else {
      this.setState({
        first: {pos: null, val: null},
        second: {pos: null, val: null},
        turns: this.state.turns + 1,
      });
    }

    this.checkForGameOver();
  };

  checkForGameOver = () => {
    if (this.state.match === 8) {
      Alert.alert(
        'Congratulations!!',
        `You have matched all pairs in ${this.state.turns} turns`,
        [{text: 'Okay', onPress: this.handleReset}],
      );
    }
  };

  handleCardPress = (v, k) => {
    if (
      (!this.state.first.val || !this.state.second.val) &&
      this.state.first.pos !== k
    ) {
      if (!this.state.first.val) {
        this.setState({
          first: {pos: k, val: v},
        });
      } else {
        this.setState(
          {
            second: {pos: k, val: v},
          },
          () => {
            setTimeout(() => {
              this.handleMatchPair();
            }, 500);
          },
        );
      }
    }
  };

  shuffleArray = () => {
    let arr = new Array(16).fill(null);
    let alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    for (let i = 0; i < alpha.length; i++) {
      let index = Math.floor(Math.random() * 100) % 15;

      if (arr[index]) {
        for (let j = 0; j < arr.length; j++) {
          if (arr[j] === null) {
            arr[j] = alpha[i];
            break;
          }
        }
      } else {
        arr[index] = alpha[i];
      }
    }

    for (let k = 0; k < alpha.length; k++) {
      for (let l = 0; l < 16; l++) {
        if (!arr[l]) {
          arr[l] = alpha[k];
          break;
        }
      }
    }

    return arr;
  };

  handleReset = () => {
    this.setState({
      matchedPos: [],
      match: 0,
      turns: 0,
      letters: this.shuffleArray(),
      second: {pos: null, val: null},
      first: {pos: null, val: null},
    });
  };

  render() {
    const {letters, turns, match, first, second, matchedPos} = this.state;

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headingText}>Memory Game</Text>
            <View style={styles.score}>
              <View style={styles.match}>
                <Text style={styles.scoreText}>Match: {match}</Text>
              </View>

              <View style={styles.turn}>
                <Text style={styles.scoreText}>Turns: {turns}</Text>
              </View>
            </View>
          </View>

          <View style={styles.board}>
            {letters.map((v, k) => (
              <Card
                isDisable={matchedPos.includes(k)}
                value={v}
                isOpen={first.pos === k || second.pos === k}
                onPress={() => this.handleCardPress(v, k)}
              />
            ))}
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={this.handleReset}>
              <Text style={styles.btnText}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  board: {
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  header: {
    height: 100,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    marginBottom: 12,
  },
  headingText: {
    fontSize: 22,
    fontWeight: '700',
  },
  score: {
    paddingTop: 14,
    flexDirection: 'row',
  },

  match: {
    flex: 1,
  },
  turn: {
    flex: 1,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    height: 100,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  btnStyle: {
    height: 46,
    width: 156,
    backgroundColor: 'purple',
    borderRadius: 10,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default Game;
