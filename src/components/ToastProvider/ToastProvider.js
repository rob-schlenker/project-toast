import React from "react";

import useKeyDown from "../../hooks/use-keydown";

export const ToastContext = React.createContext()

function ToastProvider({children}) {
  const [toasts, setToasts] = React.useState([
    {
      id: crypto.randomUUID(),
      message: "oh No",
      variant: "error",
    },
    {
      id: crypto.randomUUID(),
      message: "heya",
      variant: "success",
    },
  ]);

  const handleEscape = React.useCallback(() => {
    setToasts([])
  }, [])

  useKeyDown("Escape", handleEscape)



function createToast(message, variant) {
  const nextToasts = [
    ...toasts,
    {
      id: crypto.randomUUID(),
      message,
      variant,
    },
  ];
  setToasts(nextToasts);
}

function dismissToast(id) {
    const nextToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });

    setToasts(nextToasts);
}

  return <ToastContext.Provider value={{ toasts, createToast, dismissToast }}>
    {children}
  </ToastContext.Provider>;
}

export default ToastProvider;
