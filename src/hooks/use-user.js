/* eslint-disable linebreak-style */
import { useState, useEffect } from 'react';
import { getUserByUserId } from '../services/firebase';

export default function useUser(userId) {
  const [activeUser, setActiveUser] = useState();

  useEffect(() => {
    async function getUserObjectByUserId() {
      const [user] = await getUserByUserId(userId);
      setActiveUser(user || {});
    }
    if (userId) {
      getUserObjectByUserId(userId);
    }
  }, [userId]);

  return { user: activeUser, setActiveUser };
}
