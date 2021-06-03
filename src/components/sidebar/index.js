import useUser from '../../hooks/use-user'
import Suggestions from './suggestions'
import User from './user'


export default function Sidebar(){
   const {
       user : {fullName, username, userId}
   } = useUser();

    return <p>sidebar</p>;
}   