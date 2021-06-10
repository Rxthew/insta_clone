/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
import React from 'react';
import LoggedInUserContext from '../../context/logged-in-user';
import Suggestions from './suggestions';
import User from './user';

export default function Sidebar() {
  const {
    user: {
      docId = '', fullName, username, userId, following,
    } = {},
  } = useContext(LoggedInUserContext);

  return (
    <div className="p-4">
      <User username={username} fullName={fullName} />
      <Suggestions userId={userId} following={following} loggedInUserDocId={docId} />
    </div>
  );
}
