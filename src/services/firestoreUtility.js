// firestoreService.js

import { db, auth } from "../config/firestore";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  where,
  query,
  doc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const sampleMenu = {
  unit_id: "Xu09DXPoC4BGxd6T1mFY",
  date: "12-08-2024",
  day: "Sun",
  breakfast_count: 0,
  lunch_count: 0,
  dinner_count: 0,
  breakfast: ["Idli", "coconut chutney", "sambhar", "dalia", "milk/ coffee"],
  lunch: ["rice/ roti", "daal", "aalo bhindi", "paneer masala", "brownie"],
  dinner: [
    "rice/ roti",
    "mix daal",
    "aalo gobi",
    "palak paneer",
    "milk/ coffee",
  ],
};

export const registerUser = async (email, password) => {
  console.log("here");
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("successfully logged in", user);
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error!", errorCode, errorMessage);
      return false;
    });
};

export const fetchMenu = async () => {
  const weekdayOrder = {
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
    Sun: 7,
  };
  const unitId = "Xu0rDXPoC4BGxd6T1mFY";

  const q = query(collection(db, "daily_menu"), where("unit_id", "==", unitId));
  let menuData = [];
  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log("No matching documents found!");
    } else {
      menuData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      menuData.sort((a, b) => weekdayOrder[a.day] - weekdayOrder[b.day]);
    }
    return menuData;
  } catch (error) {
    console.error("Error fetching menu:", error);
    return [];
  }
};

export const addDocument = async () => {
  console.log("inside func", sampleMenu);
  try {
    const docRef = await addDoc(collection(db, "daily_menu"), sampleMenu);
    console.log("success", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const editMenu = async (menuId, mealName, menuItems) => {
  try {
    console.log("insie func", menuId, mealName, menuItems);
    const menuDocRef = doc(db, "daily_menu", menuId);
    await updateDoc(menuDocRef, {
      [mealName]: menuItems,
    });
    console.log("after update");
    return true;
  } catch (e) {
    console.error("Error editing menu ", e);
    return false;
  }
};

export const fetchFeedbacks = async () => {
  const unitId = "Xu0rDXPoC4BGxd6T1mFY";

  const q = query(collection(db, "feedback"), where("unit_id", "==", unitId));
  let feedbacks = [];

  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log("No matching documents found!");
    } else {
      feedbacks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    }
    console.log(feedbacks);
    return feedbacks;
  } catch (error) {
    console.error("Error fetching menu:", error);
    return [];
  }
};
