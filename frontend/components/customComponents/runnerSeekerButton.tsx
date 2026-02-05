import { Text, Pressable, View } from "react-native";

interface Props{
    activeView: 'seeker' | 'runner';
    onViewChange: (view: 'seeker' | 'runner') => void;
}


export default function RunnerSeekerButton(buttonProps: Props){
    return(
        <View className="w-full flex-row gap-3 px-4">
            <Pressable 
                className={`flex-1 px-4 py-2.5 rounded-lg items-center justify-center
                    ${
                        buttonProps.activeView === 'seeker'
                        ? 'bg-primary border-2 border-primary'
                        : 'border-2 border-border bg-card'                  
                    }`} 
                onPress={() => buttonProps.onViewChange('seeker')}
            >
                <Text className={`font-inter-semibold text-sm sm:text-base md:text-lg ${
                    buttonProps.activeView === 'seeker' 
                    ? 'text-primary-foreground' 
                    : 'text-foreground'
                }`}>
                    ♡ Request Help
                </Text>
            </Pressable>
                        <Pressable 
                className={`flex-1 px-4 py-2.5 rounded-lg items-center justify-center
                    ${
                        buttonProps.activeView === 'runner'
                        ? 'bg-green-offer border-2 border-green-offer'
                        : 'border-2 border-border bg-card'                  
                    }`} 
                onPress={() => buttonProps.onViewChange('runner')}
            >
                <Text className={`font-inter-semibold text-sm sm:text-base md:text-lg ${
                    buttonProps.activeView === 'runner' 
                    ? 'text-primary-foreground' 
                    : 'text-foreground'
                }`}>
                    ♡ Offer Help
                </Text>
            </Pressable>
        </View>
    )
}