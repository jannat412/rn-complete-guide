import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal } from 'react-native';

const GoalInput = props => {
  const [enterGoal, setEnteredGoal] = useState('');
  const goalInputHandler = (enterGoal) => {
    setEnteredGoal(enterGoal);
  };
  const addGoalHander = () => {
    props.onAddGoal(enterGoal);
    setEnteredGoal('');
  };
  const goalCancelation = () => {
    props.onCancel();
    setEnteredGoal('');
  }
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Goals"
          style={styles.input}
          onChangeText={goalInputHandler}
          value={enterGoal} />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Cancel" color="red" onPress={goalCancelation} />
          </View>
          <View style={styles.button} >
            <Button title="add" onPress={addGoalHander} />
          </View>
        </View>
      </View>
    </Modal>

  );
}

export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10
  },
  buttonContainer: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    width: '30%'
  }
});