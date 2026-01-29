import { Text, View, Pressable } from 'react-native';
import { useSession } from '../../authContext';

export default function HomeScreen() {
  const { signOut } = useSession();
  
  return (
    <View className="flex-1 justify-center items-center bg-background">
      <Text className="text-4xl font-inter-bold text-foreground mb-5">
        Hello World
      </Text>
      <Pressable onPress={signOut}>
        <Text className="text-lg font-inter-semibold text-primary mt-5">
          Sign Out
        </Text>
      </Pressable>
    </View>
  );
}