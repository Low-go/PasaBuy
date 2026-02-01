import { Text, View, Pressable, FlatList } from 'react-native';
import { useSession } from '../../authContext';
import InfoCard from '@/components/customComponents/infoCard';
import { useState } from 'react';

export default function HomeScreen() {
  const { signOut } = useSession();
  // How we track if we are on Requester or Fufiller view
  const [dashboardView, setDashboardView] = useState<'seeker' | 'runner'>('runner');
  
  return (

    <View className="flex-1 bg-background">
    {/* Temporary header / controls, button ti=o switch views will be here later */}
    <View className="items-center justify-center py-6">
      <Pressable onPress={signOut}>
        <Text className="text-lg font-inter-semibold text-primary">
          Sign Out
        </Text>
      </Pressable>
    </View>

    {/**This Flatlist is what will help render our infinite scrolling later */}
    <FlatList
      data={[{"id": 1}, {"id": 2}, {"id": 3}, {"id": 4}, {"id": 5}, {"id": 6}, {"id": 7}, {"id": 8}]}
      renderItem={({ item }) => <InfoCard />}
      keyExtractor={(item) => String(item.id)}
      className="flex-1 bg-background"
      contentContainerStyle={{
        flexGrow: 1,
        padding: 6,
        margin: 6,
       
      }}
      ItemSeparatorComponent={() => <View className='h-4'/>}
      />
    </View>
  );
}