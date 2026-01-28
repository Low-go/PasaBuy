import { Sun, Moon } from 'lucide-react-native'
import { Appearance, useColorScheme } from 'react-native'
import * as Haptics from 'expo-haptics'
import { Pressable } from 'react-native'

// okay color header position light mode dark mode button to the right, 
// TODO change our button component we got from React resubales to use our fonts and colors possibly
// Add haptic feedback

export default function LightDark(){

    const colorScheme = useColorScheme();

    const handleToggle = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        const current = Appearance.getColorScheme()
        Appearance.setColorScheme(current === 'dark' ? 'light' : 'dark')
    }

    return (
        <Pressable onPress={handleToggle} className="p-2 m-2">
            {(colorScheme === 'light') ?
            <Sun size={26} color='#ffffff'/>
            :
            <Moon size={26} color='#ffffff'/>}
        </Pressable>
    )
}