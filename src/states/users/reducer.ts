import { authUserType } from "../authUser/action";
import { ActionType } from "./action";



function usersReducer(users: Array<authUserType> = [], action: { type: string, payload?: { users: Array<authUserType> } } = { type: '', payload: { users: [] } }) {
    switch (action.type) {
        case ActionType.RECEIVE_USERS:
            return action.payload?.users;
        default:
            return users;
    }
}

export default usersReducer;