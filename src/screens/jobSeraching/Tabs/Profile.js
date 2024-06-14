import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import NoLoginComp from "../../../common/NoLoginComp";
import { BG_COLOR } from "../../../utils/Colors";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase/compat/app";
import { moderateScale } from "react-native-size-matters";

const Profile = () => {
  const [isLogin, SetisLogin] = useState(false);
  const navigation = useNavigation();
  const isFoucused = useIsFocused();
  const [userdata, Setuserdata] = useState(null);
  useEffect(() => {
    getdata();
    profiledata();
  }, [isFoucused]);

  const getdata = async () => {
    const id = await AsyncStorage.getItem("USER_ID");
    const type = await AsyncStorage.getItem("USER_TYPE");
    if (id != null && type != null) {
      if (type == "user") {
        SetisLogin(true);
      }
    }
  };
  const profiledata = async () => {
    try {
      // Retrieve the user ID from AsyncStorage
      const id = await AsyncStorage.getItem("EMAIL");
      if (id === null) {
        throw new Error("User ID not found in AsyncStorage");
      }

      // Fetch user data from Firestore
      const querySnapshot = await firebase
        .firestore()
        .collection("users")
        .where("email", "==", id)
        .get();

      if (querySnapshot.empty) {
        console.log("No matching documents.");
        return;
      }

      querySnapshot.forEach((doc) => {
        Setuserdata(doc.data());
      });
    } catch (err) {
      console.log("Error retrieving user profile data:", err);
    }
  };
  return (
    <View style={style.container}>
      {!isLogin && (
        <NoLoginComp
          heading={"Easy Manage Your Profile"}
          desc={
            "Manage Your Professional Profile/Portfolio For Attracting Many Jobs"
          }
        />
      )}

      {isLogin && (
        <View style={style.container}>
          <TouchableOpacity
            style={{ marginTop: 0, marginLeft: 0, alignSelf: "center" }}
          >
            <Image
              source={require("../../../images/profile.png")}
              style={style.profile}
            />
          </TouchableOpacity>
          <Text style={style.username}>
            {userdata ? userdata.name : "Loading..."}
          </Text>
          <Text style={style.useremail}>
            {userdata ? userdata.email : "Loading..."}
          </Text>
          <TouchableOpacity style={style.editbtn}>
            <Text style={{ fontWeight: "500" }}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Profile;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    fontSize: 25,
    fontWeight: "600",
    marginTop: moderateScale(10),
    textAlign: "center",
  },
  useremail: {
    fontSize: 18,
    color: "#8F8F8F",
    marginTop: moderateScale(5),
    textAlign: "center",
  },
  editbtn: {
    width: 200,
    height: 40,
    borderWidth: 0.4,
    justifyContent: "center",
    backgroundColor: "#4CAF50",
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    alignSelf: "center",
    marginTop: moderateScale(20),
    justifyContent: "center",
    alignItems: "center",
  },
});
