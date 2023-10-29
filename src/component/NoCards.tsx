import { StyleSheet, Text, View, Image, Button } from "react-native";
import type { CardListScreenProps } from "../types";

export default function NoCards({
  navigation,
}: CardListScreenProps): JSX.Element {
  return (
    <View style={styles.container}>
      <Image
        style={styles.card}
        source={require("../../assets/credit_card_back.png")}
      />
      <Text style={styles.header}>No Cards Found</Text>
      <Text style={styles.text}>We recommend adding a card</Text>
      <Text style={styles.text}>for easy payment</Text>

      <View style={styles.button}>
        <Button
          title="Add New Card"
          onPress={() => navigation.push("AddCard")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 17,
    margin: 20,
  },
  text: {
    fontSize: 16,
  },
  card: {
    height: 40,
    width: 60,
  },
  button: {
    margin: 10,
  },
});
