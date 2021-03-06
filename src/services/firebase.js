/* eslint-disable linebreak-style */
import { firebase, FieldValue } from '../lib/firebase';

export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((user) => user.data().length > 0);
}

export async function getUserByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
}

export async function getSuggestedProfiles(userId, following) {
  let query = firebase.firestore().collection('users');

  if (following.length > 0) {
    query = query.where('userId', 'not-in', [...following, userId]);
  } else {
    query = query.where('userId', '!=', userId);
  }
  const result = await query.limit(10).get();

  const profiles = result.docs.map((user) => ({
    ...user.data(),
    docId: user.id,
  }));

  return profiles;
}

export async function updateLoggedInUserFollowing(
  loggedInUserDocId,
  profileId,
  isFollowingProfile,
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(loggedInUserDocId)
    .update(
      {
        following: isFollowingProfile
          ? FieldValue.arrayRemove(profileId)
          : FieldValue.arrayRemove(profileId),
      },
    );
}

export async function updateFollowedUserFollowers(
  loggedInUserDocId,
  profileDocId,
  isFollowingProfile,
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(profileDocId)
    .update(
      {
        followers: isFollowingProfile
          ? FieldValue.arrayRemove(loggedInUserDocId)
          : FieldValue.arrayRemove(loggedInUserDocId),
      },
    );
}

export async function getPhotos(userId, following) {
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('user', 'in', following)
    .get();

  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }
      const user = await getUserByUserId(photo.userId);
      const { username } = user[0];
      return { username, ...photo, userLikedPhoto };
    }),
  );

  return photosWithUserDetails;
}

export async function getUserByUsername(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
}

export async function getUserPhotosByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', '==', userId)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
}

export async function isUserFollowingProfile(loggedInUsername, profileuserId) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', loggedInUsername)
    .where('following', 'array-contains', profileuserId)
    .get();

  const [response = {}] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return response.userId;
}

export async function toggleFollow(isFollowingProfile, activeUserDocId, profileDocId,
  profileUserId, followingUserId) {
  await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile);
  await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowingProfile);
}
