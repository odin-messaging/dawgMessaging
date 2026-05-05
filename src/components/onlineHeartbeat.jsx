import { useEffect, useRef, useCallback } from "react";
import { useAuth } from "./AuthContext";

export function useOnlineHeartbeat(heartBeatFunction) {
  const { user, loading } = useAuth()
  const interval = 1000 * 60 * 1 // 1 minute
  const intervalRef = useRef(null)
  const heartbeatRef = useRef(heartBeatFunction)
  const userRef = useRef(user)

  // Keep latest values in refs (avoids stale closures)
  useEffect(() => {
    heartbeatRef.current = heartBeatFunction;
  }, [heartBeatFunction])

  useEffect(() => {
    userRef.current = user
  }, [user])

  const safeHeartbeat = useCallback(() => {
    const fn = heartbeatRef.current;
    if (!fn) return

    console.log('running heartbeat')

    Promise.resolve()
      .then(() => fn())
      .catch(err => {
        console.debug("heartbeat failed", err);
      })
  }, [])

  const startHeartbeat = useCallback(() => {
    if (intervalRef.current) return // already running

    safeHeartbeat()

    intervalRef.current = setInterval(safeHeartbeat, interval)
  }, [safeHeartbeat, interval])

  const stopHeartbeat = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, []);

  useEffect(() => {
    if (loading) return

    const handleVisibility = () => {
      const shouldRun = document.visibilityState === "visible" && !!userRef.current

      if (shouldRun) {
        startHeartbeat()
      } else {
        stopHeartbeat()
      }
    }

    // Initial setup
    handleVisibility()

    document.addEventListener("visibilitychange", handleVisibility)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility)
      stopHeartbeat()
    }
  }, [loading, startHeartbeat, stopHeartbeat])

  // Cleanup on unmount / user logout
  useEffect(() => {
    if (!user) {
      stopHeartbeat()
    }
  }, [user, stopHeartbeat])
}