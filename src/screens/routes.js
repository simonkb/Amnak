import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./login";
import Signup from "./signup";
import ForgotPassword from "./forgetPassword";
import Home from "./home";
import Lessons from "./lessons";
import Quizzes from "./quizzes";
import Profile from "./profile";
import LessonScreen from "./lesson";
import QuizPage from "./quiz";
import ResultsPage from "./Results";
import LandingPage from "./index";
import ReadDailyNews from "./ReadDailyNews";
import CertificationCategoriesPage from "./CertificationCategoriesPage";
import CertificationDetailsPage from "./CertificationDetailsPage";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const LessonStack = () => {
  return (
    <Stack.Navigator initialRouteName="All Lessons">
      <Stack.Screen
        name="All Lessons"
        component={Lessons}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Lesson"
        component={LessonScreen}
        options={{ headerShown: true }}
      />

      <Stack.Screen
        name="Quiz"
        component={QuizPage}
        options={{ headerShown: true, headerLeft: null }}
      />
      <Stack.Screen
        name="Results"
        component={ResultsPage}
        options={{ headerShown: true, headerLeft: null }}
      />
    </Stack.Navigator>
  );
};
const RoadMapStack = () => {
  return (
    <Stack.Navigator initialRouteName="Cyber Security Certifications">
      <Stack.Screen
        name="Cyber Security Certifications"
        component={CertificationCategoriesPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Certification Details"
        component={CertificationDetailsPage}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};
const QuizStack = () => {
  return (
    <Stack.Navigator initialRouteName="All Quizzes">
      <Stack.Screen
        name="All Quizzes"
        component={Quizzes}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Quiz"
        component={QuizPage}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Back"
        component={LandingPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cyber Security News"
        component={ReadDailyNews}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Certifications"
        component={RoadMapStack}
        options={{ headerShown: true }}
      />
    
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Forgot Password"
        component={ForgotPassword}
        options={{ headerShown: true }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

const MainStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Lessons"
        component={LessonStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Certifications"
        component={RoadMapStack}
        options={{ headerShown: true }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={{ headerShown: false, gestureEnabled:false }}
        />
        <Stack.Screen
          name="Main"
          component={MainStack}
          options={{ headerShown: false, gestureEnabled:false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
