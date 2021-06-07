import { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Photos from './photos';
import { getUserPhotosByUsername} from '../services/firebase'

const reducer = (state, newState) => ({...state, ...newState});
const initialState = {
    profile: {},
    profileCollection: [],
    followerCount: 0
};

export default function Profile({user}) {
     const [{profile, photosCollection, followerCount}, dispatch] =
     useReducer(reducer, initialState);

     useEffect(()=> {
         async function getProfileInfoAndPhotos(){
             const photos = getUserPhotosByUsername(user.username);
             dispatch({profile: user, photosCollection: photos, followerCount: user.followers.length})
         }
         getProfileInfoAndPhotos();
     }, [user.username])

     return <><Header/></Header></>
}

Profile.PropTypes = {
    user: PropTypes.shape({
        dateCreated: PropTypes.number.isRequired,
        emailAddress: PropTypes.string.isRequired,
        followers: PropTypes.array.isRequired,
        following: PropTypes.array.isRequired,
        fullName: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
    }).isRequired 
};