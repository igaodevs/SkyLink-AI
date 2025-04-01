import { User } from "firebase/auth";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { firestore } from "@/services/firebase";

// Log levels
export type LogLevel = "debug" | "info" | "warning" | "error" | "critical";

// Log entry interface
export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Timestamp;
  userId?: string;
  userName?: string;
  userEmail?: string;
  module?: string;
  action?: string;
  metadata?: Record<string, any>;
  error?: {
    name?: string;
    message?: string;
    stack?: string;
  };
}

// Logger class
class Logger {
  private currentUser: User | null = null;

  // Set current user
  setUser(user: User | null) {
    this.currentUser = user;
  }

  // Get user info for logs
  private getUserInfo() {
    if (!this.currentUser) return {};

    return {
      userId: this.currentUser.uid,
      userName: this.currentUser.displayName || undefined,
      userEmail: this.currentUser.email || undefined,
    };
  }

  // Log to console
  private logToConsole(
    level: LogLevel,
    message: string,
    metadata?: Record<string, any>,
  ) {
    const timestamp = new Date().toISOString();
    const userInfo = this.currentUser
      ? `[User: ${this.currentUser.displayName || this.currentUser.email || this.currentUser.uid}]`
      : "[No User]";

    const logMessage = `${timestamp} [${level.toUpperCase()}] ${userInfo} ${message}`;

    switch (level) {
      case "debug":
        console.debug(logMessage, metadata || "");
        break;
      case "info":
        console.info(logMessage, metadata || "");
        break;
      case "warning":
        console.warn(logMessage, metadata || "");
        break;
      case "error":
      case "critical":
        console.error(logMessage, metadata || "");
        break;
    }
  }

  // Log to Firestore
  private async logToFirestore(logEntry: LogEntry) {
    try {
      const logsCollection = collection(firestore, "logs");
      await addDoc(logsCollection, logEntry);
    } catch (error) {
      console.error("Failed to write log to Firestore:", error);
    }
  }

  // Create log entry
  private createLogEntry(
    level: LogLevel,
    message: string,
    module?: string,
    action?: string,
    metadata?: Record<string, any>,
    error?: Error,
  ): LogEntry {
    const logEntry: LogEntry = {
      level,
      message,
      timestamp: Timestamp.now(),
      module,
      action,
      metadata,
      ...this.getUserInfo(),
    };

    if (error) {
      logEntry.error = {
        name: error.name,
        message: error.message,
        stack: error.stack,
      };
    }

    return logEntry;
  }

  // Log methods
  async debug(
    message: string,
    module?: string,
    action?: string,
    metadata?: Record<string, any>,
  ) {
    const logEntry = this.createLogEntry(
      "debug",
      message,
      module,
      action,
      metadata,
    );
    this.logToConsole("debug", message, metadata);

    // We don't store debug logs in Firestore to save space
    // Only log to console
  }

  async info(
    message: string,
    module?: string,
    action?: string,
    metadata?: Record<string, any>,
  ) {
    const logEntry = this.createLogEntry(
      "info",
      message,
      module,
      action,
      metadata,
    );
    this.logToConsole("info", message, metadata);
    await this.logToFirestore(logEntry);
  }

  async warning(
    message: string,
    module?: string,
    action?: string,
    metadata?: Record<string, any>,
  ) {
    const logEntry = this.createLogEntry(
      "warning",
      message,
      module,
      action,
      metadata,
    );
    this.logToConsole("warning", message, metadata);
    await this.logToFirestore(logEntry);
  }

  async error(
    message: string,
    error?: Error,
    module?: string,
    action?: string,
    metadata?: Record<string, any>,
  ) {
    const logEntry = this.createLogEntry(
      "error",
      message,
      module,
      action,
      metadata,
      error,
    );
    this.logToConsole("error", message, { ...metadata, error });
    await this.logToFirestore(logEntry);
  }

  async critical(
    message: string,
    error?: Error,
    module?: string,
    action?: string,
    metadata?: Record<string, any>,
  ) {
    const logEntry = this.createLogEntry(
      "critical",
      message,
      module,
      action,
      metadata,
      error,
    );
    this.logToConsole("critical", message, { ...metadata, error });
    await this.logToFirestore(logEntry);

    // For critical errors, you might want to send alerts or notifications
    // This could be implemented by calling a Cloud Function or other service
  }

  // Log user actions
  async logUserAction(
    action: string,
    module: string,
    metadata?: Record<string, any>,
  ) {
    await this.info(`User action: ${action}`, module, action, metadata);
  }

  // Log system events
  async logSystemEvent(
    event: string,
    module: string,
    metadata?: Record<string, any>,
  ) {
    await this.info(`System event: ${event}`, module, event, metadata);
  }

  // Log authentication events
  async logAuthEvent(event: string, metadata?: Record<string, any>) {
    await this.info(`Auth event: ${event}`, "authentication", event, metadata);
  }
}

// Create and export a singleton instance
export const logger = new Logger();

// Error boundary for React components
export function logError(error: Error, componentStack: string) {
  logger.error("React component error", error, "react", "render", {
    componentStack,
  });
}
