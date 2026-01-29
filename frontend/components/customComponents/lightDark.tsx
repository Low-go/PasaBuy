import { Sun, Moon } from 'lucide-react-native';
import { Platform, Appearance, useColorScheme } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Pressable } from 'react-native';

// okay color header position light mode dark mode button to the right, 
// TODO change our button component we got from React resubales to use our fonts and colors possibly
// Add haptic feedback

export default function LightDark(){

    const colorScheme = useColorScheme();

    const handleToggle = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        // web not changing colors, look into it later
        if (Platform.OS === 'web') {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark')
            } 
            else {
                document.documentElement.classList.add('dark')
            }
        }
        else{
            const current = Appearance.getColorScheme();
            Appearance.setColorScheme(current === 'dark' ? 'light' : 'dark');
        }
    }

    return (
        <Pressable onPress={handleToggle} className="p-2 m-2">
            {(colorScheme === 'light') ?
            <Sun size={26} color='#6b7280'/>
            :
            <Moon size={26} color='#ffffff'/>}
        </Pressable>
    )
}