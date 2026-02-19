import { View, Text, KeyboardAvoidingView } from "react-native";
import { Dialog, 
DialogContent, 
DialogHeader, 
DialogTitle,
DialogDescription, 
DialogClose,
DialogFooter} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";


export default function CreatePostModal({open,  dashboardState, onOpenChange}: {open: boolean,dashboardState: 'seeker' | 'runner' , onOpenChange: (open:boolean) => void}){

    const buttonColor = dashboardState === 'seeker' 
        ? 'bg-primary'
        : 'bg-green-offer'


    return (
        <Dialog open={open} onOpenChange={onOpenChange} className="">
            <DialogContent className="w-11/12 max-w-lg p-6">
                <DialogHeader>
                    {dashboardState === 'seeker' 
                        ? <DialogTitle className="font-inter-semibold text-foreground">Make a Request</DialogTitle> 
                        : <DialogTitle className="font-inter-semibold text-foreground">Offer Some Help</DialogTitle>}
                    {/* <DialogDescription className="font-inter">fdfffffffffffffffff</DialogDescription> */}
                </DialogHeader>
                <View className="min-w-80">
                    <Label className="font-inter">Title</Label>
                    <Input className ="font-inter" placeholder="Post Title"/>
                </View>
                <View className="min-w-80">
                    <Label className="font-inter">Description</Label>
                    <Input multiline numberOfLines={5} textAlignVertical="top" className="h-28 font=inter" placeholder="Describe your Request"/>
                </View>
                <DialogFooter className="flex-row justify-end">
                    <DialogClose asChild>
                        <Button variant="outline">
                            <Text className="font-inter text-foreground">Cancel</Text>
                        </Button>
                    </DialogClose>
                    <Button className={`${buttonColor}`}>
                        <Text className="text-foreground font-inter text-primary-foreground">Save changes</Text>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}