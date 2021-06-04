import {useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import {formatDistance} from 'date-fns' 
import Actions from './actions';
import { AddComment } from './add-comment'

export default function Comments({docId, comment: allComments, posted, commentInput}) {
    const [comments, setComments] = useState(allComments);

    return(
        <>
        <p>comment</p>
        </>
    );
}

Comments.propTypes = {
    docId: PropTypes.string.isRequired
    comments: PropTypes.array.isRequired
    postEd: PropTypes.number.isRequired
    commentInput: PropTypes.object.isRequired

}