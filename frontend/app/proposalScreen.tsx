import { Text, Image, View, Pressable  } from 'react-native';
import { MapPin, Clock } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Post } from '../redux/types/index';
import { useLocalSearchParams } from 'expo-router';
import { useAppSelector } from '@/redux/store';
import { getAvatar } from "@/redux/utils/avatars";
import { useColorScheme } from 'react-native';
import appColors from 'styles/colors';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";

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


  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? appColors.dark : appColors.light;

  if (!post) return null; // don't know about this

  return (
    <SafeAreaView className='flex-1 bg-background p-1'>
      <View className='w-full flex-1 border border-border rounded-md p-4'>
        {/* This is the posts portion of the Screen */}
        <CardHeader className='flex-row gap-3'>
          <Image 
            source={getAvatar(post.creator.avatar_url)}
            className="w-12 h-12 rounded-full"
          />
          <View className='flex-1'>
            <CardTitle className='text-foreground font-inter-semibold text-lg'>
              {post.creator.name}
            </CardTitle>
              <View className="flex-row items-center gap-1 mt-0.5">
                  <MapPin size={14} color={colors['--muted-foreground']} />
                  <Text className="text-muted-foreground font-inter text-sm">
                      {post.location}
                  </Text>
              </View>
          </View>
        </CardHeader>
        
        {/**TODO I need to figure out something with these seeker runner colors? 
         * Should they be in redux? 
         * these are the tags */}
        <CardContent className='gap-2'>
          <View className='bg-green-offer-light self-start px-3 py-1.5 rounded-full'>
            <Text className='text-green-offer text font-inter text-xs'>
              {post.tags}
            </Text>
          </View>

          <CardTitle className='text-foreground font-inter-semibold text-base'>
              {post.title}
          </CardTitle>

          <View>
              <Text className="text-foreground font-inter text-sm leading-5">
                  {post.description}
              </Text>
          </View>
        </CardContent>
        
        {/**Just a line to divide */}
        <View className="border-t border-border mx-6" />

        <CardFooter className="flex-row justify-between items-center">
            <View className="flex-row items-center gap-1.5">
                <Clock size={16} color={colors['--muted-foreground']} />
                <Text className="text-muted-foreground font-inter text-sm">
                    1 hour ago
                </Text>
            </View>
        </CardFooter>

        {/**Just a line to divide */}
        <View className="border-t border-border mx-6" />
        

        {/* This is the proposals portion */}
        <View>

        </View>
        
      </View>
    
    </SafeAreaView>
  )
}