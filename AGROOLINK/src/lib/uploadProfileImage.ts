import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

/**
 * Uploads a profile image for the current user and updates their Firestore document.
 * @param {File} file - The image file to upload.
 * @returns {Promise<string>} - The download URL of the uploaded image.
 */
export async function uploadProfileImage(file: File): Promise<string> {
  const auth = getAuth();
  const storage = getStorage();
  const db = getFirestore();

  const user = auth.currentUser;
  if (!user) throw new Error("No user signed in");

  const storageRef = ref(storage, `profileImages/${user.uid}/${file.name}`);
  await uploadBytes(storageRef, file);

  const downloadURL = await getDownloadURL(storageRef);

  const userDocRef = doc(db, "users", user.uid);
  await updateDoc(userDocRef, { avatar: downloadURL });

  return downloadURL;
}