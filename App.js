import React, { useState } from 'react';
import { StyleSheet, Button, View, FlatList } from 'react-native';
import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';

export default function App() {
  const [courseGoal, setCourseGoal] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = goalTitle => {
    setCourseGoal(currentGoal => [...courseGoal, {
      id: (Math.floor(Math.random() * 1000) + 1).toString(), value: goalTitle
    }]);
    setIsAddMode(false);
  };

  const removeHandler = goalId => {
    setCourseGoal(currentGoals => {
      return currentGoals.filter(Goal => Goal.id !== goalId)
    });
  };

  const goalOnCancelation = () => {
    setIsAddMode(false);
  };

  return (
      <View style={styles.container}>
        <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
        <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} onCancel={goalOnCancelation} />
        <FlatList
            keyExtractor={(item, index) => item.id}
            data={courseGoal}
            renderItem={itemData => <GoalItem onDelete={removeHandler.bind(this, itemData.item.id)} title={itemData.item.value} />}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50
  },
});
