import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  getMultiFactorResolver,
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
  RecaptchaVerifier,
  User,
  UserCredential,
  multiFactor,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase";

// Basic authentication functions
export const registerWithEmail = async (
  email: string,
  password: string,
  displayName: string,
): Promise<UserCredential> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  await updateProfile(userCredential.user, { displayName });
  await sendEmailVerification(userCredential.user);
  return userCredential;
};

export const loginWithEmail = async (
  email: string,
  password: string,
): Promise<UserCredential> => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const loginWithGoogle = async (): Promise<UserCredential> => {
  const provider = new GoogleAuthProvider();
  return await signInWithPopup(auth, provider);
};

export const logout = async (): Promise<void> => {
  return await signOut(auth);
};

export const resetPassword = async (email: string): Promise<void> => {
  return await sendPasswordResetEmail(auth, email);
};

// Profile management
export const updateUserProfile = async (
  user: User,
  displayName: string,
  photoURL?: string,
): Promise<void> => {
  return await updateProfile(user, { displayName, photoURL });
};

export const updateUserEmail = async (
  user: User,
  newEmail: string,
): Promise<void> => {
  return await updateEmail(user, newEmail);
};

export const updateUserPassword = async (
  user: User,
  newPassword: string,
): Promise<void> => {
  return await updatePassword(user, newPassword);
};

export const reauthenticateUser = async (
  user: User,
  password: string,
): Promise<UserCredential> => {
  const credential = EmailAuthProvider.credential(user.email!, password);
  return await reauthenticateWithCredential(user, credential);
};

// 2FA functions
export const setupPhoneMultiFactor = async (
  user: User,
  phoneNumber: string,
  recaptchaVerifier: RecaptchaVerifier,
): Promise<void> => {
  const multiFactorSession = await multiFactor(user).getSession();
  const phoneInfoOptions = {
    phoneNumber,
    session: multiFactorSession,
  };
  const phoneAuthProvider = new PhoneAuthProvider(auth);
  const verificationId = await phoneAuthProvider.verifyPhoneNumber(
    phoneInfoOptions,
    recaptchaVerifier,
  );

  // Store verificationId in localStorage or state to use it in the next step
  localStorage.setItem("verificationId", verificationId);
};

export const completePhoneMultiFactor = async (
  user: User,
  verificationCode: string,
): Promise<void> => {
  const verificationId = localStorage.getItem("verificationId");
  if (!verificationId) throw new Error("Verification ID not found");

  const phoneAuthCredential = PhoneAuthProvider.credential(
    verificationId,
    verificationCode,
  );
  const multiFactorAssertion =
    PhoneMultiFactorGenerator.assertion(phoneAuthCredential);

  await multiFactor(user).enroll(multiFactorAssertion, "Phone number");
  localStorage.removeItem("verificationId");
};

// Handle MFA during sign-in
export const handleMultiFactorAuth = async (
  error: any,
  verificationCode: string,
  recaptchaVerifier: RecaptchaVerifier,
): Promise<UserCredential> => {
  const resolver = getMultiFactorResolver(auth, error);
  const phoneInfoOptions = {
    multiFactorHint: resolver.hints[0],
    session: resolver.session,
  };

  const phoneAuthProvider = new PhoneAuthProvider(auth);
  const verificationId = await phoneAuthProvider.verifyPhoneNumber(
    phoneInfoOptions,
    recaptchaVerifier,
  );

  const phoneAuthCredential = PhoneAuthProvider.credential(
    verificationId,
    verificationCode,
  );
  const multiFactorAssertion =
    PhoneMultiFactorGenerator.assertion(phoneAuthCredential);

  return await resolver.resolveSignIn(multiFactorAssertion);
};

// Auth state observer
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};
