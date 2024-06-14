import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { BG_COLOR, Text_COLOR } from "../../../utils/Colors";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from "react-native-size-matters";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import ProfileOptionItem from "../../../common/ProfileOptionItem";
import firebase from "firebase/compat/app";

// import Loader from "../../../common/Loader";

const ProfileC = ({ onJobsClick }) => {
  const [Name, SetName] = useState("");
  const [ProfileImg, SetProfileImg] = useState("");
  const [Jobs, SetJobs] = useState("");
  // const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  useEffect(() => {
    getData();
  }, [isFocused]);

  const getData = async () => {
    SetName(await AsyncStorage.getItem("NAME"));
    SetJobs(await AsyncStorage.getItem("JOBS"));
    const id = await AsyncStorage.getItem("EMAIL");
    firebase
      .firestore()
      .collection("companies")
      .where("email", "==", id)
      .get()
      .then(async (data) => {
        let temp = [];
        data.docs.forEach((item) => {
          temp.push({ ...item.data(), id: item.id });
        });
        SetProfileImg(temp[0].profileImage);
        await AsyncStorage.setItem("PROFILE", temp[0].profileImage);
      });
  };

  const handleLogout = async () => {
    // Clear user data from AsyncStorage
    await AsyncStorage.removeItem("NAME");
    await AsyncStorage.removeItem("JOBS");
    await AsyncStorage.removeItem("PROFILE_IMG");
    await AsyncStorage.removeItem("USER_ID");
    // Navigate to the login screen
    navigation.navigate("SelectUser");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Job Genie
        <Image
          style={styles.logo}
          source={require("../../../images/logo.png")}
        ></Image>
      </Text>
      <TouchableOpacity>
        {ProfileImg != undefined ? (
          <Image style={styles.profile} source={{ uri: ProfileImg }}></Image>
        ) : (
          <Image
            style={styles.profile}
            source={require("../../../images/profile.png")}
          ></Image>
        )}
      </TouchableOpacity>
      <Text style={styles.name}>{Name}</Text>
      <Text
        style={styles.changePic}
        onPress={() => {
          navigation.navigate("Update Profile");
        }}
      >
        Update Profile
      </Text>
      <Text
        style={styles.changePic}
        onPress={() => {
          navigation.navigate("Change Profile Picture");
        }}
      >
        Change Profile Picture
      </Text>
      <View style={styles.option}>
        <ProfileOptionItem
          icon={require("../../../images/Job.png")}
          title={"My Jobs(" + Jobs + ")"}
          onClick={() => {
            onJobsClick();
          }}
        />
        <ProfileOptionItem
          icon={require("../../../images/contact-mail.png")}
          title={"Contact Us"}
          onClick={() => {}}
        />
        <ProfileOptionItem
          icon={require("../../../images/themes.png")}
          title={"App Theme"}
          onClick={() => {}}
        />
        <ProfileOptionItem
          icon={require("../../../images/logout.png")}
          title={"Logout"}
          onClick={() => {
            handleLogout();
          }}
        />
      </View>
      {/* <Loader visible={loading} /> */}
    </View>
  );
};

export default ProfileC;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    padding: moderateScale(15),
  },
  heading: {
    fontSize: moderateScale(28),
    fontWeight: "700",
    color: "#4A90E2",
    textAlign: "center",
    marginVertical: moderateScale(20),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  logo: {
    width: 40,
    height: 40,
    marginLeft: moderateScale(10),
  },
  profile: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
    alignSelf: "center",
    marginTop: moderateScale(20),
    borderWidth: 3,
    borderColor: "#FFD700",
  },
  changePic: {
    color: "#FF6347",
    fontSize: moderateScale(18),
    alignSelf: "center",
    fontWeight: "600",
    paddingTop: moderateScale(10),
    textDecorationLine: "underline",
  },
  name: {
    color: "#2F4F4F",
    fontSize: moderateScale(24),
    fontWeight: "700",
    alignSelf: "center",
    marginTop: moderateScale(10),
  },
  option: {
    marginTop: moderateVerticalScale(40),
    paddingHorizontal: moderateScale(10),
  },
});