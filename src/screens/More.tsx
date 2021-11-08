import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AuthContext from '../contexts/Auth';

const More: React.FC = () => {

  const { signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <StatusBar style="auto"/>
      <Text style={{ fontSize: 30 }}>Welcome to More!</Text>
      {/* <Text onPress={async () => await signOut()}>Logout</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default More;