import {useSelector} from "react-redux";
import {allStat} from "../../reducers";

const Index = () => {
    const token: string = useSelector((state: allStat) => state.token) || ""

    return(
        <div>
            {"token: " + token}
        </div>
    )
}

export default Index