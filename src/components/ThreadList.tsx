import { authUserType } from "../states/authUser/action";
import { threadType } from "../states/threads/action";
import ThreadItem from "./ThreadItem";


function ThreadList({ threads, authUser, onVote }: { threads: Array<threadType>, authUser: authUserType | null | undefined, onVote: (threadId: string, votename: string | null) => void }) {


    console.log(threads)
    return (
        <div className="thread-list flex flex-col gap-10">
            {threads.map((threadItem) => (

                <ThreadItem key={threadItem.id} thread={threadItem} authUser={authUser} onVote={onVote} />
            ))}
        </div>
    )
}

export default ThreadList;