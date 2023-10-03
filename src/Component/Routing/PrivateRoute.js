import {Navigate} from "react-router-dom";
import {useUser} from "../Provider";
import {useContext} from "react";
import MyContext from "../../myContext";

export const PrivateRoute = ({ children }) => {
    const { user } = useUser();
    const {setInfo} = useContext(MyContext)

    if (!user) {
        setInfo("Aby złożyć zamówienie musisz być zalogowny")
        return <Navigate to={"/Login"} />
    }

    return children;
}
