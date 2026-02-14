import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Text, Image, View, Pressable } from 'react-native';
import { MapPin, Clock } from 'lucide-react-native'
import { useColorScheme } from 'react-native';
import appColors from 'styles/colors';
import { Post } from "@/types/post";

interface infoCardProps{
    post: Post;
    activeView: 'seeker' | 'runner';
}

export default function InfoCard(cardInfo: infoCardProps){

    // Note to self need to make a hook for these things later so I don't repeat this for every icon in a component
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'dark' ? appColors.dark : appColors.light;

    const tagBgColor = cardInfo.post.post_type === 'seeker'
    ? 'bg-primary-light'
    : 'bg-green-offer-light'

    const tagTextColor = cardInfo.post.post_type === 'seeker'
    ? 'text-primary-text'  
    : 'text-green-offer-text';

    const buttonColor = cardInfo.post.post_type === 'seeker'
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
        const seconds = (new Date().getTime() -  Date.parse(cardInfo.post.created_at)) / 1000

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
                    source={require('../../assets/images/bunny.jpg')}
                    className="w-12 h-12 rounded-full"
                />
                <View className="flex-1">
                    <CardTitle className="text-foreground font-inter-semibold text-lg">
                        {cardInfo.post.creator.name}
                    </CardTitle>
                    <View className="flex-row items-center gap-1 mt-0.5">
                        <MapPin size={14} color={colors['--muted-foreground']} />
                        <Text className="text-muted-foreground font-inter text-sm">
                            {cardInfo.post.location}
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
                        {cardInfo.post.tags}
                    </Text>
                </View>
                
                <CardTitle className="text-foreground font-inter-semibold text-base">
                    {cardInfo.post.title}
                </CardTitle>
                
                <Text className="text-foreground font-inter text-sm leading-5">
                    {cardInfo.post.description}
                </Text>
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
                    <Text className="text-primary-foreground font-inter-semibold text-sm">
                        Connect
                    </Text>
                </Pressable>
            </CardFooter>
        </Card>
    )
}