// userMapService.js
import { firestore } from "../../../components/firebase";

let userMap = {}; // Persistent user map

export const populateUserMap = async () => {
  if (Object.keys(userMap).length === 0) {  // Check if userMap is already populated
    try {
      const usersSnapshot = await firestore.collection("users").get();
      
      usersSnapshot.forEach((doc) => {
        const userData = doc.data();
        const userId = doc.id;   // The document ID is the userId
        const userName = userData.name; // The name field within the document
        
        // Add userId and userName to the userMap
        userMap[userId] = userName;
      });

      console.log("User Map populated: ", userMap);
    } catch (error) {
      console.error("Error populating user map: ", error);
    }
  }
  
  return userMap; // Return the userMap (whether new or cached)
};

export const getUserMap = () => userMap; // Function to get the current userMap
