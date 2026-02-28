import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";

export default function App() {
  const [enteredGoal, setEnteredGoal] = useState("");
  const [goals, setGoals] = useState([]);

  const [loaded] = useFonts({
    Poppins: require("./assets/Poppins-Regular.ttf"),
  });

  if (!loaded) return null;

  function inputHandler(text) {
    setEnteredGoal(text);
  }

  function addGoal() {
    if (enteredGoal.trim().length === 0) return;

    setGoals((currentGoals) => [
      ...currentGoals,
      { text: enteredGoal, id: Math.random().toString() },
    ]);

    setEnteredGoal("");
  }

  function deleteGoal(id) {
    setGoals((currentGoals) =>
      currentGoals.filter((goal) => goal.id !== id)
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My To-Do List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter your goal"
          style={styles.input}
          value={enteredGoal}
          onChangeText={inputHandler}
        />
        <TouchableOpacity style={styles.addButton} onPress={addGoal}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <TouchableOpacity onPress={() => deleteGoal(itemData.item.id)}>
            <View style={styles.goalItem}>
              <Text style={styles.goalText}>{itemData.item.text}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#1e1e2f",
  },
  title: {
    fontSize: 30,
    color: "white",
    marginBottom: 20,
    fontFamily: "Poppins",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    width: "75%",
    marginRight: 10,
    padding: 12,
    borderRadius: 10,
  },
  addButton: {
    backgroundColor: "#258ce6",
    paddingHorizontal: 15,
    justifyContent: "center",
    borderRadius: 10,
  },

  addButtonText: {
    color: "white",
    fontFamily: "Poppins",
  },
  goalItem: {
    backgroundColor: "#7b5cff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 12,
  },
  goalText: {
    color: "white",
    fontFamily: "Poppins",
  },
});