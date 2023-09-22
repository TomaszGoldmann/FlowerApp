import {Navigate} from "react-router-dom";
import {useUser} from "../Provider";

export const PrivateRoute = ({ children }) => {
    const { user } = useUser();

    console.log(user)
    if (!user) {
        return <Navigate to={"/Login"} />
    }


    return children;
}
