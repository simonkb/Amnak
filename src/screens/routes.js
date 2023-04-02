import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { auth } from "../config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./login";
import Signup from "./signup";
import ForgotPassword from "./forgetPassword";
import Home from "./home";
import Lessons from "./lessons";
import Quizzes from "./quizzes";
import Profile from "./profile";
import LessonScreen from "./lesson";
import Quiz from "./BeginnerQuiz";
import QuizPage from "./quiz";
import Games from "./games";

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
      {/* <Stack.Screen
        name="All Quizzes"
        component={Quizzes}
        options={{
          headerShown: false,
        }}
      /> */}
      <Stack.Screen
        name="Quiz"
        component={QuizPage}
        options={{ headerShown: true, headerLeft: null }}
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
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
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
      {/* <Tab.Screen
        name="Quizzes"
        component={QuizStack}
        options={{ headerShown: false }}
      /> */}
      <Tab.Screen
        name="Games"
        component={Games}
        options={{ headerShown: false }}
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
  const [user, setUser] = React.useState(null);
  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen
            name="Main"
            component={MainStack}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Auth"
            component={AuthStack}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
