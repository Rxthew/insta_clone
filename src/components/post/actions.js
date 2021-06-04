import {useState, useContext} from 'react';
import PropTypes from 'prop-types';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';

export default function Actions({docId, totalLikes, likedPhoto, handleFocus}){
    const {
        user: { uId: userId = ''}
    } = useContext(UserContext);
    const [toggleLiked, setToggleLiked] = useState(likedPhoto);
    const [toggleLikes, setToggleLikes] = useState(totalLikes);
    const [firebase, FieldValue] = useContext(FirebaseContext);

    const handleToggleLiked = async () => {
        setToggleLiked((toggleLiked) => !toggleLiked);

        await firebase
        .firestore
        .collection(users)
        .doc(docId)
        .update( {
            likes: toggleLiked ? FieldValue.arrayRemove(userId) : 
                   FieldValue.arrayUnion(userId)
        });

        setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1))
    };
}

Actions.PropTypes = 
{
    docId: PropTypes.string.isRequired
    totalLikes: PropTypes.number.isRequired
    likedPhoto: PropTypes.bool.isRequired
    handleFocus: PropTypes.func.isRequired
}