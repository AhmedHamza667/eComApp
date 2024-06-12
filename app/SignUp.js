import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../components/formInput";
import { Ionicons } from '@expo/vector-icons';

import {
  Alert,
  Button,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const formSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    firstName: z.string().min(3, "First name must be at least 3 characters"),
    lastName: z.string().min(3, "Last name must be at least 3 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string()
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
  const { control, handleSubmit, formState, setFocus, register } = useForm({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(formSchema),
  });
  const { isValid, isDirty, dirtyFields, errors } = formState;
  const onSubmit = (data) => {
    router.push('/HomePage')
  };
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior="height"
        style={styles.container}
        keyboardVerticalOffset={60}
      >
        <Text style={styles.header}>Enter your details</Text>

        <Text style={styles.text}>First Name</Text>
        <FormInput
          control={control}
          name={"firstName"}
          placeholder="First Name"
          returnKeyType="next"
          onSubmitEditing={() => setFocus('lastName')} 
        />
        {errors.firstName && <Text style={styles.errorText}>{errors.firstName.message}</Text>}

        <Text style={styles.text}>Last Name</Text>
        <FormInput
          control={control}
          name={"lastName"}
          placeholder="Last Name"
          returnKeyType="next"
          onSubmitEditing={() => setFocus('email')} 
        />
        {errors.lastName && <Text style={styles.errorText}>{errors.lastName.message}</Text>}

        <Text style={styles.text}>Enter Email</Text>
        <FormInput 
          control={control} 
          name={"email"} 
          placeholder="Email" 
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() => setFocus('password')} 
        />
        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

        <Text style={styles.text}>Password</Text>
        <View style={styles.inputContainer}>
          <FormInput
            control={control}
            name={"password"}
            placeholder="Password"
            secureTextEntry={!showPassword}
            returnKeyType="next"
            keyboardType="default"
            style={styles.input}
            onSubmitEditing={() => setFocus('confirmPassword')} 
          />
          <Ionicons
            name={showPassword ? 'eye' : 'eye-off'}
            size={24}
            color="black"
            onPress={() => setShowPassword(!showPassword)}
            style={styles.icon}
          />
        </View>
        {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

        <Text style={styles.text}>Confirm Password</Text>
        <View style={styles.inputContainer}>
          <FormInput
            control={control}
            name={"confirmPassword"}
            placeholder="Confirm Password"
            secureTextEntry
            returnKeyType="done"
            keyboardType="default"
            style={styles.input}
            onSubmitEditing={handleSubmit(onSubmit)} 
          />
          <Ionicons
            name={showPassword ? 'eye' : 'eye-off'}
            size={24}
            color="black"
            onPress={() => setShowPassword(!showPassword)}
            style={styles.icon}
          />
        </View>
        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}

        <View style={styles.spacer}></View>

        <TouchableOpacity
          style={[styles.submitBtn, !isValid ? styles.disabled : null]}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.submitBtnText}>SignUp</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: Dimensions.get("window").width >= 393 ? 40 : 30,
    fontFamily: "NexaRegular",
    margin: 25,
    textAlign: "center",
  },
  text: {
    marginLeft: 10,
    fontFamily: "NexaRegular",
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#F4F7F8",
    borderRadius: 5,
    height: 40,
    margin: 8,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
  },
  icon: {
    padding: 10,
  },
  submitBtn: {
    backgroundColor: "#00388E",
    paddingVertical: 10,
    paddingHorizontal: 150,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  submitBtnText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "NexaBold",
  },
  spacer: {
    flex: 1,
  },
  disabled: {
    opacity: 0.5
  },
  errorText: {
    color: "red",
    marginHorizontal: 10,
    marginBottom: 20,
  },
});