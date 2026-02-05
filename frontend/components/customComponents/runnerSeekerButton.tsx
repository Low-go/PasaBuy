import { Text, Pressable, View } from "react-native";

interface Props{
    activeView: 'seeker' | 'runner';
    onViewChange: (view: 'seeker' | 'runner') => void;
}


export default function RunnerSeekerButton(buttonProps: Props){
    return(
        <View className="w-full flex-row gap-3 px-4">
            <Pressable 
                className="flex-1 border-2 border-border px-4 py-2.5 rounded-lg items-center justify-center" 
                onPress={() => buttonProps.onViewChange('seeker')}
            >
                <Text className="text-foreground font-inter-semibold text-sm sm:text-base md:text-lg text-center">
                ♡ Request Help
                </Text>
            </Pressable>
            <Pressable 
                className="flex-1 border-2 border-border px-4 py-2.5 rounded-lg items-center justify-center"
                onPress={() => buttonProps.onViewChange('runner')}
            >
                <Text className="text-foreground font-inter-semibold text-sm sm:text-base md:text-lg text-center">
                ♡ Offer Help
                </Text>
            </Pressable>
        </View>
    )
}