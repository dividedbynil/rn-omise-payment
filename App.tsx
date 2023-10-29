import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CardList from "./src/screen/CardList";
import AddCard from "./src/screen/AddCard";
import { Text, TouchableOpacity } from "react-native";
import type { RootStackParamList } from "./src/types";
import { Provider } from "react-redux";
import { store } from "./src/store";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Cards">
          <Stack.Screen
            name="Cards"
            component={CardList}
            options={({ navigation }) => ({
              headerTitleAlign: "center",
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.push("AddCard")}>
                  <Text style={{ fontSize: 30 }}>+</Text>
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="AddCard"
            component={AddCard}
            options={{
              headerTitleAlign: "center",
              title: "",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </Provider>
  );
}
