import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { BG_COLOR, Text_COLOR } from "../utils/Colors";
import { moderateScale, verticalScale } from "react-native-size-matters";
import CustomSolidButton from "./CustomSolidButton";
import { useNavigation } from "@react-navigation/native";

const NoLoginComp = ({ heading, desc }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{heading ? heading : ""}</Text>
      <Text style={styles.desc}>{desc ? desc : ""}</Text>
      <CustomSolidButton
        title={"Login"}
        style={styles.loginbtn}
        onClick={() => {navigation.navigate("LoginForUser")}}
      />
      <View style={styles.signupView}>
        <Text style={styles.text1}> Don't have an account? </Text>
        <Text style={styles.text1}> Create Account </Text>
      </View>
    </View>
  );
};

export default NoLoginComp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  heading: {
    fontSize: moderateScale(25),
    alignSelf: "center",
    width: "90%",
    marginTop: moderateScale(30),
    fontWeight: "600",
    textAlign: "center",
  },
  desc: {
    fontSize: moderateScale(16),
    alignSelf: "center",
    width: "90%",
    marginTop: moderateScale(20),
    fontWeight: "500",
    textAlign: "center",
  },
  loginbtn: {
    width: "40%",
    height: verticalScale(35),
    backgroundColor: Text_COLOR,
    borderRadius: moderateScale(20),
    justifyContent: "center",
    alignItems: "center",
  },
  signupView: {
    flexDirection: "row",
    alignSelf: "center",
    width: "90%",
    marginTop: moderateScale(50),
    justifyContent: "center",
  },
  text1: {
    fontSize: moderateScale(16),
    fontWeight: "500",
  },
  text2: {
    fontSize: moderateScale(16),
    fontWeight: "700",
    marginLeft: moderateScale(10),
  },
});
