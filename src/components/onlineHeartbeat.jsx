import { useEffect } from "react"

export function useOnlineHeartbeat(interval = 15000) {
  useEffect(() => {
    const ping = () => {
      fetch("/api/ping", {
        method: "POST",
        credentials: "include",
      })
    }

    ping()

    const id = setInterval(ping, interval);

    const onVisible = () => {
      if (document.visibilityState === "visible") {
        ping()
      }
    }

    document.addEventListener("visibilitychange", onVisible);

    return () => {
      clearInterval(id)
      document.removeEventListener("visibilitychange", onVisible);
    }
  }, [interval])
}