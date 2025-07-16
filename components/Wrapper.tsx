import { KeyboardAvoidingView, Platform, View, Text } from "react-native";
import React, { ReactNode } from "react";

type WrapperProps = {
  children: ReactNode;
};

export default function Wrapper({ children }: WrapperProps) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ flex: 1 }}>{children}</View>
    </KeyboardAvoidingView>
  );
}
