import {
  Text,
  SafeAreaView,
  StyleSheet,
  Button,
  FlatList,
  Image,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const Home = ({ navigation }) => {
  const [anime, setAnime] = useState([]);
  useEffect(() => {
    AsyncStorage.getItem("token") // check token existed
      .then((token) => {
        if (token !== null) {
          // if token exist
          return fetch("https://api.jikan.moe/v4/top/anime");
        }
        return Promise.reject("Not Authorized"); // if token not exist
      })
      .then((response) => response.json()) // convert to json
      .then(({ data }) => setAnime(data));
  });
  const handleLogout = () => {
    AsyncStorage.removeItem("token").then((token) => {
      navigation.navigate("login");
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ textAlign: "center" }}>Welcome Home</Text>
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
      )}
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
  },
  horizontal: {
    flexDirection: "row",
    marginBottom: 16,
    paddingLeft: 16,
  },
  textTitle: {
    marginLeft: 8,
    flex: 1,
  },
});

export default Home;
