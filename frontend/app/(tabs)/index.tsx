import { Text, View, Pressable, FlatList } from 'react-native';
import InfoCard from '@/components/customComponents/infoCard';
import { useEffect, useRef, useState } from 'react';
import RunnerSeekerButton from '@/components/customComponents/runnerSeekerButton';
import { Post } from '../../redux/types/index';
import InfoCardSkeleton from '@/components/customComponents/infoCardSkeleton';
import Header from '@/components/customComponents/header';
import { ActivityIndicator } from 'react-native';
import CreatePostButton from '@/components/customComponents/createPostButton';

//this is simply to test card component functionality while there is no backend configured atm
import mockPosts from '../../Json/mock-info.json';
import { loadLocalRawResource } from 'react-native-svg';
const posts = mockPosts as Post[];

export default function HomeScreen() {
  

  /**
   * Runner and Seeker share a dashboard. Because of that we manage both their
   * displays and pagination together within this component.
   * You will see variables repeated that account for one or the other
   */

  // How we track if we are on Requester or Fufiller view
  const [dashboardView, setDashboardView] = useState<'seeker' | 'runner'>('runner');
  // const filteredPosts = posts.filter(post => post.post_type === dashboardView)

  // State for runner
  const [runnerDisplayedPosts, setRunnerDisplayedPosts] = useState<Post[]>([]);
  const [runnerCurrentPage, setRunnerCurrentDisplay] = useState<number>(1);

  // state for seeker
  const [seekerDisplayedPosts, setSeekerDisplayedPosts] = useState<Post[]>([]);
  const [seekerCurrentPage, setSeekerCurrentDisplay] = useState<number>(1);

  //keeps track of loading state
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  // Based on current view show these posts
  const displayedPosts = dashboardView === 'runner'
  ? runnerDisplayedPosts
  : seekerDisplayedPosts;

  // TODO add state variables that store eachrespective views scroll position

  const flatListRef = useRef<FlatList>(null);

  // Watches view changes
  useEffect(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
  }, [dashboardView]);
  
/**
 * When backend is connected the useEffect and LoadMorePosts function will change.
 * What will happen is that useEffect will make a one time call to fetch the initial
 * batch (first 20 posts for each view) on mount.
 * Then LoadMorePosts will call an API endpoint (or hook) to fetch subsequent batches
 * as the user scrolls. The backend will handle pagination via page/limit parameters.
 * This current setup uses .slice() to simulate pagination while backend is not ready.
 */
  useEffect(() => {
    // Manual couple second load to mimic fetching info backend
    setIsLoading(true);
    setTimeout(()=> {
      const filterRunner = posts.filter(post => post.post_type === 'runner').slice(0,20);
      const filterSeeker = posts.filter(post => post.post_type === 'seeker').slice(0,20);
      
      setRunnerDisplayedPosts(filterRunner);
      setSeekerDisplayedPosts(filterSeeker);
      setIsLoading(false);
    }, 5500);
  }, []);

  const ITEMS_PER_PAGE = 20;

  const LoadPosts = () => {
    if (dashboardView === 'runner') {
      // Calculate indices based on current page
      const startIndex = runnerCurrentPage * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      
      // Filter all runner posts and get the next batch
      const allRunnerPosts = posts.filter(post => post.post_type === 'runner');
      const nextBatch = allRunnerPosts.slice(startIndex, endIndex);
      
      // Only update if there are more posts to load
      if (nextBatch.length > 0) {
        setRunnerDisplayedPosts(prev => [...prev, ...nextBatch]);
        setRunnerCurrentDisplay(runnerCurrentPage + 1);
      }
    } else {
      // Same logic for seeker
      const startIndex = seekerCurrentPage * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      
      const allSeekerPosts = posts.filter(post => post.post_type === 'seeker');
      const nextBatch = allSeekerPosts.slice(startIndex, endIndex);
      
      if (nextBatch.length > 0) {
        setSeekerDisplayedPosts(prev => [...prev, ...nextBatch]);
        setSeekerCurrentDisplay(seekerCurrentPage + 1);
      }
    }
  }
//// ----- End of test stuff, everything in this box will need to be changed when backend is setup------
  
  return (

    <View className="flex-1 bg-background">
      <Header/>
    {/* Temporary header / controls, button ti=o switch views will be here later */}
    <View className="items-center justify-center py-6">
      <RunnerSeekerButton 
        activeView={dashboardView}
        onViewChange={setDashboardView}
      />
    </View>

    {/**This Flatlist is what will help render our infinite scrolling later */}
    <FlatList
      ref={flatListRef}
      data= {displayedPosts}
      renderItem={({ item }) => <InfoCard post={item} activeView={dashboardView}/>}
      keyExtractor={(item) => String(item.id)}
      ListEmptyComponent={
        isLoading ? (
          <View className="gap-4">
            <InfoCardSkeleton/>
            <InfoCardSkeleton/>
            <InfoCardSkeleton/>
            <InfoCardSkeleton/>
          </View>
        ) : null
      }
      onEndReached={LoadPosts}
      onEndReachedThreshold={0} // should trigger when user is 70 percent of the way down
      className="flex-1 bg-background"
      ListFooterComponent={isLoading ? <ActivityIndicator size="large" /> : null} // needs some twiddling
      ListFooterComponentStyle={{ marginTop: 20 }} // is this ok? is this standard? do i not use tailwind?
      contentContainerStyle={{
        flexGrow: 1,
        padding: 6,
        margin: 6,
       
      }}
      ItemSeparatorComponent={() => <View className='h-4'/>}
      />
      <CreatePostButton state={dashboardView}/>
    </View>
  );
}