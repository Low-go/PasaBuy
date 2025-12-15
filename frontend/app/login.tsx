import { SignInForm } from "@/components/sign-in-form";
import { ScrollView, View } from "react-native"
import { useState } from "react";
import { useSession } from "@/authContext";


const MOCK_USER = {
    email: "test@example.com",
    password: "password123"
};

export default function LoginScreen(){

  const {signIn} = useSession();
  // note to self not sure if i need a use router here, i think only in the child coomponent

    return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerClassName="sm:flex-1 items-center justify-center p-4 py-8 sm:py-4 sm:p-6"
      keyboardDismissMode="interactive"
    >
      <View className="w-full max-w-sm">
        <SignInForm onSignIn={signIn}/>
      </View>
    </ScrollView>
  );
    
}