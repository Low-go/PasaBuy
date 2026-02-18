import { Dialog, 
DialogContent, 
DialogHeader, 
DialogTitle,
DialogDescription } from "../ui/dialog";


export default function CreatePostModal({open, onOpenChange}: {open: boolean, onOpenChange: (open:boolean) => void}){

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>My Modal</DialogTitle>
                    <DialogDescription>Your content here</DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}