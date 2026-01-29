import { SignInForm } from "@/components/sign-in-form";
import { ScrollView, View, Alert } from "react-native"
import { useState } from "react";
import { useSession } from "@/authContext";
import { useRouter } from "expo-router";

export default function LoginScreen(){

  const {signIn} = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async(email:string, password: string)=>{
    setIsLoading(true);
    const success = await signIn(email, password);

    setIsLoading(false);

    if (success){
      router.replace('/(tabs)')
    } else {
      Alert.alert('Login Failed', 'Invalid email or password');
    }
  }
    return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerClassName="sm:flex-1 items-center justify-center p-4 py-8 sm:py-4 sm:p-6 pt-28"
      keyboardDismissMode="interactive"
    >
      <View className="w-full max-w-sm">
        <SignInForm 
          onSignIn={handleSignIn}
          isLoading={isLoading}
          onSignUpPress={() => router.replace('/signup' as any)}
        />
      </View>
    </ScrollView>
  );
    
}