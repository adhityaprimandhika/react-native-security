import {
  Text,
  SafeAreaView,
  StyleSheet,
  Button,
  FlatList,
  Image,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "../reducers/counter";
import axios from "axios";
import { getAnime } from "../reducers/anime";

const Home = ({ navigation }) => {
  // const [anime, setAnime] = useState([]);
  // useEffect(() => {
  //   AsyncStorage.getItem("token") // check token existed
  //     .then((token) => {
  //       if (token !== null) {
  //         // if token exist
  //         return fetch("https://api.jikan.moe/v4/top/anime");
  //       }
  //       return Promise.reject("Not Authorized"); // if token not exist
  //     })
  //     .then((response) => response.json()) // convert to json
  //     .then(({ data }) => setAnime(data));
  // });
  const count = useSelector((state) => state.counter.count);
  const globalStyle = useSelector((state) => state.style.globalStyle);
  const authState = useSelector((state) => state.auth);
  const animeState = useSelector((state) => state.anime);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAnime());
  }, [dispatch]);

  const handleLogout = () => {
    AsyncStorage.removeItem("token").then((token) => {
      navigation.navigate("login");
    });
  };

  return (
    <SafeAreaView style={globalStyle.container}>
      {/* <Text style={{ textAlign: "center" }}>Welcome Home</Text>
      {anime && (
        <FlatList
          data={anime}
          renderItem={({ item }) => (
            <View style={styles.horizontal}>
              <Image
                style={styles.image}
                source={{
                  uri: item.images.jpg.image_url,
                }}
              />
              <Text style={styles.textTitle}>{item.title}</Text>
            </View>
          )}
        />
      )} */}
      {/* <Text style={styles.textCount}>Counter: {count}</Text>
      <Button
        title={"Increment"}
        onPress={() => dispatch(counterActions.increment())}
      />
      <Button
        title={"Decrement"}
        color="#ef233c"
        onPress={() => dispatch(counterActions.decrement())}
      /> */}

      {animeState.loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={animeState.data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("detail", {
                  id: item.mal_id,
                });
              }}
            >
              <View style={styles.horizontal}>
                <Image
                  style={styles.image}
                  source={{
                    uri: item.images.jpg.image_url,
                  }}
                />
                <View style={styles.vertical}>
                  <Text style={styles.textTitle}>{item.title}</Text>
                  <Text style={styles.textYear}>{item.year}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
      {/* <Button
        title="Go to Detail"
        color="#168aad"
        onPress={() => navigation.navigate("detail")}
      /> */}
      <Button title="Logout" color="#fb8500" onPress={handleLogout} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: 80,
    height: 100,
    borderRadius: 8,
  },
  vertical: {
    flexDirection: "column",
    flex: 1,
  },
  horizontal: {
    flexDirection: "row",
    marginBottom: 16,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  textTitle: {
    paddingHorizontal: 8,
    flex: 1,
    paddingTop: 8,
  },
  textYear: {
    paddingHorizontal: 8,
    flex: 1,
    marginTop: 16,
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

export default Home;
