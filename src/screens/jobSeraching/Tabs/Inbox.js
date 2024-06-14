import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import NoLoginComp from "../../../common/NoLoginComp";
import { BG_COLOR } from "../../../utils/Colors";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Inbox = () => {
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
      {!isLogin && (
        <NoLoginComp
          heading={"You can chat with Recruiter of MNC's"}
          desc={"Talk to any recruiter for getting job recommondation"}
        />
      )}
    </View>
  );
};

export default Inbox;
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
});
