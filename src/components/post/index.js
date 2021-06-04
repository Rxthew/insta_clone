import { useRef } from 'react';
import PropTypes from 'prop-types';
import Actions from './actions'; 

export default function Post() {
   const commentInput = useRef(null); 

   const handleFocus = () => commentInput.current.focus()
    
    return <p>Postman</p>
}

Post.propTypes = {
    content: PropTypes.shape({
        username: PropTypes.string.isRequired
        imageSrc: PropTypes.string.isRequired
        caption: PropTypes.string.isRequired
        docId: PropTypes.string.isRequired
        userLikedPhoto: PropTypes.bool.isRequired
        likes: PropTypes.array.isRequired
        comments: PropTypes.array.isRequired
        dateCreated: PropTypes.number.isRequired
    })
}