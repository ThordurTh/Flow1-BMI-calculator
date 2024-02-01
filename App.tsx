import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const [weight, onChangeWeight] = React.useState("");
  const [height, onChangeHeight] = React.useState("");
  const [highlightedCategory, setHighlightedCategory] = useState("");

  const handleButton = () => {
    const numericWeight = parseFloat(weight);
    const numericHeight = parseFloat(height);
    const bmi = numericWeight / ((numericHeight / 100) * (numericHeight / 100));
    const bmiCategory = calculateBMICategory(bmi);
    setHighlightedCategory(bmiCategory);
    Alert.alert(`Your BMI is: ${Math.round(bmi * 10) / 10} (${bmiCategory})`);

    onChangeWeight("");
    onChangeHeight("");
    Keyboard.dismiss();
  };

  const calculateBMICategory = (bmi: number): string => {
    if (bmi < 16.0) return "Underweight (Severe thinness)";
    else if (bmi >= 16.0 && bmi <= 16.9)
      return "Underweight (Moderate thinness)";
    else if (bmi >= 17.0 && bmi <= 18.4) return "Underweight (Mild thinness)";
    else if (bmi >= 18.5 && bmi <= 24.9) return "Normal range";
    else if (bmi >= 25.0 && bmi <= 29.9) return "Overweight (Pre-obese)";
    else if (bmi >= 30.0 && bmi <= 34.9) return "Obese (Class I)";
    else if (bmi >= 35.0 && bmi <= 39.9) return "Obese (Class II)";
    else return "Obese (Class III)";
  };
  interface BMICategory {
    category: string;
    bmiRange: string;
  }

  const bmiCategories: BMICategory[] = [
    { category: "Underweight (Severe thinness)", bmiRange: "< 16.0" },
    { category: "Underweight (Moderate thinness)", bmiRange: "16.0 - 16.9" },
    { category: "Underweight (Mild thinness)", bmiRange: "17.0 – 18.4" },
    { category: "Normal range", bmiRange: "18.5 – 24.9" },
    { category: "Overweight (Pre-obese)", bmiRange: "25.0 – 29.9" },
    { category: "Obese (Class I)", bmiRange: "30.0 – 34.9" },
    { category: "Obese (Class II)", bmiRange: "35.0 – 39.9" },
    { category: "Obese (Class III)", bmiRange: "> 40" },
  ];

  const renderItem = ({ item }: { item: BMICategory }) => (
    <View
      style={[
        styles.tableRow,
        highlightedCategory === item.category && styles.highlightedRow,
      ]}
    >
      <Text>{item.category}</Text>
      <Text>{item.bmiRange}</Text>
    </View>
  );

  const isButtonDisabled = weight === "" || height === "";

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.heading}>BMI Calculator</Text>
        <StatusBar style="auto" />
        <View style={styles.input}>
          <Text style={styles.label}>Weight: </Text>
          <TextInput
            style={styles.inputField}
            value={weight}
            onChangeText={onChangeWeight}
            keyboardType="numeric"
          />
          <Text style={styles.label}>kg</Text>
        </View>
        <View style={styles.input}>
          <Text style={styles.label}>Height: </Text>
          <TextInput
            style={styles.inputField}
            value={height}
            onChangeText={onChangeHeight}
            keyboardType="numeric"
          />
          <Text style={styles.label}>cm</Text>
        </View>
        <TouchableOpacity
          onPress={handleButton}
          style={[
            styles.calculateButton,
            isButtonDisabled && styles.buttonDisabled,
          ]}
          disabled={isButtonDisabled}
        >
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>
        <FlatList data={bmiCategories} renderItem={renderItem} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6fffd",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 100,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
  },
  input: {
    flexDirection: "row",
    gap: 5,
    marginTop: 20,
  },
  label: {
    fontSize: 20,
    alignSelf: "center",
  },
  inputField: {
    fontSize: 20,
    borderWidth: 1,
    padding: 5,
    width: 60,
    borderRadius: 10,
    backgroundColor: "#f5fffe",
    borderColor: "#008073",
  },
  calculateButton: {
    elevation: 8,
    backgroundColor: "#42cfc1",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 20,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  highlightedRow: {
    backgroundColor: "#42cfc1",
    color: "#fff",
  },
});
