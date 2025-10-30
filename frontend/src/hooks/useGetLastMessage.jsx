import { useEffect, useState, useCallback } from "react";
import { fetchWithAuth } from "../utils/fetchWithAuth";

export default function useGetLastMessage(conversationId) {
  const [lastMessage, setLastMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reloadFlag, setReloadFlag] = useState(0);

  const reload = useCallback(() => setReloadFlag(f => f + 1), []);

  useEffect(() => {
    if (conversationId == null) {
      setLastMessage(null);
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    let mounted = true;

    async function fetchLastMessage() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchWithAuth(`http://localhost:8000/conversation/${conversationId}/last-message`, {
          method: "GET",
          credentials: "include",
          signal: controller.signal,
        });

        if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
        const data = await res.json();
        const message = data?.message ?? data;
        if (mounted) setLastMessage(message ?? null);
      } catch (err) {
        if (err.name === "AbortError") {
        } else {
          if (mounted) {
            console.error("Error fetching last message:", err);
            setError(err);
            setLastMessage(null);
          }
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchLastMessage();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [conversationId, reloadFlag]);

  console.log(lastMessage)

  return { lastMessage, loading, error, reload };
}