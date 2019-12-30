import React, { useState } from 'react';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

import { StyleSheet, View, FlatList, Button } from 'react-native';

export default function App() {

  const [courseGoal, setCourseGoal] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = goalTitle => {
    setCourseGoal(currentGoals => [...courseGoal,
    { id: (Math.floor(Math.random() * 1000) + 1).toString(), value: goalTitle }
    ]);
    setIsAddMode(false);
  };

  const removeHandler = goalId => {
    setCourseGoal(currentGoals => {
      return currentGoals.filter(Goal => Goal.id !== goalId)
    });
  };

  const GoalOnCancelation = () => {
    setIsAddMode(false);
  };

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
      <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} onCancel={GoalOnCancelation} />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoal}
        renderItem={itemData => <GoalItem onDelete={removeHandler.bind(this, itemData.item.id)} title={itemData.item.value} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
});