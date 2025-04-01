import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export interface User {
  uid: string;
  email: string;
  role: 'airline' | 'employee' | 'passenger';
  name: string;
  phoneNumber?: string;
  twoFactorEnabled: boolean;
  biometricEnabled: boolean;
}

class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;

  private constructor() {
    this.initializeAuthState();
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private async initializeAuthState() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          this.currentUser = userDoc.data() as User;
        }
      } else {
        this.currentUser = null;
      }
    });
  }

  public async signInWithEmail(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
    return userDoc.data() as User;
  }

  public async signInWithGoogle(): Promise<User> {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const userDoc = await getDoc(doc(db, 'users', result.user.uid));
    return userDoc.data() as User;
  }

  public async signInWithPhone(phoneNumber: string): Promise<void> {
    const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: () => {
        // reCAPTCHA solved
      }
    });
    await signInWithPhoneNumber(auth, phoneNumber, verifier);
  }

  public async register(email: string, password: string, userData: Partial<User>): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const newUser: User = {
      uid: userCredential.user.uid,
      email,
      role: userData.role || 'passenger',
      name: userData.name || '',
      twoFactorEnabled: false,
      biometricEnabled: false
    };
    await setDoc(doc(db, 'users', userCredential.user.uid), newUser);
    return newUser;
  }

  public async signOut(): Promise<void> {
    await signOut(auth);
  }

  public async enableTwoFactor(uid: string): Promise<void> {
    await setDoc(doc(db, 'users', uid), { twoFactorEnabled: true }, { merge: true });
  }

  public async enableBiometric(uid: string): Promise<void> {
    await setDoc(doc(db, 'users', uid), { biometricEnabled: true }, { merge: true });
  }

  public getCurrentUser(): User | null {
    return this.currentUser;
  }
}

export const authService = AuthService.getInstance(); 