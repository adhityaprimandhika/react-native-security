import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./src/screens/Login";
import Home from "./src/screens/Home";
import Register from "./src/screens/Register";
import { Provider } from "react-redux";
import store from "./src/reducers/store";
import Detail from "./src/screens/Detail";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="login"
            component={Login}
            options={{ title: "Login" }}
          />
          <Stack.Screen
            name="home"
            component={Home}
            options={{ title: "Home", headerShown: false }}
          />
          <Stack.Screen
            name="register"
            component={Register}
            options={{ title: "Register" }}
          />
          <Stack.Screen
            name="detail"
            component={Detail}
            options={{ title: "Detail", headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
