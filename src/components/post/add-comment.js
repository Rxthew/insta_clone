import {useState, useContext} from 'react';
import PropTypes from 'prop-tyes';
import FirebaseContext from 'firebase';
import UserContext from '../../context/user';

export default function AddComment({docId, comments, setComments, commentInput})
   const [comment, setComment] = useState('');
   const [firebase, FieldValue] = useContext(FirebaseContext)
   const {
       user : { displayName}
   } = useContext(userContext);
   
   const handleSubmitComment = (event) => {
       event.preventDefault(); 

       setComments([{displayName, comment}, ...comments]);
       setComment('');

       return firebase
       .firestore()
       .collection('photos')
       .doc(docId)
       .update({
           comments : FieldValue.arrayUnion(displayName,comment)
       })
   }

AddComment.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    setComments: PropTypes.func.isRequired,
    commentInput: PropTypes.object
}