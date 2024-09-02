// firestoreService.js

import { db, auth } from "../config/firestore";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  getDoc,
  where,
  setDoc,
  query,
  doc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { v4 as uuidv4 } from "uuid";

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

const generateUniqueUserId = async () => {
  let isUnique = false;
  let userId;

  // Keep generating a new ID until a unique one is found
  while (!isUnique) {
    userId = uuidv4().replace(/-/g, "").substring(0, 8); // Generate 8-character ID
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      isUnique = true;
    }
  }

  return userId;
};

export const signUp = async (formData) => {
  console.log("formdata:", formData);
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    const user = userCredential.user;
    console.log("successful creae user ,user:", formData);
    await sendEmailVerification(user);
    console.log("Verification email sent.");
    alert(
      "Verification email sent. Please verify your email before signing in."
    );
    const userId = await generateUniqueUserId();

    // Sign out the user to prevent access until email is verified
    await signOut(auth);

    // Add new user to "users" collection in Firestore with generated ID
    const userDocRef = doc(db, "units", userId);
    await setDoc(userDocRef, {
      unit_name: formData.name,
      strength: 0,
      veg_count: 0,
      nonVeg_count: 0,
      breakfast_count: { veg: 0, non_veg: 0 },
      lunch_count: { veg: 0, non_veg: 0 },
      dinner_count: { veg: 0, non_veg: 0 },
      email: formData.email,
    });

    return {
      success: true,
      message:
        "Sign-up successful. Please verify your email before signing in.",
    };
  } catch (error) {
    console.error("Error registering:", error);
    return { success: false, message: error.message };
  }
};

// Function to Sign-In a User
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    if (!user.emailVerified) {
      await signOut(auth);
      return {
        success: false,
        message: "Please verify your email before signing in.",
      };
    }

    return { success: true, message: "Sign-in successful." };
  } catch (error) {
    console.error("Error signing in:", error.message);
    return { success: false, message: error.message };
  }
};

export const fetchMenu = async (unitId) => {
  const weekdayOrder = {
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
    Sun: 7,
  };

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

export const fetchFeedbacks = async (unitId) => {
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

export const fetchUnitData = async (unitId) => {
  try {
    const unitRef = doc(db, "units", unitId);
    const unitSnap = await getDoc(unitRef);

    if (unitSnap.exists()) {
      const unitData = unitSnap.data();
      return unitData;
    } else {
      console.error("No such document!");
      return false;
    }
  } catch (error) {
    console.error("Error fetching unit data: ", error);
    return false;
  }
};
