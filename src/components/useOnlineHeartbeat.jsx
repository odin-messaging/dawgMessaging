import { useEffect, useRef, useCallback } from "react"
import { useAuth } from "./AuthContext"
import { ping } from '../fetches/patch'

const heartBeatFunction = async (callback) => {
  console.log('running heartbeat')
  try {
    await ping()
    await callback()
  } catch (err) {
    console.error(err)
  }
}

export function useOnlineHeartbeat(callback) {
  const { user, loading } = useAuth()
  const interval = 1000 * 60 * 1 // 1 minute
  const intervalRef = useRef(null)
  const heartbeatCallback = useCallback(() => heartBeatFunction(callback), [])
  const heartbeatRef = useRef(heartbeatCallback)
  const userRef = useRef(user)

  useEffect(() => {
    // heartBeatFunction(callback) // page load call
    userRef.current = user
  }, [user])

  const safeHeartbeat = useCallback(() => {
    const fn = heartbeatRef.current
    if (!fn) return

    Promise.resolve()
      .then(() => fn())
      .catch(err => {
        console.debug("heartbeat failed", err)
      })
  }, [])

  const startHeartbeat = useCallback(() => {
    if (intervalRef.current) return

    // safeHeartbeat()

    intervalRef.current = setInterval(safeHeartbeat, interval)
  }, [safeHeartbeat, interval])

  const stopHeartbeat = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    if (loading) return

    const handleVisibility = async () => {
      const shouldRun = document.visibilityState === "visible" && !!userRef.current

      if (shouldRun) {
        await heartBeatFunction(callback) // page load call
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