import { useEffect, useState } from "react";

export const useClientData = (user) => {
  const [completed, setCompleted] = useState(0);
  const [color, setColor] = useState("");

  useEffect(() => {
    if (user?.level === 1) {
      setCompleted(33);
      setColor("#ff4b55");
    } else if (user?.level === 2) {
      setCompleted(66);
      setColor("#eb9824");
    } else if (user?.level === 3) {
      setCompleted(100);
      setColor("#20a2a5");
    } else {
      setCompleted(0);
    }
  }, [user]);

  return { completed, color };
};
