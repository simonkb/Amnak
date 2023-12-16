import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./login";
import Signup from "./signup";
import ForgotPassword from "./forgetPassword";
import Home from "./home";
import Lessons from "./lessons";
import Profile from "./profile";
import LessonScreen from "./lesson";
import QuizPage from "./quiz";
import ResultsPage from "./Results";
import LandingPage from "./index";
import ReadDailyNews from "./ReadDailyNews";
import CertificationCategoriesPage from "./CertificationCategoriesPage";
import CertificationDetailsPage from "./CertificationDetailsPage";
import { auth } from "../config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import Stories from "./Stories";
import Scenarios from "./Scenarios";
import Exercises from "./Exercises";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import LessonHome from "./LessonHome";
import SocialMediaTipsHome from "./SocialMediaTips";
import ReportCyberCrimes from "./ReportCybercrimes";
import SocialMediaTip from "./SocialMedia";
import SocialMediaTipPage from "./SocialMediaTipPage.js";
import Story from "./Story.js";
import ScenarioHome from "./Scenarios Home.js";
import Grades from "./Grades.js";
import EvaluationQuizPage from "./EvaluationQuiz.js";
import EvaluationQuizResultsPage from "./EvaluationQuizResults.js";
import GameScreen from "./Games.js";

const LessonStack = () => {
  return (
    <Stack.Navigator initialRouteName="Lesson Home">
      <Stack.Screen
        name="Lesson Home"
        component={LessonHome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="All Lessons"
        component={Lessons}
        options={{
          headerShown: true,
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
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Results"
        component={ResultsPage}
        options={{ headerShown: true, headerLeft: null }}
      />
      <Stack.Screen
        name="Stories"
        component={Stories}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Story"
        component={Story}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Scenarios"
        component={Scenarios}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Scenarios Home"
        component={ScenarioHome}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Exercises"
        component={Exercises}
        options={{ headerShown: true, gestureEnabled: false }}
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
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Certification Details"
        component={CertificationDetailsPage}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};
const GradStack = () => {
  return (
    <Stack.Navigator initialRouteName="Grade">
      <Stack.Screen
        name="Grade"
        component={Grades}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Evaluation Test"
        component={EvaluationQuizPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Evaluation Test Results"
        component={EvaluationQuizResultsPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Back"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cyber Security News"
        component={ReadDailyNews}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Social Media Tips"
        component={SocialMediaTipsHome}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Social Media Tip"
        component={SocialMediaTip}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Social Media Tip Page"
        component={SocialMediaTipPage}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Report Cybercrime"
        component={ReportCyberCrimes}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Road Map"
        component={RoadMapStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Game"
        component={GameScreen}
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
        options={{ headerShown: false }}
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
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="My Learning"
        component={LessonStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="graduation-cap" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Grades"
        component={GradStack}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              color={color}
              size={size}
              name="receipt"
            ></MaterialCommunityIcons>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              color={color}
              size={size}
              name="account"
            ></MaterialCommunityIcons>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const Navigation = () => {
  const [user, setUser] = useState(null);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen
            name="Main"
            component={MainStack}
            options={{ headerShown: false, gestureEnabled: false }}
          />
        ) : (
          <Stack.Screen
            name="Auth"
            component={AuthStack}
            options={{ headerShown: false, gestureEnabled: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
