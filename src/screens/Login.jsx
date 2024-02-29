import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../helpers/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const auth = FIREBASE_AUTH;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // const response = await signInWithEmailAndPassword(auth, email, password)
    //   .then((response) => {
    //     console.log(response);
    //     Alert.alert("Login Success", `Welcome ${response.user.email}`, [
    //       {
    //         text: "Ok",
    //         onPress: () => navigation.navigate("home")
    //       }
    //     ]);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     if (error.message === "Firebase: Error (auth/invalid-credential).") {
    //       Alert.alert("Invalid Login", "Invalid credential email/password");
    //     } else {
    //       Alert.alert("Invalid Login", error.message);
    //     }
    //   });
    signInWithEmailAndPassword(auth, email, password) // sign in user
      .then((response) => response.user.getIdToken()) //call user id token
      .then((token) => AsyncStorage.setItem("token", token)) // store token
      .then(() => {
        Alert.alert("Login Success", `Welcome`, [
          {
            text: "Ok",
            onPress: () => navigation.navigate("home"),
          },
        ]);
      })
      .catch((error) => {
        console.error(error);
        if (error.message === "Firebase: Error (auth/invalid-credential).") {
          Alert.alert("Invalid Login", "Invalid credential email/password");
        } else {
          Alert.alert("Invalid Login", error.message);
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textLabel}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.textLabel}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <Button title="Login" color="#fb8500" onPress={handleLogin} />
      <View style={styles.horizontal}>
        <Text>Not have account yet?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("register")}>
          <Text style={styles.textRegister}>Register Now</Text>
        </TouchableOpacity>
      </View>
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
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 12,
    width: "80%",
    marginVertical: 8,
  },
  textLabel: {
    alignSelf: "flex-start",
    marginHorizontal: 42,
    fontWeight: "bold",
  },
  textRegister: {
    marginLeft: 6,
    fontWeight: "bold",
    color: "#fb8500",
  },
});

export default Login;
