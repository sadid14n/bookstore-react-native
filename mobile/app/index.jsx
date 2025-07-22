import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuthStore } from "./../store/authStore";
import { useEffect } from "react";
import styles from "../assets/styles/home.styles";

export default function Index() {
  const { user, token, checkAuth, logout } = useAuthStore();

  console.log(user, token);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Hello</Text>
      <Text>{user?.username}</Text>
      <Text>{token}</Text>
      <Link href="/(auth)/signup">Signup</Link>
      <Link href="/(auth)">Login</Link>

      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
