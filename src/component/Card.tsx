import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import { omise } from "../util/omise";
import type { CardResToken, Charge, Payment } from "../types";

type CardProps = {
  data: CardResToken;
};
export default function Card({ data }: CardProps): JSX.Element {
  const [isDisable, setIsDisable] = useState<boolean>(false);

  const mm: string = String(data.expiration_month).padStart(2, "0");
  const yy: string = data.expiration_year.toString().slice(-2);
  const expiryDate: string = `${mm}/${yy}`;

  async function pay(): Promise<any> {
    setIsDisable(true);
    try {
      const paymentJson: Payment = {
        description: "Charge for order 9999",
        amount: 9999,
        currency: "THB",
        card: data.token,
      };
      const returnJson: Charge = await omise.charge(paymentJson);
      if (returnJson.paid) Alert.alert("Payment is successful");
      else throw JSON.stringify(returnJson, null, 2);
    } catch (e: any) {
      console.log(e);
      Alert.alert("Payment is failed", e);
    } finally {
      setIsDisable(false);
    }
  }

  return (
    <TouchableOpacity style={styles.card} disabled={isDisable} onPress={pay}>
      <View style={styles.cardContent}>
        <Image style={styles.logo} source={require("../../assets/visa.png")} />

        <View style={{ ...styles.row, marginVertical: 10 }}>
          <Text style={styles.cardDot}>••••</Text>
          <Text style={styles.cardDot}>••••</Text>
          <Text style={styles.cardDot}>••••</Text>
          <Text style={styles.cardNumber}>{data.last_digits}</Text>
        </View>

        <View style={styles.row}>
          <View style={{ flex: 3 }}>
            <Text style={styles.title}>Name on Card</Text>
            <Text style={styles.text}>{data.name}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Expires</Text>
            <Text style={styles.text}>{expiryDate}</Text>
          </View>
        </View>

        <View style={styles.row}></View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    marginBottom: 20,
  },
  cardContent: {
    paddingVertical: 30,
  },
  logo: {
    width: 90,
    height: 27,
    marginTop: 2,
  },
  cardDot: {
    fontSize: 32,
    marginRight: 20,
    color: "grey",
  },
  cardNumber: {
    fontWeight: "bold",
    fontSize: 15,
    color: "grey",
  },
  row: {
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 10,
    color: "grey",
  },
  text: {
    marginTop: 15,
    fontWeight: "bold",
    fontSize: 13,
  },
});
