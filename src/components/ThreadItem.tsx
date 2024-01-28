import { useNavigate } from "react-router-dom";
import { authUserType } from "../states/authUser/action";
import { threadType } from "../states/threads/action";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import parser from 'html-react-parser'


function ThreadItem({ thread, authUser, onVote }: { thread: threadType, authUser: authUserType | null, onVote: (threadId: string, votename: string | null) => void }) {
    const navigate = useNavigate()
    const isUpVote = authUser === null ? false : thread.upVoteBy.includes(authUser.id)
    const isDownVote = authUser === null ? false : thread.downVoteBy.includes(authUser.id)

    const onVoteClick = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        const votename = (event.target as HTMLElement).getAttribute('name');

        onVote(thread.id, votename)
    }

    const onThreadClick = () => {
        navigate(`/thread/${thread.id}`)
    }

    const onThreadPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === '') {
            navigate(`/thread/${thread.id}`)
        }
    }

    return (
        <div role='button' tabIndex={0} className="thread-item" onClick={onThreadClick} onKeyDown={onThreadPress}>
            <h1>{thread.title}</h1>
            <p>{parser(thread.body)}</p>
            <div>
                <p>{thread.category}</p>
                <p>{thread.createdAt}</p>
            </div>
            <div>
                <div className="talk-item__votes">
                    <p>
                        <button type="button" aria-label="vote" name='up-vote' onClick={onVoteClick}>
                            {(isUpVote && !isDownVote) ? <span>UpVote<FaHeart style={{ color: 'red' }} /></span> : <span>UpVote<FaRegHeart /></span>}
                        </button>
                        {' '}
                        {/* {thread.upVoteBy.length} */}
                    </p>
                    <p>
                        <button type="button" aria-label="vote" name='down-vote' onClick={onVoteClick}>
                            {(!isUpVote && isDownVote) ? <span>DownVote<FaHeart style={{ color: 'red' }} /></span> : <span>DownVote<FaRegHeart /></span>}
                        </button>
                        {' '}
                        {/* {thread.downVoteBy.length} */}
                    </p>
                    <p>Total Comment : {thread.totalComments}</p>
                </div>
            </div>
        </div>
    )
}


export default ThreadItem;