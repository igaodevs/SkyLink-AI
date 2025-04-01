declare module 'firebase/firestore' {
  import { Timestamp } from '@firebase/firestore-types';
  export interface QueryDocumentSnapshot {
    id: string;
    data(): any;
    exists(): boolean;
  }
  export interface QuerySnapshot {
    docs: QueryDocumentSnapshot[];
  }
  export interface DocumentReference {
    id: string;
  }
  export interface CollectionReference {
    id: string;
  }
  export interface Query {
    where(field: string, opStr: string, value: any): Query;
  }
  export function collection(firestore: any, path: string): CollectionReference;
  export function doc(firestore: any, path: string, ...pathSegments: string[]): DocumentReference;
  export function getDoc(ref: DocumentReference): Promise<QueryDocumentSnapshot>;
  export function getDocs(query: Query): Promise<QuerySnapshot>;
  export function addDoc(ref: CollectionReference, data: any): Promise<DocumentReference>;
  export function updateDoc(ref: DocumentReference, data: any): Promise<void>;
  export function deleteDoc(ref: DocumentReference): Promise<void>;
  export function query(ref: CollectionReference, ...queryConstraints: any[]): Query;
  export function where(field: string, opStr: string, value: any): any;
  export function onSnapshot(ref: CollectionReference | DocumentReference, callback: (snapshot: QuerySnapshot | QueryDocumentSnapshot) => void): () => void;
  export { Timestamp };
}

declare module 'firebase/auth' {
  export * from '@firebase/auth-types';
  export function signInWithPhoneNumber(
    auth: Auth,
    phoneNumber: string,
    appVerifier: RecaptchaVerifier
  ): Promise<ConfirmationResult>;
}

declare module 'firebase/storage' {
  export * from '@firebase/storage';
}

declare module 'firebase/messaging' {
  export * from '@firebase/messaging';
} 