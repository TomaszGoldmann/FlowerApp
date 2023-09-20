import {Navigate} from "react-router-dom";
import {useUser} from "./provider";

export const PrivateRoute = ({ children }) => {
    const { user } = useUser();

    console.log(user)
    if (!user) {
        return <Navigate to={"/login"} />
    }


    return children;
}
