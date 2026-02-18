import React, {useState} from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Text, Image, View, Pressable } from 'react-native';
import { MapPin, Clock } from 'lucide-react-native'
import { useColorScheme } from 'react-native';
import appColors from 'styles/colors';
import { Post } from '../../redux/types/index';
import { ChevronDown } from "lucide-react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate } from 'react-native-reanimated';
import { getAvatar } from "@/redux/utils/avatars";

interface infoCardProps{
    post: Post;
    activeView: 'seeker' | 'runner';
}

export default function InfoCard({ post, activeView }: infoCardProps){
 
    const [expanded, setExpanded] = useState(false);
    const rotation = useSharedValue(0);
    const maxHeight = useSharedValue(40);
    const  CHAR_LIMIT = 100;
    const isLong = post.description.length > CHAR_LIMIT;

    // Animation for expand/ show more
    const chevronStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${interpolate(rotation.value, [0, 1], [0, 180])}deg` }]
    }));

    const textContainerStyle = useAnimatedStyle(() => ({
        overflow: 'hidden',
        maxHeight: withTiming(maxHeight.value, { duration: 320 }),
    }));

    const handleToggle = () => {
        const nextExpanded = !expanded;
        maxHeight.value = nextExpanded ? 400 : 40;
        rotation.value = withTiming(nextExpanded ? 1 : 0, { duration: 200 });
        setExpanded(nextExpanded);
    };

    // Note to self need to make a hook for these things later so I don't repeat this for every icon in a component
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'dark' ? appColors.dark : appColors.light;

    const tagBgColor = post.post_type === 'seeker'
    ? 'bg-primary-light'
    : 'bg-green-offer-light'

    const tagTextColor = post.post_type === 'seeker'
    ? 'text-primary-text'  
    : 'text-green-offer-text';

    const buttonColor = post.post_type === 'seeker'
    ? 'bg-primary'
    : 'bg-green-offer'

    // current date in milliseconds, versus date posted in millisecond
    const calculateDate = () => {
        
        const MINUTE = 60;
        const HOUR = 60 * MINUTE;
        const DAY = 24 * HOUR;            
        const WEEK = 7 * DAY;              
        const MONTH = 30 * DAY;          
        const YEAR = 365 * DAY;            

        const thresholds = [
            { max: MINUTE, divisor: 1, unit: 'second', plural: 'seconds' },
            { max: HOUR, divisor: MINUTE, unit: 'minute', plural: 'minutes' },
            { max: DAY, divisor: HOUR, unit: 'hour', plural: 'hours' },
            { max: WEEK, divisor: DAY, unit: 'day', plural: 'days' },
            { max: MONTH, divisor: WEEK, unit: 'week', plural: 'weeks' },
            { max: YEAR, divisor: MONTH, unit: 'month', plural: 'months' },
            { max: Infinity, divisor: YEAR, unit: 'year', plural: 'years' }
        ];

        // time in seconds
        const seconds = (new Date().getTime() -  Date.parse(post.created_at)) / 1000

        for (const threshold of thresholds) {
            if (seconds < threshold.max) {
                const value = Math.floor(seconds / threshold.divisor);
                return `${value} ${value === 1 ? threshold.unit : threshold.plural} ago`;
            }
        }


    }

    // Todo move out hardcoded values and let them be passed in via the data props
    
    return(
        <Card className="w-full">
            <CardHeader className="flex-row gap-3">
                <Image 
                    // hardcoded for now
                    source={getAvatar(post.creator.avatar_url)}
                    className="w-12 h-12 rounded-full"
                />
                <View className="flex-1">
                    <CardTitle className="text-foreground font-inter-semibold text-lg">
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

            {/**This is the tags, I still need to decide
             * its possible I might move tags to their own components 
             * and maybe make a list of premade tags? 
             */}
            <CardContent className="gap-2">
                <View className={`${tagBgColor} self-start px-3 py-1.5 rounded-full`}>
                    <Text className={`${tagTextColor} font-inter text-xs`}>
                        {post.tags}
                    </Text>
                </View>
                
                <CardTitle className="text-foreground font-inter-semibold text-base">
                    {post.title}
                </CardTitle>
                
                {/* <Text className="text-foreground font-inter text-sm leading-5">
                    {cardInfo.post.description}
                </Text> */}
                <View>
                    <Animated.View style={textContainerStyle}>
                        <Text className="text-foreground font-inter text-sm leading-5">
                            {post.description}
                        </Text>
                    </Animated.View>
                    {isLong && (
                        <Pressable
                            onPress={handleToggle}
                            className="flex-row items-center gap-1 mt-1"
                        >
                            <Text className="text-muted-foreground font-inter text-xs">
                                {expanded ? 'show less' : 'show more'}
                            </Text>
                            <Animated.View style={chevronStyle}>
                                <ChevronDown size={14} color={colors['--muted-foreground']} />
                            </Animated.View>
                        </Pressable>
                    )}
                </View>
            </CardContent>
            
            {/**Just a line to divide */}
            <View className="border-t border-border mx-6" />
            
            {/**TODO make some function that gets the created at and calulates it based off current time */}
            <CardFooter className="flex-row justify-between items-center">
                <View className="flex-row items-center gap-1.5">
                    <Clock size={16} color={colors['--muted-foreground']} />
                    <Text className="text-muted-foreground font-inter text-sm">
                        {calculateDate()}
                    </Text>
                </View>
                
                <Pressable className= {`${buttonColor} px-6 py-2.5 rounded-lg active:opacity-80`}>
                    <Text className="text-primary-foreground font-inter-semibold to text-sm">
                        Connect
                    </Text>
                </Pressable>
            </CardFooter>
        </Card>
    )
}