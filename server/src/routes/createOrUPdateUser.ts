import { User } from '../models/user';
import admin from 'firebase-admin'; // server-side Firebase

export const createOrUpdateUser = async (firebaseUser: any) => {
  const { uid, email, displayName, photoURL } = firebaseUser;

  let user = await User.findOne({ uid });

  if (user) {
    // Update if profile changed
    user.displayName = displayName || user.displayName;
    user.photoURL = photoURL || user.photoURL;
    await user.save();
    return user;
  }

  // Create new user
  user = new User({
    uid,
    email,
    displayName,
    photoURL,
    subscription: 'free',
  });

  await user.save();
  return user;
};
