import { Plus } from "lucide-react-native";
import { Pressable, View } from "react-native";
import CreatePostModal from "./createPostModal";
import { useState } from "react";

interface createPostButtonProps{
    state: string
}

export default function CreatePostButton(props: createPostButtonProps){

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const buttonColor = props.state === 'seeker'
        ? 'bg-primary'
        : 'bg-green-offer'

    return (
        <>
            <Pressable className={`absolute bottom-4 right-6 border-border border rounded-full p-2 ${buttonColor}`} onPress={()=> setIsOpen(true)}>
                <Plus size={32} color="#ffffff"/>
            </Pressable>

            <CreatePostModal open={isOpen} onOpenChange={setIsOpen}/>
        </>
    )
}