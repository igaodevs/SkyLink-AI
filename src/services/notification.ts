import { firestore } from "./firebase";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  Timestamp,
  orderBy,
  limit,
  DocumentData,
} from "firebase/firestore";
import { getCurrentUser } from "./auth";

export type NotificationType = "info" | "warning" | "error" | "success";

export interface Notification {
  id?: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  link?: string;
  createdAt: Timestamp;
  category?: "flight" | "baggage" | "system" | "vip" | "booking";
  metadata?: Record<string, any>;
}

// Add a new notification
export const addNotification = async (
  notification: Omit<Notification, "id" | "createdAt" | "read">,
): Promise<string> => {
  try {
    const notificationsRef = collection(firestore, "notifications");
    const newNotification = {
      ...notification,
      read: false,
      createdAt: Timestamp.now(),
    };

    const docRef = await addDoc(notificationsRef, newNotification);
    return docRef.id;
  } catch (error) {
    console.error("Error adding notification:", error);
    throw error;
  }
};

// Subscribe to user notifications
export const subscribeToUserNotifications = (
  callback: (notifications: Notification[]) => void,
  limitCount = 20,
) => {
  const user = getCurrentUser();
  if (!user) {
    console.error("No user logged in");
    return () => {};
  }

  const notificationsRef = collection(firestore, "notifications");
  const q = query(
    notificationsRef,
    where("userId", "==", user.uid),
    orderBy("createdAt", "desc"),
    limit(limitCount),
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const notifications: Notification[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data() as Omit<Notification, "id">;
        notifications.push({
          id: doc.id,
          ...data,
        });
      });
      callback(notifications);
    },
    (error) => {
      console.error("Error subscribing to notifications:", error);
    },
  );
};

// Mark notification as read
export const markNotificationAsRead = async (
  notificationId: string,
): Promise<void> => {
  try {
    const notificationRef = collection(firestore, "notifications");
    const q = query(notificationRef, where("id", "==", notificationId));

    // This is a simplified version. In a real app, you would use a direct document reference
    // and update it. This is just for demonstration purposes.
    onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        doc.ref.update({ read: true });
      });
    });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
};

// Mark all notifications as read
export const markAllNotificationsAsRead = async (): Promise<void> => {
  try {
    const user = getCurrentUser();
    if (!user) throw new Error("No user logged in");

    const notificationsRef = collection(firestore, "notifications");
    const q = query(
      notificationsRef,
      where("userId", "==", user.uid),
      where("read", "==", false),
    );

    onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        doc.ref.update({ read: true });
      });
    });
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    throw error;
  }
};

// Delete a notification
export const deleteNotification = async (
  notificationId: string,
): Promise<void> => {
  try {
    const notificationRef = collection(firestore, "notifications");
    const q = query(notificationRef, where("id", "==", notificationId));

    onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });
  } catch (error) {
    console.error("Error deleting notification:", error);
    throw error;
  }
};

// Create notification for flight status change
export const createFlightStatusNotification = async (
  userId: string,
  flightNumber: string,
  newStatus: string,
  oldStatus?: string,
): Promise<string> => {
  let type: NotificationType = "info";
  let title = `Status do voo ${flightNumber} atualizado`;
  let message = `O status do voo ${flightNumber} foi alterado para ${newStatus}`;

  if (newStatus === "Atrasado") {
    type = "warning";
    title = `Voo ${flightNumber} atrasado`;
    message = `Seu voo ${flightNumber} está atrasado. Verifique os detalhes para mais informações.`;
  } else if (newStatus === "Cancelado") {
    type = "error";
    title = `Voo ${flightNumber} cancelado`;
    message = `Lamentamos informar que seu voo ${flightNumber} foi cancelado. Entre em contato com o suporte para assistência.`;
  } else if (newStatus === "Embarque") {
    type = "success";
    title = `Embarque para o voo ${flightNumber}`;
    message = `O embarque para o voo ${flightNumber} está aberto. Dirija-se ao portão de embarque.`;
  }

  return await addNotification({
    userId,
    title,
    message,
    type,
    category: "flight",
    link: `/flights/${flightNumber}`,
    metadata: {
      flightNumber,
      newStatus,
      oldStatus,
    },
  });
};

// Create notification for baggage status change
export const createBaggageStatusNotification = async (
  userId: string,
  baggageId: string,
  newStatus: string,
  location?: string,
): Promise<string> => {
  let type: NotificationType = "info";
  let title = `Status da bagagem ${baggageId} atualizado`;
  let message = `O status da sua bagagem ${baggageId} foi alterado para ${newStatus}`;

  if (newStatus === "Extraviada") {
    type = "error";
    title = `Bagagem ${baggageId} extraviada`;
    message = `Sua bagagem ${baggageId} foi reportada como extraviada. Nossa equipe está trabalhando para localizá-la.`;
  } else if (newStatus === "Localizada") {
    type = "success";
    title = `Bagagem ${baggageId} localizada`;
    message = `Boa notícia! Sua bagagem ${baggageId} foi localizada${location ? ` em ${location}` : ""}.`;
  } else if (newStatus === "Em trânsito") {
    type = "info";
    title = `Bagagem ${baggageId} em trânsito`;
    message = `Sua bagagem ${baggageId} está em trânsito${location ? ` para ${location}` : ""}.`;
  } else if (newStatus === "Pronta para retirada") {
    type = "success";
    title = `Bagagem ${baggageId} pronta para retirada`;
    message = `Sua bagagem ${baggageId} está pronta para retirada${location ? ` em ${location}` : ""}.`;
  }

  return await addNotification({
    userId,
    title,
    message,
    type,
    category: "baggage",
    link: `/baggage/${baggageId}`,
    metadata: {
      baggageId,
      newStatus,
      location,
    },
  });
};

// Create notification for booking/ticket
export const createBookingNotification = async (
  userId: string,
  bookingId: string,
  notificationType: "confirmation" | "change" | "reminder" | "price_drop",
  details?: Record<string, any>,
): Promise<string> => {
  let type: NotificationType = "info";
  let title = "";
  let message = "";

  switch (notificationType) {
    case "confirmation":
      type = "success";
      title = "Reserva confirmada";
      message = `Sua reserva #${bookingId} foi confirmada com sucesso.`;
      break;
    case "change":
      type = "warning";
      title = "Alteração na reserva";
      message = `Houve uma alteração na sua reserva #${bookingId}. Verifique os detalhes.`;
      break;
    case "reminder":
      type = "info";
      title = "Lembrete de viagem";
      message = `Sua viagem (reserva #${bookingId}) está se aproximando. Prepare-se para viajar!`;
      break;
    case "price_drop":
      type = "success";
      title = "Queda de preço detectada";
      message = `O preço para um voo que você está monitorando caiu. Confira agora!`;
      break;
  }

  return await addNotification({
    userId,
    title,
    message,
    type,
    category: "booking",
    link: `/booking/${bookingId}`,
    metadata: {
      bookingId,
      notificationType,
      ...details,
    },
  });
};
