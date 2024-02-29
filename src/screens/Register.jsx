import {
  SafeAreaView,
  View,
  StyleSheet,
  Alert,
  Text,
  TextInput,
  Button,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { FIREBASE_AUTH } from "../helpers/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = ({ navigation }) => {
  const auth = FIREBASE_AUTH;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    // const response = await createUserWithEmailAndPassword(auth, email, password)
    //   .then((response) => {
    //     console.log(response);
    //     Alert.alert("Register Success", `${response.user.email} created`, [
    //       {
    //         text: "Ok",
    //         onPress: () => navigation.navigate("home"),
    //       },
    //     ]);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     if (error.message === "Firebase: Error (auth/email-already-in-use).") {
    //       Alert.alert("Invalid Register", "Email already in use");
    //     } else {
    //       Alert.alert("Invalid Register", error.message);
    //     }
    //   });
    await createUserWithEmailAndPassword(auth, email, password) // sign in user
      .then((response) => response.user.getIdToken()) //call user id token
      .then((token) => AsyncStorage.setItem("token", token)) // store token
      .then(() => {
        Alert.alert("Register Success", `Welcome`, [
          {
            text: "Ok",
            onPress: () => navigation.navigate("home"),
          },
        ]);
      })
      .catch((error) => {
        console.error(error);
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          Alert.alert("Invalid Register", "Email already in use");
        } else {
          Alert.alert("Invalid Register", error.message);
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
      <Button title="Register" color="#fb8500" onPress={handleRegister} />
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
});

export default Register;
