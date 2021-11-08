import React, { useContext } from 'react';
import { View, Text } from 'native-base';
import AuthContext from '../contexts/Auth';

const Settings: React.FC = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <View flex={1}>
      <Text fontSize={30}>Welcome to Settings!</Text>
      <Text onPress={async () => await signOut()}>Logout</Text>
    </View>
  );
}

export default Settings;