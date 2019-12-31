import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';

const GoalItem = props => {
  const deleteItem = () =>{
    props.onDelete();
    ToastAndroid.show(props.title + ' deleted!', ToastAndroid.SHORT);
  };

  const clickedItem = () =>{
    ToastAndroid.show(props.title + ' clicked!', ToastAndroid.SHORT);
  };
  return (
      <TouchableOpacity activeOpacity = {0.6} onLongPress = {deleteItem} onPress = {clickedItem}>
        <View style = {styles.listItem}>
          <Text>{props.title}</Text>
        </View>
      </TouchableOpacity>
  );
};

export default GoalItem;

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    flexDirection: 'column-reverse',
    marginVertical: 10,
    backgroundColor: '#ccc',
    borderColor: 'blue',
    borderWidth: 1
  }
});