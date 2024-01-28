import { ActionType } from "./action";

interface ActionTypeLoad {
    type: string,
    payload?: {
        isPreload: boolean
    },
}

function isPreloadReducer(isPreload: boolean = true, action: ActionTypeLoad) {
    switch (action.type) {
        case ActionType.SET_IS_PRELOAD:
            return action.payload!.isPreload;
        default:
            return isPreload;
    }
}

export default isPreloadReducer;