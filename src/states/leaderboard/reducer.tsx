import { Action } from "../threads/reducer";
import { ActionType, typeLeaderboard } from "./action";

function leaderboardReducer(leaderboard: Array<typeLeaderboard> = [], action: Action = { type: '', payload: {} }) {
    if (action.type === ActionType.RECEIVE_LEADERBOARD) {
        return action.payload.leaderboard;
    }

    return leaderboard
}


export default leaderboardReducer;