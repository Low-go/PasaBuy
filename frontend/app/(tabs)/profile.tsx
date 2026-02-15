import { View, Text } from 'react-native';
import { useSession } from '../../authContext';
import { Pressable } from 'react-native';

export default function ProfileScreen() {

  const { signOut } = useSession();

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl font-inter-bold">Profile</Text>
      <Pressable onPress={signOut}>
        <Text className="text-lg font-inter-semibold text-primary">
          Sign Out
        </Text>
      </Pressable>
    </View>
  );
}