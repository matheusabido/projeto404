import { Toast } from "@/components/Toast/Toast";
import { ToastContainer } from "@/components/Toast/ToastContainer";
import { useState, useCallback, createContext, useContext, useEffect } from "react";
import type { ReactNode } from "react";

type ToastData = {
  id: string;
  timeout: number;
  type: ToastType;
  title: string;
  message: string;
};

type ToastPayload = Omit<ToastData, "id" | "timeout">;

type ToastType = "success" | "error";

type ToastContextType = {
  addToast: (payload: ToastPayload) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  
  const removeToasts = useCallback((ids: string[]) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => !ids.includes(toast.id)));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const toRemove = toasts
        .filter((toast) => toast.timeout <= Date.now())
        .map((toast) => toast.id);

      removeToasts(toRemove);
    }, 100);
    
    return () => clearInterval(interval);
  }, [removeToasts, toasts]);

  const addToast = useCallback((payload: ToastPayload) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prevToasts) => [...prevToasts, { id, timeout: Date.now() + 5000, ...payload }]);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            title={toast.title}
            message={toast.message}
          />
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  
  return context;
}
