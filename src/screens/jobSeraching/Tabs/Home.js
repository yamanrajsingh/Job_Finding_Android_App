import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { BG_COLOR, Text_COLOR } from "../../../utils/Colors";
import CustomSolidButton from "../../../common/CustomSolidButton";
import {
  moderateScale,
  verticalScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import { TextInput } from "react-native-gesture-handler";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const COLORS = {
  background: '#ffffff',
  primary: '#3498db',
  secondary: '#2ecc71',
  textPrimary: '#2c3e50',
  textSecondary: '#8e44ad',
  listBackground: '#ecf0f1',
  buttonBackground: '#e74c3c',
  buttonText: '#ffffff',
  emptyText: '#95a5a6',
  inputBorder: '#bdc3c7',
  inputBackground: '#ecf0f1',
  searchBoxBorder: '#9e9e9e',
  gray: 'gray',
};

// Example fonts, ensure these fonts are available in your project
const FONTS = {
  regular: 'Roboto-Regular',
  bold: 'Roboto-Bold',
  italic: 'Roboto-Italic',
};

const Home = () => {
  const [isLogin, SetisLogin] = useState(false);
  const navigation = useNavigation();
  const isFoucused = useIsFocused();
  useEffect(() => {
    getdata();
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

  return (
    <View style={style.container}>
      <TouchableOpacity
        style={style.searchbox}
        activeOpacity={1}
        onPress={() => {
          navigation.navigate("Jobsearch");
        }}
      >
        <Image
          source={require("../../../images/search.png")}
          style={style.searchicon}
        />
        <Text style={style.text}>Search Jobs here..</Text>
      </TouchableOpacity>
      {!isLogin && (
        <View>
          <Text style={style.subhead}>
            You are one step away from getting a good job
          </Text>
          <View style={style.notes}>
            <Image
              source={require("../../../images/star.png")}
              style={style.star}
            />
            <Text style={style.subtitile}>
              Get Jobs after creating account{" "}
            </Text>
          </View>
          <View style={style.notes}>
            <Image
              source={require("../../../images/star.png")}
              style={style.star}
            />
            <Text style={style.subtitile}>Chat with Recruiter </Text>
          </View>
          <View style={style.btnView}>
            <TouchableOpacity
              style={style.loginbtn}
              onPress={() => {
                navigation.navigate("LoginForUser");
              }}
            >
              <Text style={style.loginText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.signupbtn}
              onPress={() => {
                navigation.navigate("SignUpForUser");
              }}
            >
              <Text style={[style.loginText, { color: Text_COLOR }]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View style={style.jobsearchcard}>
        <Image
          source={require("../../../images/search_job.gif")}
          style={{ alignSelf: "center" }}
        />
        <TextInput style={style.inp} placeholder="Enter Job Title" />
        <TextInput
          style={[style.inp, { marginTop: moderateScale(10) }]}
          placeholder="Enter Job Title"
        />
        <CustomSolidButton
          title={"Search Job"}
          onClick={() => {
            navigation.navigate("Jobsearch");
          }}
        />
      </View>
    </View>
  );
};

export default Home;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchbox: {
    width: '90%',
    height: verticalScale(45),
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: moderateScale(20),
    borderRadius: moderateScale(30),
    borderColor: COLORS.searchBoxBorder,
    flexDirection: 'row',
    paddingLeft: moderateScale(15),
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
  },
  searchicon: {
    width: moderateScale(20),
    height: moderateScale(20),
    tintColor: COLORS.gray,
  },
  text: {
    marginLeft: moderateScale(10),
    fontWeight: '400',
    fontSize: moderateScale(16),
    color: COLORS.gray,
    fontFamily: FONTS.regular,
  },
  subhead: {
    fontWeight: '600',
    fontSize: moderateScale(21),
    alignSelf: 'center',
    width: '90%',
    marginTop: moderateScale(20),
    color: COLORS.textPrimary,
    fontFamily: FONTS.bold,
    textAlign: 'center',
  },
  notes: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: moderateScale(10),
    alignItems: 'center',
  },
  star: {
    width: moderateScale(15),
    height: moderateScale(15),
  },
  subtitle: {
    marginLeft: moderateScale(10),
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
  },
  btnView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: moderateScale(35),
  },
  loginbtn: {
    width: '40%',
    height: verticalScale(35),
    backgroundColor: COLORS.primary,
    borderRadius: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupbtn: {
    width: '40%',
    height: verticalScale(35),
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: COLORS.buttonText,
    fontWeight: '500',
    fontFamily: FONTS.regular,
  },
  jobsearchcard: {
    width: '90%',
    alignSelf: 'center',
    marginTop: moderateScale(50),
    backgroundColor: COLORS.listBackground,
    borderRadius: moderateScale(10),
    padding: moderateScale(20),
    alignItems: 'center',
  },
  inp: {
    width: '100%',
    height: moderateScale(40),
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    backgroundColor: COLORS.inputBackground,
    borderRadius: moderateScale(10),
    paddingLeft: moderateScale(10),
    fontFamily: FONTS.regular,
    fontSize: moderateScale(16),
  },
});
