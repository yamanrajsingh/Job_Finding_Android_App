import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { BG_COLOR, Text_COLOR } from "../../utils/Colors";
import { verticalScale } from "react-native-size-matters";
import MyJobs from "./Tabs/MyJobs";
import SearchC from "./Tabs/SearchC";
import ChatC from "./Tabs/ChatC";
import ProfileC from "./Tabs/ProfileC";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { moderateScale } from "react-native-size-matters";

const DashboardForCompany = () => {
  const navigate = useNavigation();
  // const id = await AsyncStorage.getItem("USER_ID")
  // if(id==null) navigate.navigate('SelectUser');
  const [selectedTab, SetSelectedTab] = useState(0);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      {selectedTab == 0 ? (
        <MyJobs />
      ) : selectedTab == 1 ? (
        <SearchC />
      ) : selectedTab == 2 ? (
        <ChatC />
      ) : (
        <ProfileC
          onJobsClick={() => {
            SetSelectedTab(0);
          }}
        />
      )}

      <View style={styles.bottomView}>
        <TouchableOpacity
          style={[
            styles.bottomTab,
            {
              borderTopWidth: selectedTab == 0 ? 3 : 0,
              borderTopColor: selectedTab == 0 ? "#3498db" : "transparent",
            },
          ]}
          onPress={() => {
            SetSelectedTab(0);
          }}
        >
          <Image
            source={require("../../images/home.png")}
            style={[
              styles.tabIcon,
              { tintColor: selectedTab == 0 ? "#3498db" : "#7f8c8d" },
            ]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.bottomTab,
            {
              borderTopWidth: selectedTab == 1 ? 3 : 0,
              borderTopColor: selectedTab == 1 ? "#3498db" : "transparent",
            },
          ]}
          onPress={() => {
            SetSelectedTab(1);
          }}
        >
          <Image
            source={require("../../images/search.png")}
            style={[
              styles.tabIcon,
              { tintColor: selectedTab == 1 ? "#3498db" : "#7f8c8d" },
            ]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.bottomTab,
            {
              borderTopWidth: selectedTab == 2 ? 3 : 0,
              borderTopColor: selectedTab == 2 ? "#3498db" : "transparent",
            },
          ]}
          onPress={() => {
            navigation.navigate("AddJob");
          }}
        >
          <Image
            source={require("../../images/add.png")}
            style={styles.tabIconAdd}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.bottomTab,
            {
              borderTopWidth: selectedTab == 3 ? 3 : 0,
              borderTopColor: selectedTab == 3 ? "#3498db" : "transparent",
            },
          ]}
          onPress={() => {
            SetSelectedTab(2);
          }}
        >
          <Image
            source={require("../../images/chat.png")}
            style={[
              styles.tabIcon,
              { tintColor: selectedTab == 2 ? "#3498db" : "#7f8c8d" },
            ]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.bottomTab,
            {
              borderTopWidth: selectedTab == 4 ? 3 : 0,
              borderTopColor: selectedTab == 4 ? "#3498db" : "transparent",
            },
          ]}
          onPress={() => {
            SetSelectedTab(3);
          }}
        >
          <Image
            source={require("../../images/user.png")}
            style={[
              styles.tabIcon,
              { tintColor: selectedTab == 3 ? "#3498db" : "#7f8c8d" },
            ]}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DashboardForCompany;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  bottomView: {
    width: "100%",
    height: verticalScale(60),
    backgroundColor: BG_COLOR,
    shadowColor: "rgba(0,0,0,0.1)",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  bottomTab: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 3,
    borderTopColor: "transparent",
  },
  tabIcon: {
    width: moderateScale(26),
    height: moderateScale(26),
  },
  tabIconAdd: {
    width: moderateScale(40),
    height: moderateScale(40),
    tintColor: "#3498db",
  },
});