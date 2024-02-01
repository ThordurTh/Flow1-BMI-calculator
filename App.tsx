import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
  const [weight, onChangeWeight] = React.useState("");
  const [height, onChangeHeight] = React.useState("");

  const handleButton = () => {
    const numericWeight = parseFloat(weight);
    const numericHeight = parseFloat(height);
    const bmi = numericWeight / ((numericHeight / 100) * (numericHeight / 100));
    Alert.alert("Your BMI is: " + Math.floor(bmi));
  };

  return (
    <View style={styles.container}>
      <Text>BMI Calculator</Text>
      <StatusBar style="auto" />
      <View style={styles.input}>
        <Text style={styles.label}>Weight</Text>
        <TextInput
          style={styles.inputField}
          value={weight}
          onChangeText={onChangeWeight}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.input}>
        <Text style={styles.label}>Height</Text>
        <TextInput
          style={styles.inputField}
          value={height}
          onChangeText={onChangeHeight}
          keyboardType="numeric"
        />
      </View>
      <Button title="Calculate" onPress={handleButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 150,
  },
  input: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
  label: {
    fontSize: 24,
    alignSelf: "center",
  },
  inputField: {
    fontSize: 24,
    borderWidth: 1,
    padding: 10,
    width: 70,
  },
});
