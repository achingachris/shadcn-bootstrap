"use client"

import type React from "react"

import { useEffect } from "react"

export function PWAProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Register service worker
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("SW registered: ", registration)
          })
          .catch((registrationError) => {
            console.log("SW registration failed: ", registrationError)
          })
      })
    }

    // Request notification permission
    if ("Notification" in window && "serviceWorker" in navigator) {
      if (Notification.permission === "default") {
        // Don't request immediately, wait for user interaction
        const requestNotificationPermission = () => {
          Notification.requestPermission().then((permission) => {
            console.log("Notification permission:", permission)
          })
        }

        // Request permission after user interacts with the page
        document.addEventListener("click", requestNotificationPermission, { once: true })
      }
    }

    // Handle online/offline status
    const handleOnline = () => {
      console.log("App is online")
      // Sync any pending data
    }

    const handleOffline = () => {
      console.log("App is offline")
      // Show offline indicator if needed
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  return <>{children}</>
}
