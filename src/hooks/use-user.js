import { useState, useEffect, UseContext } from 'react';
import { UserContext } from '../context/user';
import { getUserByUserId} from '../services/firebase'

export default function useUser(){
    const [activeUser, setActiveUser] = useState({});
    const { user } = useContext(UserContext);

    useEffect (()=> {
        asyn function getUserObjectByUserId(){
            const [response] = await getUserByUserId(user, uid);
            setActiveUser(response);            
        }
        if (user?.uid){
            getUserObjectByUserId()
        }

    }, [user])

    return {user : ActiveUser}
}