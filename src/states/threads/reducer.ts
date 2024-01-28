import { ActionType, threadType } from "./action";

type payload = { threads: Array<threadType>, thread: threadType, threadId: string, vote: string, userId: string }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Action { type: string, payload?: payload | any }

function threadsReducer(threads: Array<threadType> = [], action: Action) {
    switch (action.type) {
        case ActionType.RECEIVE_THREADS:
            return action.payload?.threads;
        case ActionType.ADD_THREAD:
            return [action.payload?.thread, ...threads];
        case ActionType.TOGGLE_VOTE:
            return threads.map((thread) => {
                if (thread.id === action.payload?.threadId) {
                    if (action.payload.vote === 'up-vote') {
                        return {
                            ...thread,
                            upVoteBy: thread.upVoteBy.includes(action.payload.userId) ? thread.upVoteBy.filter((id) => id !== action.payload?.userId)
                                : thread.upVoteBy.concat([action.payload.userId]),
                            downVoteBy: thread.downVoteBy.includes(action.payload.userId) ? thread.downVoteBy.filter((id) => id !== action.payload?.userId) : thread.downVoteBy,
                        }
                    } else if (action.payload.vote === 'down-vote') {
                        return {
                            ...thread,
                            upVoteBy: thread.upVoteBy.includes(action.payload.userId) ? thread.upVoteBy.filter((id) => id !== action.payload?.userId)
                                : thread.upVoteBy,
                            downVoteBy: thread.downVoteBy.includes(action.payload.userId) ? thread.downVoteBy.filter((id) => id !== action.payload?.userId) :
                                thread.downVoteBy.concat([action.payload.userId])
                        }
                    } else {
                        return {
                            ...thread,
                            upVoteBy: thread.upVoteBy.includes(action.payload.userId) ? thread.upVoteBy.filter((id) => id !== action.payload?.userId)
                                : thread.upVoteBy,
                            downVoteBy: thread.downVoteBy.includes(action.payload.userId) ? thread.downVoteBy.filter((id) => id !== action.payload?.userId) : thread.downVoteBy,
                        }
                    }
                }
            })
        default:
            return threads;
    }
}

export default threadsReducer;