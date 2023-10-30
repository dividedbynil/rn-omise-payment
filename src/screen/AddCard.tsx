import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import RootView from "../component/RootView";
import { useAppDispatch } from "../store/hooks";
import { addCard } from "../store/cardListReducer";
import {
  AddCardScreenProps,
  CardInput,
  CardResToken,
  ReturnJSON,
} from "../types";
import { omise } from "../util/omise";

export default function AddCard({
  navigation,
}: AddCardScreenProps): JSX.Element {
  const [cardNo, setCardNo] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");

  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  function formatCardNo(cardNoInput: string): void {
    const newCardNoInput: string = cardNoInput
      .replace(/\D/g, "")
      .replace(/(\d{16})\d*/g, "$1")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
    setCardNo(newCardNoInput);
    return;
  }

  function formatExpiryDate(dateInput: string): void {
    const newDateInput: string = dateInput
      .replace(/\//g, "")
      .replace(/(\d{4})\d*/g, "$1")
      .replace(/^(\d{2})(\d+)/, "$1/$2");
    setExpiryDate(newDateInput);
    return;
  }

  function formatCvv(cvvInput: string): void {
    const newCvvInput: string = cvvInput.replace(/(\d{3})\d*/g, "$1");
    setCvv(newCvvInput);
    return;
  }

  async function saveCard(): Promise<void> {
    setIsDisabled(true);
    try {
      const number: string = cardNo.replace(/\D/g, "");
      const month: number = +expiryDate.slice(0, 2);
      const year: number = +expiryDate.slice(3) + 2000;
      const security_code: number = +cvv;

      if (number.length != 16) throw "invalid card number";
      if (month < 1 || month > 12) throw "invalid expiry month";
      if (security_code < 100 || security_code > 999) throw "invalid CVV";

      const json: CardInput = {
        name,
        number,
        expiration_month: month,
        expiration_year: year,
        security_code,
      };

      const returnJson: ReturnJSON = await omise.createToken({ card: json });
      const cardResToken: CardResToken = {
        ...returnJson.card,
        token: returnJson.id,
      };
      dispatch(addCard(cardResToken));
      navigation.goBack();
    } catch (e: any) {
      Alert.alert("Error", e);
      setIsDisabled(false);
    }
  }

  return (
    <RootView>
      <View>
        <Text style={styles.text}>ATM/Debit/Credit Card Number</Text>
        <View style={{ ...styles.row, ...styles.input }}>
          <TextInput
            style={{ flex: 1, ...styles.text }}
            onChangeText={formatCardNo}
            value={cardNo}
            placeholder="0000 0000 0000 0000"
            keyboardType="numeric"
          />

          <Image
            style={styles.visa}
            source={require("../../assets/visa.png")}
          />
          <Image style={styles.logo} source={require("../../assets/ma.png")} />
          <Image style={styles.logo} source={require("../../assets/jcb.png")} />
        </View>
      </View>

      <View style={styles.topSpace}>
        <Text style={styles.text}>Name on Card</Text>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="Ty Lee"
          keyboardType="default"
        />
      </View>

      <View style={{ ...styles.row, ...styles.topSpace }}>
        <View style={{ flex: 1, marginRight: 20 }}>
          <Text style={styles.text}>Expiry date</Text>
          <TextInput
            style={styles.input}
            onChangeText={formatExpiryDate}
            value={expiryDate}
            placeholder="MM/YY"
            keyboardType="numeric"
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.text}>CVV</Text>
          <TextInput
            style={styles.input}
            onChangeText={formatCvv}
            value={cvv}
            keyboardType="numeric"
          />
        </View>
      </View>
      <Image
        resizeMode="contain"
        style={{ ...styles.securePayment, ...styles.topSpace }}
        source={require("../../assets/secure_payment.png")}
      />

      <View style={{ flex: 1 }}></View>

      <TouchableOpacity
        style={styles.button}
        disabled={isDisabled}
        onPress={saveCard}
      >
        {!isDisabled ? (
          <Text style={{ ...styles.text, color: "white" }}>Add Card</Text>
        ) : (
          <ActivityIndicator size="large" color="white" />
        )}
      </TouchableOpacity>
    </RootView>
  );
}

const styles = StyleSheet.create({
  topSpace: {
    marginTop: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    height: 55,
    marginTop: 10,
    padding: 15,
    borderRadius: 5,
    fontWeight: "bold",
    fontSize: 16,
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00e6e6",
    height: 50,
    borderRadius: 25,
  },
  logo: {
    height: 20,
    width: 30,
    marginLeft: 5,
  },
  visa: {
    height: 20,
    width: 50,
    marginLeft: 5,
  },
  securePayment: {
    alignSelf: "center",
    width: 240,
  },
});
