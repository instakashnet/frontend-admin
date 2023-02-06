import { useEffect, useState } from 'react';

export const useClientData = (user) => {
  const [completed, setCompleted] = useState(0);
  const [color, setColor] = useState('');

  const level = +user?.level;

  useEffect(() => {
    if (level === 2) {
      setCompleted(66);
      setColor('#eb9824');
    } else if (level === 3) {
      setCompleted(100);
      setColor('#20a2a5');
    } else {
      setCompleted(33);
      setColor('#ff4b55');
    }
  }, [level]);

  return { completed, color };
};
