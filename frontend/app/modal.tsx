import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function ModalScreen() {
  return (
    <View className="flex-1 items-center justify-center p-5 bg-[--background]">
      <Text className="text-[--foreground] text-2xl font-bold">This is a modal</Text>
      <Link href="/" dismissTo className="mt-4 py-4">
        <Text className="text-[--primary]">Go to home screen</Text>
      </Link>
    </View>
  );
}