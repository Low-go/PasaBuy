import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Text } from 'react-native';
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function InfoCard(){
    // This will be a test, we will not have the own users profile show up in cards obviously

    const user = useSelector((state: RootState) => state.user.user) // user is used twice because one is the slice, the other the object
    return(
        <Card className="w-full">
            <CardHeader>
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