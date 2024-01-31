import { authUserType } from "../authUser/action"


export interface typeLeaderboard {
    user: authUserType,
    score: number
}

const ActionType = {
    RECEIVE_LEADERBOARD: 'RECEIVE_LEADERBOARD'
}

function receiveLeaderboardActionCreator(leaderboard: Array<typeLeaderboard>) {
    return {
        type: ActionType.RECEIVE_LEADERBOARD,
        payload: {
            leaderboard,
        }
    }
}

export { receiveLeaderboardActionCreator, ActionType }