import { useEffect, useState } from "react";
import { User } from "../model/User";
import { getUsers } from "../services/userService";

export const UseUsers = () => {
    const [users, setUsers] = useState<User[]>([]);

    const getAllUsers = () => {
        getUsers()
            .then(u => setUsers(u))
            .catch(e => console.log(e));
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    return users;
}