import { Plus } from "lucide-react-native"
import { Pressable, View } from "react-native"

interface createPostButtonProps{
    state: string
}

export default function CreatePostButton(props: createPostButtonProps){


    const buttonColor = props.state === 'seeker'
        ? 'bg-primary'
        : 'bg-green-offer'

    return (
        <Pressable className={`absolute bottom-4 right-6 border-border border rounded-full p-2 ${buttonColor}`}>
            <Plus size={32} color="#ffffff"/>
        </Pressable>

    )
}