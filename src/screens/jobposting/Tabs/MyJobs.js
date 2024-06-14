import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BG_COLOR, Text_COLOR } from "../../../utils/Colors";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { firebase } from "../../../../Config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import Loader from "../../../common/Loader";

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
const MyJobs = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [loading, SetLoading] = useState(false);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getJobs();
  }, [isFocused]);
  const getJobs = async () => {
    let name = await AsyncStorage.getItem("NAME");
    if (name == null) navigation.navigate("SelectUser");
    SetLoading(true);
    let email = await AsyncStorage.getItem("EMAIL");
    console.log(email);
    firebase
      .firestore()
      .collection("jobs")
      .where("posterEmail", "==", email)
      .get()
      .then(async (data) => {
        SetLoading(false);
        let temp = [];
        data.docs.forEach((item) => {
          temp.push({ ...item.data(), id: item.id });
        });
        await AsyncStorage.setItem("JOBS", temp.length + "");
        setJobs(temp);
      });
  };

  const deltJob = (id) => {
    firebase
      .firestore()
      .collection("jobs")
      .doc(id)
      .delete()
      .then(() => {
        getJobs();
      });
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
      {loading && (
        <View>
          <FlatList
            data={[1, 2, 3]}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.jobitem}>
                  <ShimmerPlaceHolder style={styles.title} />
                  <ShimmerPlaceHolder style={styles.desc} />
                  <ShimmerPlaceHolder style={styles.salary} />
                  <ShimmerPlaceHolder style={styles.salary} />
                  <ShimmerPlaceHolder style={styles.salary} />
                  <ShimmerPlaceHolder style={styles.salary} />
                  <ShimmerPlaceHolder style={styles.salary} />

                  <View style={styles.bottomView}>
                    <ShimmerPlaceHolder style={styles.editbtnl} />
                    <ShimmerPlaceHolder style={styles.dltbtnl} />
                  </View>
                </View>
              );
            }}
          />
        </View>
      )}

      {jobs.length > 0 ? (
        <FlatList
          data={jobs}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.jobitem}>
                <Text style={styles.title}>{item.jobTitle}</Text>
                <Text style={styles.desc}>{item.jobDescription}</Text>
                <Text style={styles.salary}>
                  {"Category : " + item.category}
                </Text>
                <Text style={styles.salary}>{"Company : " + item.company}</Text>
                <Text style={styles.salary}>
                  {"Experience : " + item.experience + " year"}
                </Text>
                <Text style={styles.salary}>{"Skills : " + item.skill}</Text>
                <Text style={styles.salary}>
                  {"Package : " + item.package + " L/year"}
                </Text>
                <View style={styles.bottomView}>
                  <TouchableOpacity
                    style={styles.editbtn}
                    onPress={() => {
                      navigation.navigate("EditJob", { data: item });
                    }}
                  >
                    <Text style={{ color: "white" }}>Edit Button</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.dltbtn}
                    onPress={() => {
                      deltJob(item.id);
                    }}
                  >
                    <Text style={{ color: "white" }}>Delete Button</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      ) : (
        <View style={styles.emptyView}>
          <Text style={styles.title}> Empty Jobs</Text>
        </View>
      )}
      <Loader visible={loading} />
    </View>
  );
};

export default MyJobs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  heading: {
    fontSize: moderateScale(25),
    fontWeight: "600",
    color: Text_COLOR,
    textAlign: "center",
    marginTop: moderateScale(15),
  },
  jobitem: {
    width: "90%",
    marginTop: moderateScale(20),
    backgroundColor: "#FDFDFD",
    borderRadius: moderateScale(20),
    marginLeft: moderateScale(20),
    padding: moderateScale(15),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  desc: {
    fontSize: moderateScale(17),
    fontWeight: "500",
    marginTop: moderateScale(5),
    color: "#555",
  },
  salary: {
    fontSize: moderateScale(17),
    fontWeight: "500",
    marginTop: moderateScale(5),
    color: "#555",
  },
  bottomView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: moderateScale(20),
    alignItems: "center",
    marginBottom: moderateScale(25),
  },
  editbtn: {
    width: "40%",
    height: moderateScale(40),
    borderWidth: 1,
    backgroundColor: "#4CAF50",
    borderRadius: moderateScale(20),
    justifyContent: "center",
    alignItems: "center",
  },
  dltbtn: {
    width: "40%",
    height: moderateScale(40),
    borderWidth: 1,
    backgroundColor: "#F44336",
    borderRadius: moderateScale(20),
    justifyContent: "center",
    alignItems: "center",
  },
  emptyView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: moderateScale(80),
    height: moderateScale(80),
  },
  loaderView: {
    width: "100%",
    height: verticalScale(150),
    alignSelf: "center",
    marginTop: moderateScale(20),
    marginLeft: moderateScale(20),
  },
  loadtitle: {
    width: "95%",
    height: verticalScale(100),
    borderRadius: moderateScale(10),
    marginTop: moderateScale(10),
  },
  editbtnl: {
    width: "40%",
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    justifyContent: "center",
    alignItems: "center",
  },
  dltbtnl: {
    width: "40%",
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    justifyContent: "center",
    alignItems: "center",
  },
});
