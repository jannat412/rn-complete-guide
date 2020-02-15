import React, { useState } from 'react';
import { StyleSheet, Button, View, FlatList } from 'react-native';
import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("datadb.db");

export default function App() {
  const [courseGoal, setCourseGoal] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);
  const [items, setItems] = React.useState(null);

  React.useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
          `select * from items`,
          [],
          (_, { rows: { _array } }) => setItems(_array)
      );
    });
  }, []);

  const addGoalHandler = (name, goalTitle) => {
    // setCourseGoal(currentGoal => [...courseGoal, {
    //   id: (Math.floor(Math.random() * 1000) + 1).toString(), goal: goalTitle
    // }]);
    add((Math.floor(Math.random() * 1000) + 1).toString(),name,goalTitle)
    setIsAddMode(false);
  };

  const add = (id,name,text) => {
    // is text empty?
    if (text === null || text === "") {
      return false;
    }

    db.transaction(
        tx => {
          tx.executeSql("insert into items (id, name, goal) values (?,?,?)", [id,name,text]);
          tx.executeSql(
              `select * from items`,
              [],
              (_, { rows: { _array } }) => setItems(_array)
          );
          tx.executeSql("select * from items", [], (_, { rows }) =>
              console.log(JSON.stringify(rows))
          );
        },
        null
    );
  };

  const removeHandler = goalId => {
    console.log('To be deleted: '+ goalId);
    db.transaction(
        tx => {
          tx.executeSql(`delete from items where id = ?;`, [goalId]);
          tx.executeSql(
              `select * from items`,
              [],
              (_, { rows: { _array } }) => setItems(_array)
          );
          tx.executeSql("select * from items", [], (_, { rows }) =>
              console.log(JSON.stringify(rows))
          );
        },
        null
    )
    // setCourseGoal(currentGoals => {
    //   return currentGoals.filter(Goal => Goal.id !== goalId)
    // });
  };

  const goalOnCancelation = () => {
    setIsAddMode(false);
  };

  return (
      <View style={styles.container}>
        <Button title="Add New" onPress={() => setIsAddMode(true)} />
        <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} onCancel={goalOnCancelation} />
        <FlatList
            keyExtractor={(item, index) => item.id}
            data={items}
            renderItem={itemData => <GoalItem onDelete={removeHandler.bind(this, itemData.item.id)} names = {itemData.item.name} title={itemData.item.goal} />}
        style = {{transform: [{scaleY: -1}]}}/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50
  },
});
