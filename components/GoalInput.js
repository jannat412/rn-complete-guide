import React, {useState} from 'react';
import {StyleSheet, Button, View, TextInput, Modal, ToastAndroid} from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("datadb.db");
const GoalInput = props => {
  const [enterName, setEnterName] = useState('');
  const [enterGoal, setEnterGoal] = useState('');

  React.useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
          "create table if not exists items (id text primary key, name text, goal text);"
      );
      console.log('create databse success.')
    });
  }, [])

  const nameInputHandler = (enterName) =>{
    setEnterName(enterName);
  };
  const goalInputHandler = (enterGoal) =>{
    setEnterGoal(enterGoal);
  };
  const addGoalHandler = () =>{
    props.onAddGoal(enterName,enterGoal);
    setEnterGoal('');
    setEnterName('');
  };

  const goalCancalation = () =>{
    props.onCancel();
    setEnterGoal('');
    setEnterName('');
  }

  const CheckTextInput = () => {
    if (enterGoal != '' && enterName != '') {
      addGoalHandler();
      ToastAndroid.show(enterGoal+ ' added!', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Please Enter Name & Goals!', ToastAndroid.SHORT);
    }
  };

  return(
      <Modal visible = {props.visible} animationType = "slide">
        <View style = {styles.inputContainer}>
          <TextInput
              placeholder = "Enter your name"
              style = {styles.input}
              onChangeText ={ nameInputHandler }
              value = {enterName}/>
          <TextInput
              placeholder = "Enter your goal"
              style = {styles.input}
              onChangeText ={ goalInputHandler }
              value = {enterGoal}/>
          <View style = {styles.buttonContainer}>
            <View style = {styles.button}>
              <Button title = "Cancel" color = "red" onPress = {goalCancalation}/>
            </View>
            <View style = {styles.button}>
              <Button title = "Add" color = "blue" onPress = {CheckTextInput}/>
            </View>
          </View>
        </View>
      </Modal>
  );
}

export default GoalInput;

const styles = StyleSheet.create({
  inputContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input:{
    width: '80%',
    borderColor: 'blue',
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

