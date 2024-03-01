import {
  Button,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getAnimeById } from "../reducers/anime";
import { useEffect } from "react";

const Detail = ({ navigation, route }) => {
  const count = useSelector((state) => state.counter.count);
  const globalStyle = useSelector((state) => state.style.globalStyle);
  const id = route.params.id;
  const animeState = useSelector((state) => state.anime);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAnimeById(id));
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.textCount}>Count : {count}</Text> */}
      {/* <Text>{`Id: ${id}`}</Text> */}
      {animeState.loading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.container}>
          <View style={styles.horizontal}>
            <Image
              style={styles.image}
              source={{
                uri: animeState.detail.images.jpg.image_url,
              }}
            />
            <Text style={styles.textTitle}>{animeState.detail.title}</Text>
          </View>
          <Text style={styles.textTitleSynopsis}>Synopsis</Text>
          <Text style={styles.textSynopsis}>{animeState.detail.synopsis}</Text>
        </View>
      )}

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
    padding: 16,
    backgroundColor: "#fff",
  },
  textCount: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 24,
    padding: 16,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 8,
  },
  image: {
    width: 180,
    height: 250,
    borderRadius: 8,
  },
  horizontal: {
    flexDirection: "row",
    marginBottom: 16,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  textTitle: {
    paddingHorizontal: 16,
    flex: 1,
    paddingTop: 8,
    fontWeight: "bold",
    fontSize: 24,
  },
  textSynopsis: {
    paddingHorizontal: 16,
    flex: 1,
    paddingTop: 8,
    textAlign: "justify",
  },
  textTitleSynopsis: {
    paddingHorizontal: 16,
    fontWeight: "bold",
    fontSize: 24,
  },
});

export default Detail;
