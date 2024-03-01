import { Button, SafeAreaView, StyleSheet, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";

const Detail = ({ navigation }) => {
  const count = useSelector((state) => state.counter.count);
  const globalStyle = useSelector((state) => state.style.globalStyle);
  const anime = useSelector((state) => state.anime);
  const dispatch = useDispatch();
  console.log(anime);
  return (
    <SafeAreaView style={globalStyle.container}>
      <Text style={styles.textCount}>Count : {count}</Text>
      <Button
        title="Back to Home"
        color="#168aad"
        onPress={() => navigation.navigate("home")}
      ></Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textCount: {
    textAlign: "center",
    fontSize: 24,
    padding: 16,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 8,
  },
});

export default Detail;
