import { Button, StyleSheet } from "react-native";

export default function CustomButton({ children: description, action }) {
  return <Button style={styles.button} title={description} onPress={action} />;
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 5,
  },
});
