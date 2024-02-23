import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import AuthContextProvider from "../providers/AuthContext";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="index" options={{ title: "Home" }} />
        </Stack>
      </QueryClientProvider>
    </AuthContextProvider>
  );
}
