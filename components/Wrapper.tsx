import { KeyboardAvoidingView, Platform, View, Text } from "react-native";
import React, { ReactNode } from "react";

import { SafeAreaView } from "react-native-safe-area-context";

type WrapperProps = { children: ReactNode };

export default function Wrapper({ children }: WrapperProps) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{ flex: 1 }}>{children}</View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
