import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Text, Image } from 'react-native';
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";


export default function InfoCard(){
    // This will be a test, we will not have the own users profile show up in cards obviously

    const user = useSelector((state: RootState) => state.user.user) // user is used twice because one is the slice, the other the object
    
    return(
        <Card className="w-full">
            <CardHeader>
                <Image 
                    source={require('../../images/user.jpg')}
                    className="w-12 h-12 rounded-full"
                    />
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
                <Text>Card Content</Text>
            </CardContent>
            <CardFooter>
                <Text>Card Footer</Text>
            </CardFooter>
        </Card>
    )
}