import { ActionType, authUserType } from "./action";

function authUserReducer(authUser: authUserType | null = null, action: { type: string, payload?: { authUser: authUserType } }) {
    switch (action.type) {
        case ActionType.SET_AUTH_USER:
            return action.payload?.authUser;
        case ActionType.UNSET_AUTH_USER:
            return null;
        default:
            return authUser;
    }
}

export default authUserReducer;