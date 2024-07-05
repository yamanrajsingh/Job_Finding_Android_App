import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { firebase } from "../../../Config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from "../../common/Loader";
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
  inputBorder: "#bdc3c7",
  inputBackground: "#ecf0f1",
  searchBoxBorder: "#9e9e9e",
  gray: "gray",
};

const Notifications = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    fetchNotifications();
    getData();
  }, []);

  const getData = async () => {
    const id = await AsyncStorage.getItem("USER_ID");
    const type = await AsyncStorage.getItem("USER_TYPE");
    if (id != null && type != null) {
      if (type === "user") {
        setIsLogin(true);
      }
    }
  };

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const querySnapshot = await firebase.firestore()
        .collection("applied_jobs")
        .where("status", "in", ["accepted", "rejected"])
        .get();

      const notificationsArray = [];
      querySnapshot.forEach((doc) => {
        notificationsArray.push({ id: doc.id, ...doc.data() });
      });
      setNotifications(notificationsArray);
    } catch (error) {
      console.error("Error fetching notifications: ", error);
    }
    setLoading(false);
  };

  const renderNotificationItem = ({ item }) => (
    <View style={styles.notificationCard}>
      <Text style={styles.notificationTitle}>{item.jobTitle}</Text>
      <Text style={styles.jobDescription}>{item.jobDescription}</Text>

      <Text style={[
        styles.notificationBody,
        item.status === 'accepted' ? styles.acceptedText : styles.rejectedText
      ]}>
        {item.status === 'accepted' ? "Congratulations , Your application has been accepted" : "Your application has been rejected"}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      {!isLogin ? (
        <View>
          <Text style={styles.subhead}>
          Stay Updated with Job Notifications
          </Text>
          <View style={styles.notes}>
            <Text style={styles.subtitle}>
            Log in to see updates on your job applications.
            </Text>
          </View>
          <View style={styles.notes}>
            <Text style={styles.subtitle}>
            Get Jobs after creating an account
            </Text>
          </View>
          <View style={styles.btnView}>
            <TouchableOpacity
              style={styles.loginbtn}
              onPress={() => navigation.navigate("LoginForUser")}
            >
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signupView}>
        <Text style={styles.text1}> Don't have an account? </Text>
        <Text style={styles.text1}> Create Account </Text>
      </View>
        </View>
      ) : loading ? (
        <Loader />
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderNotificationItem}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={() => (
            <View style={styles.emptyview}>
              <Text style={styles.emptyText}>No Notifications Available</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: "#FFFFFF",
  },
  header: {
    fontSize: moderateScale(24),
    color: "#2F4F4F",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: verticalScale(20),
  },
  listContainer: {
    padding: moderateScale(10),
  },
  notificationCard: {
    backgroundColor: "#FFF",
    borderRadius: moderateScale(10),
    padding: moderateScale(15),
    marginVertical: moderateScale(10),
    shadowColor: "#7B68EE",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderLeftWidth: 5,
    borderLeftColor: "#9370DB",
  },
  notificationTitle: {
    fontSize: moderateScale(20),
    color: "#9370DB",
    fontWeight: "bold",
  },
  notificationBody: {
    fontSize: moderateScale(16),
    marginVertical: moderateScale(5),
  },
  acceptedText: {
    color: "green",
  },
  rejectedText: {
    color: "red",
  },
  emptyview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: moderateScale(18),
    color: "#666",
  },
  subhead: {
    fontWeight: "600",
    fontSize: moderateScale(21),
    alignSelf: "center",
    width: "90%",
    marginTop: moderateScale(20),
    color: "#2F4F4F",
    textAlign: "center",
  },
  notes: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    marginTop: moderateScale(10),
    alignItems: "center",
  },
  star: {
    width: moderateScale(15),
    height: moderateScale(15),
  },
  subtitle: {
    marginLeft: moderateScale(10),
    fontSize: moderateScale(16),
    fontWeight: "600",
    color: "#808080",
  },
  btnView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: moderateScale(35),
    marginBottom: moderateScale(15),
  },
  loginbtn: {
    width: "90%",
    height: verticalScale(40),
    backgroundColor: "#9370DB",
    borderRadius: moderateScale(20),
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  signupbtn: {
    width: "40%",
    height: verticalScale(40),
    borderColor: "#9370DB",
    borderWidth: 1,
    borderRadius: moderateScale(20),
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // elevation: 5,
  },
  loginText: {
    color: "#FFF",
    fontWeight: "500",
  },
  signupView: {
   flexDirection:'row',
    alignSelf: "center",
    width: "90%",
    marginTop: moderateScale(0),
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
  jobDescription: {
    fontSize: moderateScale(15),
    color: "#778899",
    marginVertical: moderateScale(5),
  },
});