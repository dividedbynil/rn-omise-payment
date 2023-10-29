import { SafeAreaView, StatusBar, Platform, StyleSheet } from "react-native";

type Props = {
  children: React.ReactNode;
};

export default function RootView(props: Props): JSX.Element {
  return <SafeAreaView style={styles.container}>{props.children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
    padding: 22,
  },
});
