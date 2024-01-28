import { authUserType } from "../states/authUser/action";
import { threadType } from "../states/threads/action";
import ThreadItem from "./ThreadItem";


function ThreadList({ threads, authUser, onVote }: { threads: Array<threadType>, authUser: authUserType | null, onVote: (threadId: string, votename: string | null) => void }) {
    return (
        <div className="thread-list">
            {
                threads.map((thread) => (
                    <ThreadItem thread={thread} authUser={authUser} onVote={onVote} />
                ))
            }
        </div>
    )
}

export default ThreadList;