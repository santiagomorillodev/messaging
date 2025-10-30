export function formatMessageTime(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);
  const now = new Date();

  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const nowOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const diffTime = nowOnly - dateOnly;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  }

  if (diffDays === 1) {
    return "Yesterday";
  }

  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  return capitalize(dayName);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
