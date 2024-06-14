import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import NoLoginComp from "../../../common/NoLoginComp";
import { FlatList } from "react-native-gesture-handler";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebase } from "../../../../Config";
import { moderateScale, verticalScale } from "react-native-size-matters";

const COLORS = {
  background: "#f5f5f5",
  primary: "#3498db",
  secondary: "#2ecc71",
  textPrimary: "#2c3e50",
  textSecondary: "#8e44ad",
  listBackground: "#ecf0f1",
  buttonBackground: "#e74c3c",
  buttonText: "#ffffff",
  emptyText: "#95a5a6",
};

const FONTS = {
  regular: "Roboto-Regular",
  bold: "Roboto-Bold",
  italic: "Roboto-Italic",
};

const Apply = () => {
  const [isLogin, SetisLogin] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getdata();
  }, [isFocused]);

  const getdata = async () => {
    const id = await AsyncStorage.getItem("USER_ID");
    const type = await AsyncStorage.getItem("USER_TYPE");
    if (id != null && type != null) {
      if (type === "user") {
        SetisLogin(true);
      }
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    const id = await AsyncStorage.getItem("USER_ID");

    firebase
      .firestore()
      .collection("applied_jobs")
      .where("userId", "==", id)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          console.log("No matching documents.");
          setJobs([]); // clear jobs if no matches
          return;
        }
        const jobsArray = [];
        querySnapshot.forEach((doc) => {
          jobsArray.push({ id: doc.id, ...doc.data() });
        });
        setJobs(jobsArray);
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });
  };

  const deleteSavedJob = async (jobId) => {
    const userId = await AsyncStorage.getItem("USER_ID");

    try {
      if (jobId && userId) {
        await firebase.firestore().collection("applied_jobs").doc(jobId).delete();
        console.log("Applied job deleted successfully");
        getJobs();
        Alert.alert("Success", "Applied job deleted successfully");
      } else {
        console.log("No Applied job ID to delete");
      }
    } catch (error) {
      console.error("Error deleting saved job:", error);
      Alert.alert("Error", "Failed to delete saved job. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {!isLogin && (
        <NoLoginComp
          heading={"One place to track your Application"}
          desc={"Track all your jobs which you applied but for that you need to create an account first"}
        />
      )}
      {jobs.length > 0 && isLogin ? (
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                navigation.navigate("Jobdetails", { data: item });
              }}
            >
              <View style={styles.topview}>
                <Text style={styles.listText}>{item.jobTitle}</Text>
                <TouchableOpacity
                  onPress={() => {
                    deleteSavedJob(item.id);
                  }}
                >
                  <Image
                    source={require("../../../images/saved.png")}
                    style={styles.deleteIcon}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.jobDescription}>{item.jobDescription}</Text>
              <Text style={styles.jobDetails}>{"Job Category: " + item.category}</Text>
              <Text style={styles.jobDetails}>{"Company: " + item.company}</Text>
              <Text style={styles.jobDetails}>{"Posted By: " + item.posterName}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={styles.emptyview}>
          <Text style={styles.emptyText}>No Jobs Applied</Text>
        </View>
      )}
    </View>
  );
};

export default Apply;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: moderateScale(10),
  },
  card: {
    backgroundColor: COLORS.listBackground,
    borderRadius: moderateScale(10),
    padding: moderateScale(15),
    marginVertical: moderateScale(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  listText: {
    fontSize: moderateScale(18),
    color: COLORS.textPrimary,
    fontFamily: FONTS.bold,
  },
  topview: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: moderateScale(10),
  },
  deleteIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
  jobDescription: {
    fontSize: moderateScale(16),
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
    marginVertical: moderateScale(5),
  },
  jobDetails: {
    fontSize: moderateScale(14),
    color: COLORS.textPrimary,
    fontFamily: FONTS.italic,
    marginVertical: moderateScale(2),
  },
  emptyview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: moderateScale(20),
    color: COLORS.emptyText,
    fontFamily: FONTS.regular,
  },
});
