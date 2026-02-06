import { Text, View, Pressable, FlatList } from 'react-native';
import { useSession } from '../../authContext';
import InfoCard from '@/components/customComponents/infoCard';
import { useState } from 'react';
import RunnerSeekerButton from '@/components/customComponents/runnerSeekerButton';
import { Post } from '@/types/post';

//this is simply to test card component functionality while there is no backend configured atm
import mockPosts from '../../Json/mock-info.json';
const posts = mockPosts as Post[];

export default function HomeScreen() {
  const { signOut } = useSession();
  // How we track if we are on Requester or Fufiller view
  const [dashboardView, setDashboardView] = useState<'seeker' | 'runner'>('runner');
  const filteredPosts = posts.filter(post => post.post_type === dashboardView)
  
  return (

    <View className="flex-1 bg-background">
    {/* Temporary header / controls, button ti=o switch views will be here later */}
    <View className="items-center justify-center py-6">
      <Pressable onPress={signOut}>
        <Text className="text-lg font-inter-semibold text-primary">
          Sign Out
        </Text>
      </Pressable>
      <RunnerSeekerButton 
        activeView={dashboardView}
        onViewChange={setDashboardView}
      />
    </View>

    {/**This Flatlist is what will help render our infinite scrolling later */}
    <FlatList
      data= {filteredPosts}
      renderItem={({ item }) => <InfoCard post={item} activeView={dashboardView}/>}
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