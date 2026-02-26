import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Post } from '../redux/types/index';
import { useLocalSearchParams } from 'expo-router';
import { useAppSelector } from '@/redux/store';


export default function ProposalScreen() {

  /**
   * Grabs the id from the url
   * transforms from string to number
   * looks inside redux store and pulls post wth 
   * associated id
   */
  const { id } = useLocalSearchParams();
  const numericId = Number(id);
  const post = useAppSelector(state => 
    state.post.runnerPosts.find(p => p.id === numericId) ?? 
    state.post.seekerPosts.find(p => p.id === numericId)
  );

  

  // test

  console.log('param id:', id);
  console.log('post found:', post);



  return (
    <SafeAreaView className='flex-1 bg-background'>
      
        <Text> {post?.title}</Text>
        <Text>test</Text>
    
    </SafeAreaView>
  )
}