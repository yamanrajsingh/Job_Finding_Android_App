import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { verticalScale } from "react-native-size-matters";
import { BG_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from "../../utils/Colors";
import Apply from "./Tabs/Apply";
import Inbox from "./Tabs/Inbox";
import Profile from "./Tabs/Profile";
import Home from "./Tabs/Home";

const DrawerScreen = () => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <View style={styles.container}>
      {currentTab === 0 ? (
        <Home />
      ) : currentTab === 1 ? (
        <Apply />
      ) : currentTab === 2 ? (
        <Inbox />
      ) : (
        <Profile />
      )}

      <View style={styles.bottomView}>
        <TouchableOpacity style={styles.tab} onPress={() => setCurrentTab(0)}>
          <Image
            source={
              currentTab === 0
                ? require("../../images/home1.png")
                : require("../../images/home.png")
            }
            style={styles.tabIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.tab} onPress={() => setCurrentTab(1)}>
          <Image
            source={
              currentTab === 1
                ? require("../../images/send1.png")
                : require("../../images/send.png")
            }
            style={styles.tabIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.tab} onPress={() => setCurrentTab(2)}>
          <Image
            source={
              currentTab === 2
                ? require("../../images/chat1.png")
                : require("../../images/chat.png")
            }
            style={styles.tabIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.tab} onPress={() => setCurrentTab(3)}>
          <Image
            source={
              currentTab === 3
                ? require("../../images/user.png")
                : require("../../images/Profilelogo.png")
            }
            style={styles.tabIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DrawerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  bottomView: {
    width: "100%",
    height: verticalScale(60),
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#fff",
    borderTopWidth: 0.5,
    borderTopColor: "#ccc",
  },
  tab: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  tabIcon: {
    width: verticalScale(30),
    height: verticalScale(30),
    resizeMode: "contain",
    tintColor: PRIMARY_COLOR, // Change the tint color to match your theme
  },
});
