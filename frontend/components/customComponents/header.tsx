import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LightDark from '@/components/customComponents/lightDark';

export default function Headerer() {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={{ paddingTop: insets.top }} className="bg-card border-b border-border">
      <View className="flex-row items-center justify-between px-4 py-1">
        <View className="flex-1 justify-center" />
        
        <View className="justify-center">
          <Text className="text-lg font-inter-bold text-foreground">
            PasaBuy
          </Text>
        </View>
        
        <View className="flex-1 items-end justify-center">
          <LightDark />
        </View>
      </View>
    </View>
  );
}