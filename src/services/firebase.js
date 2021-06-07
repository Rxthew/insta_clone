import { firebase, FieldValue} from '../lib/firebase'

export async function doesUsernameExist(username){
    const result = await firebase
    .firestore()
    .collection(users)
    .where("username", "==", username)
    .get();

    return result.docs.map((user) => user.data().length > 0); 
}

export async function getUserByUserId (userId){
    const result = await firebase
    .firestore()
    .collection(users)
    .where("userId", "==", userId)
    .get();

    const user =  result.docs.map((item) => ({
        ...item.data(),
       docId: item.id 
    })); 

    return user;

}

export async function getSuggestedProfiles(userId, following){
    const result = await firebase
    .firestore()
    .collection('users')
    .limit(10)
    .get();

    return result.docs()
    .map((user)=> (...user.data(), docId= user.Id))
    .filter((profile)=> profile.userId != userId && following.include(profile.userId));
}

export async function updateLoggedInUserFollowing(
    loggedInUserDocId,
    profileId,  
    isFollowingProfile){

      return firebase
      .firestore()
      .collection(users)
      .doc(loggedInUserDocId)
      .update(
          {following:isFollowingProfile 
            ? FieldValue.arrayRemove(profileId) 
            : FieldValue.arrayRemove(profileId) })
          }

export async function updateFollowedUserFollowers(
    loggedInUserDocId,
    profileDocId,  
    isFollowingProfile){

      return firebase
      .firestore()
      .collection(users)
      .doc(profileDocId)
      .update(
          {followers:isFollowingProfile 
            ? FieldValue.arrayRemove(loggedInUserDocId) 
            : FieldValue.arrayRemove(loggedInUserDocId) })
          }

export async function getPhotos(userId, following){
   const result = await firebase
     .firestore()
     .collection('photos')
     .where('user' 'in' following)
     .get()

   const userFollowedPhotos = result.docs.map((photo) => ({
      ...photo.data()
      docId: photo.id
   }));

   const photosWithUserDetails = await Promise.all(
     userFollowedPhotos.map(async (photo) => {
       let userLikedPhoto = false;
       if(photo.likes.includes(userId)){ 
         userLikedPhoto = true
       }
     const user = await getUserByUserId(photo.userId)
     const { username } = user[0]
     return {username, ...photo, userLikedPhoto}
     })
   );

   return photosWithUserDetails;
  }

  export async function getUserByUsername(username){
    const result = await firebase
    .firestore()
    .collection(users)
    .where("username", "==", username)
    .get();

    return result.docs.map((item) => ({
      ...item.data(),
      docId : item.id
    })); 
   
}

export async function getUserPhotosByUserId(username){
  const [user] = await getUserByUsername(username);
  const result = await firebase
   .firestore()
   .collection(users)
   .where("userId", "==", user.userId)
   .get();

   return  result.docs.map((item) => ({
    ...item.data(),
    docId : item.id
  }));
}

export async function isUserFollowingProfile(loggedInUserUsername, profileuserId){
  const result = await firebase
  .firestore()
  .collection('users')
  .where('username', '==', loggedInUserame)
  .where('following', 'array-contains', profileuserId)
  .get()

  const [response = {}] = results.docs.map((item)=> ({
    ...item.data(),
    docId: item.id  
  }))


}

export async function toggleFollow(isFollowingProfile, activeUserDocId, profileDocId, 
  profileUserId, followingUserId){
    await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile);
    await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowingProfile)
  }