import { Text, View, Pressable, FlatList } from 'react-native';
import { useSession } from '../../authContext';
import InfoCard from '@/components/customComponents/infoCard';

export default function HomeScreen() {
  const { signOut } = useSession();
  
  return (

    <View className="flex-1 bg-background">
    {/* Temporary header / controls, button ti=o switch views will be here later */}
    <View className="items-center justify-center py-6">
      <Text className="text-4xl font-inter-bold text-foreground mb-5">
        Hello World
      </Text>
      <Pressable onPress={signOut}>
        <Text className="text-lg font-inter-semibold text-primary">
          Sign Out
        </Text>
      </Pressable>
    </View>

    {/**This Flatlist is what will help render our infinite scrolling later */}
    <FlatList
      data={[{"id": 1}, {"id2": 2}, {"id3": 3}, {"id4": 4}, {"id5": 5}, {"id6": 6}, {"id7": 7}, {"id8": 8}]}
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