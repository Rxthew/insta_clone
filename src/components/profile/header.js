import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Skeleton from  'react-loading-skeleton';
import useUser from '../../hooks/use-user';
import { isUserFollowingProfile, toggleFollow } from '../../services/firebase';

export default function Header({photosCount, profile : {
    docId: profileDocId, userId: profileUserId, fullName, following = [], followers=[], username: profileUsername
}, followerCount, setFollowerCount}){
    const { user } = useUser();
    const [isFollowingProfile, setisFollowingProfile] = useState(false)
    const activeBtnFollow = user.username && user.username != profileUsername
    
    const handleToggleFollow = async () => {
        setIsFollowingProfile((isFollowingProfile)=> !isFollowingProfile)
        setFollowerCount({
            followerCount: isFollowingProfile ? followercount - 1 : followercount + 1
        })
    }
    await toggleFollow(isFollowingProfile, user.docId, profileDocId, profileUserId, user.userId)

    useEffect(() => {
        const isLoggedInUserFollowingProfile = async () => {
          const isFollowing= await isUserFollowingProfile{user.username, profileUserId}
            setIsFollowingProfile(!!isFollowing);
        }
        if (user.username && profileUserId){
            isLoggedInUserFollowingProfile()
        }
    }, [user.username, profileUserId])

    return null
}

Header.propTypes = {
    photosCount: PropTypes.number.isRequired,
    followerCount: PropTypes.number.isRequired,
    setFollowerCount: PropTypes.func.isRequired,
    profile: PropTypes.shape({
        docId: PropTypes.string,
        username: PropTypes.string,
        userId: PropTypes.string,
        fullName: PropTypes.string,
        following: PropTypes.array,
        followers: PropTypes.array

    }).isRequired
};