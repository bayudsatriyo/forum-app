import { useNavigate } from "react-router-dom";
import { authUserType } from "../states/authUser/action";
import { threadType } from "../states/threads/action";
import { FaLaughBeam, FaRegLaughBeam, FaRegTired, FaTired } from "react-icons/fa";
import parser from 'html-react-parser'


function ThreadItem({ thread, authUser, onVote }: { thread: threadType, authUser: authUserType | null | undefined, onVote: (threadId: string, votename: string | null) => void }) {
    console.log(thread)
    const navigate = useNavigate()
    const isUpVote = authUser !== null ? thread.upVotesBy.includes(authUser!.id) : false
    const isDownVote = authUser !== null ? thread.downVotesBy.includes(authUser!.id) : false

    console.log(thread.upVotesBy)

    const onVoteClick = (vote: string, event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()

        const votename = vote;
        console.log(votename)
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
        <div className="bg-white px-4 py-2 container flex">
            <div className="photoProfile w-1/4">
                <img src="" alt="" />
            </div>
            <div className="border w-full">
                <div role='button' tabIndex={0} className="thread-item" onClick={onThreadClick} onKeyDown={onThreadPress}>
                    <h1 className="font-bold text-xl pb-4">{thread.title}</h1>
                    <h5 className="text-md pb-4">{parser(thread.body)}</h5>

                    <h5 className="pb-7">{thread.category}</h5>
                    <p className="text-sm text-gray-400">{thread.createdAt}</p>

                </div>
                <div>
                    <div className="talk-item__votes flex gap-4 py-2">

                        <button type="button" aria-label="vote" name='up-vote' onClick={event => onVoteClick('up-vote', event)}>
                            {(isUpVote && !isDownVote) ? <span><FaLaughBeam size='1.5rem' className="text-sky-600" /></span> : <span><FaRegLaughBeam size='1.5rem' className="text-sky-600" /></span>}
                        </button>



                        <button type="button" aria-label="vote" name='down-vote' onClick={event => onVoteClick('down-vote', event)} className="w-20">
                            {(!isUpVote && isDownVote) ? <span><FaTired size='1.5rem' className="text-sky-600" /></span> : <span><FaRegTired size='1.5rem' className="text-sky-600" /></span>}
                        </button>
                    </div>
                    <h5>Total Comment : {thread.totalComments}</h5>
                </div>
            </div>
        </div>
    )
}


export default ThreadItem;