import { View } from "react-native";
import Skeleton from "./skeleton";

export default function InfoCardSkeleton() {
  return (
    <View className="w-full border border-border rounded-lg bg-card">
      <View className="flex-row gap-3 p-6">
        <Skeleton className="w-12 h-12 rounded-full bg-border" />
        
        <View className="flex-1 gap-2">
          <Skeleton className="h-5 w-32 rounded bg-border" />
          <Skeleton className="h-4 w-24 rounded bg-border" />
        </View>
      </View>

      <View className="gap-2 px-6 pb-6">
        <Skeleton className="h-7 w-20 rounded-full bg-border" />
        <Skeleton className="h-5 w-3/4 rounded bg-border" />
        <Skeleton className="h-4 w-full rounded bg-border" />
        <Skeleton className="h-4 w-5/6 rounded bg-border" />
      </View>

      <View className="border-t border-border mx-6" />

      <View className="flex-row justify-between items-center p-6">
        <Skeleton className="h-4 w-20 rounded bg-border" />
        <Skeleton className="h-10 w-24 rounded-lg bg-border" />
      </View>
    </View>
  );
}