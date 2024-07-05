import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Card, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { firebase } from "../../../../Config";
import Loader from "../../../common/Loader";
import { FlatList } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { moderateScale } from "react-native-size-matters";

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const Notify = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const jobsSnapshot = await firebase
          .firestore()
          .collection("applied_jobs")
          .get();
        const jobs = jobsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const usersSnapshot = await firebase
          .firestore()
          .collection("users")
          .get();
        const users = usersSnapshot.docs.reduce((acc, doc) => {
          acc[doc.id] = doc.data();
          return acc;
        }, {});
      
        const jobsWithUserDetails = jobs.map((job) => ({
          ...job,
          user: users[job.userId],
        }));
      

        setAppliedJobs(jobsWithUserDetails);
      } catch (error) {
        console.error("Error fetching applied jobs: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  const handleCardPress = (userId) => {
    navigation.navigate("User Profile", { userId });
  };

  const handleApplicationDecision = async (jobId, userId, decision) => {
    setLoading(true);
    try {
    
      // Reference to the collection
      const appliedJobsRef = firebase.firestore().collection('applied_jobs');
  
      // Query to find the document with matching jobId and userId
      const query = appliedJobsRef.where('id', '==', jobId).where('userId', '==', userId);
  
      // Get the matching document
      const querySnapshot = await query.get();
      
      if (!querySnapshot.empty) {
        // Assume there's only one matching document
        const doc = querySnapshot.docs[0];
        
        // Update the application status in Firestore
        await doc.ref.update({
          status: decision,
        });
  
        // Get the user document
        const userDoc = await firebase.firestore().collection('users').doc(userId).get();
        const user = userDoc.data();
  
        // Send notification to the jobseeker
        await sendNotificationToUser(user, decision);
  
        alert(`Application ${decision} successfully!`);
  
        // Update the status locally to refresh the UI
        setAppliedJobs((prevJobs) =>
          prevJobs.map((job) =>
            job.id === jobId ? { ...job, status: decision } : job
          )
        );
      } else {
        alert('No matching application found.');
      }
      setLoading(false);
    } 
    
    catch (error) {
      console.error(`Error ${decision} application: `, error);
      alert(`Failed to ${decision} application.`);
     
    }
  };
  
  
  const sendNotificationToUser = async (user, decision) => {
    const message = {
      to: user.notificationToken, // This should be the user's FCM token
      notification: {
        title: `Your application has been ${decision}`,
        body: `Your application for the job has been ${decision}.`,
      },
    };
  
    try {
      await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'YOUR_FCM_SERVER_KEY', // Replace with your FCM server key
        },
        body: JSON.stringify(message),
      });
    } catch (error) {
      console.error('Error sending notification: ', error);
    }
  };

  return (
    <ScrollView>
      <FlatList
        contentContainerStyle={styles.container}
        data={loading ? Array.from({ length: 6 }) : appliedJobs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) =>
          loading ? (
            <View style={styles.card}>
              <ShimmerPlaceHolder style={styles.title} />
              <ShimmerPlaceHolder style={styles.category} />
              <ShimmerPlaceHolder style={styles.description} />
              <ShimmerPlaceHolder style={styles.category} />
              <ShimmerPlaceHolder style={styles.description} />
              <ShimmerPlaceHolder style={styles.category} />
              <ShimmerPlaceHolder style={styles.description} />
            </View>
          ) : (
            <TouchableOpacity
              key={index}
              onPress={() => handleCardPress(item.userId)}
            >
              <Card style={styles.card}>
                <Card.Content>
                  <Text style={styles.title}>{item.jobTitle}</Text>
                  <Text style={styles.category}>{item.category}</Text>
                  <Text style={styles.description}>{item.jobDescription}</Text>
                  <Text style={styles.appliedText}>
                    User applied to this job:
                  </Text>
                  <Text style={styles.userName}>{item.user?.name}</Text>
                  <Text style={styles.userEmail}>{item.user?.email}</Text>
                  <View style={styles.buttonContainer}>
                    {!item.status && (
                      <>
                        <Button
                          mode="contained"
                          onPress={() =>
                            handleApplicationDecision(
                              item.id,
                              item.userId,
                              "accepted"
                            )
                          }
                          style={styles.button1}
                        >
                          Accept
                        </Button>
                        <Button
                          mode="contained"
                          onPress={() =>
                            handleApplicationDecision(
                              item.id,
                              item.userId,
                              "rejected"
                            )
                          }
                          style={styles.button2}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    {item.status === "accepted" && (
                      <Button
                        mode="contained"
                        disabled
                        style={[styles.button1, styles.disabledButton]}
                      >
                      <Text style={styles.rej}>Accepted</Text>
                      </Button>
                    )}
                    {item.status === "rejected" && (
                      <Button
                        mode="contained"
                        disabled
                        style={[styles.button2, styles.disabledButton]}
                      >
                        <Text style={styles.rej}>Rejected</Text>
                       
                      </Button>
                    )}
                  </View>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )
        }
        ListHeaderComponent={
          <Text style={styles.heading}>Application Form</Text>
        }
        ListFooterComponent={<Loader visible={loading} />}
      />
    </ScrollView>
  );
};

export default Notify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0FFFF",
    padding: moderateScale(10),
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: moderateScale(20),
    marginLeft: moderateScale(10),
  },
  card: {
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#ddd",
    height: moderateScale(190),
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    width: "80%",
    marginLeft: moderateScale(10),
  },
  category: {
    fontSize: 14,
    color: "#888",
    marginBottom: 6,
    marginLeft: moderateScale(10),
  },
  description: {
    fontSize: 16,
    marginBottom: 6,
    marginLeft: moderateScale(10),
  },
  appliedText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
    marginLeft: moderateScale(10),
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "green",
    marginLeft: moderateScale(10),
  },
  userEmail: {
    fontSize: 14,
    color: "green",
    marginLeft: moderateScale(10),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button1: {
    flex: 0.48,
    backgroundColor: "#48D1CC",
  },
  button2: {
    flex: 0.48,
    backgroundColor: "#FF4500",
  },
  disabledButton: {
    opacity: 0.5,
  },
  rej:{
    color:'black',
    fontWeight:'900',
    fontSize:moderateScale(15)
  }
});
