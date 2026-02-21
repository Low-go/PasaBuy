import { View, Text } from 'react-native';
import createPostButton from '@/components/customComponents/createPostButton';
import CreatePostButton from '@/components/customComponents/createPostButton';

export default function NotificationsScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl font-inter-bold">Notifications</Text>
    </View>
  );
}