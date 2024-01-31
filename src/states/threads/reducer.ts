import { ActionType, threadType } from "./action";

type payload = { threads: Array<threadType>, thread: threadType, threadId: string, vote: string, userId: string }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Action { type: string, payload?: payload | any }

function threadsReducer(threads: Array<threadType> = [], action: Action = { type: '', payload: {} }) {
    switch (action.type) {
        case ActionType.RECEIVE_THREADS:
            return action.payload?.threads;
        case ActionType.ADD_THREAD:
            return [action.payload?.thread, ...threads];
        case ActionType.TOGGLE_VOTE:
            return threads.map((thread: threadType) => {
                if (thread.id === action.payload?.threadId) {
                    if (action.payload.votename === 'up-vote') {
                        return {
                            ...thread,
                            upVotesBy: thread.upVotesBy.includes(action.payload.userId) ? thread.upVotesBy.filter((id) => id !== action.payload?.userId)
                                : thread.upVotesBy.concat([action.payload.userId]),
                            downVotesBy: thread.downVotesBy.includes(action.payload.userId) ? thread.downVotesBy.filter((id) => id !== action.payload?.userId) : thread.downVotesBy,
                        }
                    } else if (action.payload.votename === 'down-vote') {
                        return {
                            ...thread,
                            upVotesBy: thread.upVotesBy.includes(action.payload.userId) ? thread.upVotesBy.filter((id) => id !== action.payload?.userId)
                                : thread.upVotesBy,
                            downVotesBy: thread.downVotesBy.includes(action.payload.userId) ? thread.downVotesBy.filter((id) => id !== action.payload?.userId) :
                                thread.downVotesBy.concat([action.payload.userId])
                        }
                    } else {
                        return {
                            ...thread,
                            upVotesBy: thread.upVotesBy.includes(action.payload.userId) ? thread.upVotesBy.filter((id) => id !== action.payload?.userId)
                                : thread.upVotesBy,
                            downVotesBy: thread.downVotesBy.includes(action.payload.userId) ? thread.downVotesBy.filter((id) => id !== action.payload?.userId) : thread.downVotesBy,
                        }
                    }
                }
                return thread;
            })
        default:
            return threads;
    }
}

export default threadsReducer;