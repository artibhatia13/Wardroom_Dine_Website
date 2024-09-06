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
  orderBy,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { FastfoodOutlined } from "@mui/icons-material";

export const signUp = async (formData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    const user = userCredential.user;

    await sendEmailVerification(user);

    alert(
      "Verification email sent. Please verify your email before signing in."
    );

    // Store formData temporarily
    localStorage.setItem("newUnitDetails", JSON.stringify(formData));

    // Sign out the user to prevent access until email is verified
    await signOut(auth);

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

    const storedUserData = JSON.parse(localStorage.getItem("newUnitDetails"));

    if (storedUserData && storedUserData.email === email) {
      const newUser = {
        unit_name: storedUserData.name,
        unit_id: storedUserData.unitID,
        strength: 0,
        veg_count: 0,
        nonVeg_count: 0,
        email: storedUserData.email,
      };

      const docRef = await addDoc(collection(db, "units"), newUser);

      // Clear the temporary storage
      localStorage.removeItem("newUnitDetails");
    }

    return { success: true, message: "successfully signed in" };
  } catch (error) {
    console.error("Error signing in:", error.message);
    return { success: false, message: error.message };
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
      message: "If this email is registered, a reset link will be sent.",
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const fetchTodaysMenu = async (unitID, date) => {
  const q = query(
    collection(db, "daily_menus"),
    where("unit_id", "==", unitID),
    where("date", "==", date)
  );

  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return { success: true, data: null };
    } else {
      const doc = querySnapshot.docs[0];
      const menu = { id: doc.id, ...doc.data() };
      console.log("menu", menu);
      return { success: true, data: menu };
    }
  } catch (error) {
    console.error("Error fetching menu:", error);
    return { success: false, message: error.message };
  }
};

export const fetchMenu = async (unitId, startDate, endDate) => {
  const menusQuery = query(
    collection(db, "daily_menus"),
    where("unit_id", "==", unitId),
    where("date", ">=", startDate),
    where("date", "<=", endDate),
    orderBy("date", "asc")
  );

  try {
    const querySnapshot = await getDocs(menusQuery);

    if (querySnapshot.empty) {
      return { success: true, data: [] };
    } else {
      const menuData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return { success: true, data: menuData };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const addDocument = async (dailyMenu) => {
  try {
    const menuCollection = collection(db, "daily_menus");
    const q = query(menuCollection, where("date", "==", dailyMenu.date));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return {
        success: false,
        message: `Menu for ${dailyMenu.date} already exists.`,
      };
    }

    const docRef = await addDoc(collection(db, "daily_menus"), dailyMenu);

    console.log("Document successfully added with ID:", docRef.id);
    return { success: true };
  } catch (e) {
    return {
      success: false,
      message: e,
    };
  }
};

export const editMenu = async (menuId, mealName, menuItems) => {
  try {
    const menuDocRef = doc(db, "daily_menus", menuId);
    await updateDoc(menuDocRef, {
      [mealName]: menuItems,
    });
    return true;
  } catch (e) {
    console.error("Error editing menu ", e);
    return false;
  }
};

export const fetchFeedbacks = async (unitId) => {
  const q = query(collection(db, "feedback"), where("unit_id", "==", unitId));

  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return { success: true, data: null };
    } else {
      const feedbacks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return { success: true, data: feedbacks };
    }
  } catch (error) {
    return { success: false, message: error.message };
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

export const fetchUnitDataByEmail = async (email) => {
  try {
    const q = query(collection(db, "units"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const unitData = { id: doc.id, ...doc.data() };
      console.log("res:", unitData);
      return { success: true, data: unitData };
    } else {
      return { success: false, message: "No unit found with this email." };
    }
  } catch (error) {
    console.error("Error fetching unit data:", error.message);
    return { success: false, message: error.message };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("User successfully logged out.");
    return { success: true, message: "Successfully logged out" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const fetchPendingUserApprovals = async (isApproved, unitID) => {
  try {
    const q = query(
      collection(db, "users"),
      where("unit_id", "==", unitID),
      where("is_approved", "==", isApproved)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const pendingRequets = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return { success: true, data: pendingRequets };
    } else {
      return { success: true, data: null };
    }
  } catch (error) {
    console.error("Error fetching pending requests :", error.message);
    return { success: false, message: error.message };
  }
};

export const approveUserRequest = async (userID) => {
  try {
    const userRef = doc(db, "users", userID);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      console.error("User not found");
      return { success: false, message: "User not found" };
    }

    await updateDoc(userRef, { is_approved: true });

    return { success: true, message: "User approved successfully" };
  } catch (error) {
    console.error("Error approving user:", error);
    return { success: false, message: "Error approving user" };
  }
};
