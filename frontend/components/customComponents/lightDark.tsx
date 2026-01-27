import {SunMoon} from 'lucide-react-native'
import { Button } from '../ui/button'
import { Appearance } from 'react-native'

// okay color header position light mode dark mode button to the right, 
// TODO change our button component we got from React resubales to use our fonts and colors possibly


export default function LightDark(){
    const handleToggle = () => {
        const current = Appearance.getColorScheme()
        Appearance.setColorScheme(current === 'dark' ? 'light' : 'dark')
    }

    return (
        <Button onPress={handleToggle}>
            {/*Need to see if size will be an issue, Need to remove button border and color, need to add system global colors*/}
            <SunMoon size={30}/>
        </Button>
    )
}