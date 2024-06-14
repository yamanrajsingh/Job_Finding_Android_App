import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { BG_COLOR, Text_COLOR } from "../../utils/Colors";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { firebase } from "../../../Config";
import { useNavigation } from "@react-navigation/native";

const COLORS = {
  background: "#f5f5f5",
  primary: "#3498db",
  secondary: "#2ecc71",
  textPrimary: "#2c3e50",
  textSecondary: "#8e44ad",
  listBackground: "#ffffff",
  buttonBackground: "#e74c3c",
  buttonText: "#ffffff",
  emptyText: "#95a5a6",
};

const FONTS = {
  regular: "Roboto-Regular",
  bold: "Roboto-Bold",
  italic: "Roboto-Italic",
};

const Jobsearch = () => {
  const navigation = useNavigation();
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);

  const searchJob = (txt) => {
    firebase
      .firestore()
      .collection("jobs")
      .where("jobTitle", "==", txt)
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

  const toggleSaveJob = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter((id) => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Image
          source={require("../../images/search.png")}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search Job here..."
          style={styles.inp}
          onChangeText={searchJob}
        />
      </View>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.list}
            onPress={() => {
              navigation.navigate("Jobdetails", { data: item });
            }}
          >
            <View style={styles.topview}>
              <Text style={styles.listText}>{item.jobTitle}</Text>
              <TouchableOpacity
                onPress={() => {
                  toggleSaveJob(item.id);
                }}
              >
                {/* <Image
                  source={
                    savedJobs.includes(item.id)
                      ? require("../../images/stared.png")
                      : require("../../images/star.png")
                  }
                  style={styles.staricon}
                /> */}
              </TouchableOpacity>
            </View>
            <Text style={styles.jobDescription}>{item.jobDescription}</Text>
            <Text style={styles.jobDetails}>{"Job Category: " + item.category}</Text>
            <Text style={styles.jobDetails}>{"Company: " + item.company}</Text>
            <Text style={styles.jobDetails}>{"Posted By: " + item.posterName}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Jobsearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchBox: {
    width: "90%",
    height: verticalScale(40),
    borderWidth: 0.4,
    marginTop: moderateScale(20),
    alignSelf: "center",
    borderRadius: moderateScale(30),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: moderateScale(10),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchIcon: {
    width: moderateScale(17),
    height: moderateScale(17),
    tintColor: "gray",
  },
  inp: {
    width: "85%",
    height: "100%",
    fontSize: moderateScale(16),
    color: Text_COLOR,
    marginLeft: moderateScale(10),
  },
  list: {
    width: "90%",
    padding: moderateScale(15),
    alignSelf: "center",
    backgroundColor: COLORS.listBackground,
    marginTop: moderateScale(20),
    borderRadius: moderateScale(10),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  listText: {
    fontSize: moderateScale(18),
    color: COLORS.textPrimary,
    fontFamily: FONTS.bold,
    flex: 1,
  },
  topview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: moderateScale(10),
  },
  staricon: {
    width: moderateScale(24),
    height: moderateScale(24),
    tintColor: COLORS.primary,
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
});
