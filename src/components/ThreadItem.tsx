import { useNavigate } from "react-router-dom";
import { authUserType } from "../states/authUser/action";
import { FaComment, FaFeatherAlt, FaLaughBeam, FaRegLaughBeam, FaRegTired, FaTired } from "react-icons/fa";
import parser from 'html-react-parser'
import { threadItemType } from "./ThreadList";
import { useSelector } from "react-redux";
import { RootState } from "../states";


function ThreadItem({ thread, authUser, onVote }: { thread: threadItemType, authUser: authUserType | null, onVote: (threadId: string, votename: string | null) => void }) {

    const {
        leaderboard = []
    } = useSelector((states: RootState) => states)

    const navigate = useNavigate()
    const isUpVote = authUser !== null ? thread.upVotesBy.includes(authUser!.id) : false
    const isDownVote = authUser !== null ? thread.downVotesBy.includes(authUser!.id) : false

    const onVoteClick = (vote: string, event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()

        const votename = vote;

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

    console.log('ini leaderboard')
    console.log(leaderboard)

    return (
        <div className="bg-white px-4 py-2 container flex border border-effect rounded-xl gap-3">
            <div className="photoProfile">
                <img src={thread.user.avatar} alt={thread.user.id} className="rounded-full w-12" />
            </div>
            <div className="w-full">
                <div role='button' tabIndex={0} className="thread-item" onClick={onThreadClick} onKeyDown={onThreadPress}>
                    <div className="title flex">
                        <span className="font-bold">{thread.user.name}</span>{leaderboard.length > 0 && leaderboard[0].user.id === thread.ownerId ? <span className="px-1 text-plugins"><FaFeatherAlt size='1rem' /></span> : <span></span>}<span className="pl-2">{thread.user.email}</span>
                    </div>

                    <h1 className="font-semibold text-xl pb-4">{thread.title}</h1>
                    <h5 className="text-md pb-4">{parser(thread.body)}</h5>

                    <h5 className="pb-7">{thread.category}</h5>
                    <p className="text-sm text-gray-400">{thread.createdAt}</p>

                </div>
                <div>
                    <div className="talk-item__votes flex gap-4 py-2">

                        <button type="button" aria-label="vote" name='up-vote' onClick={event => onVoteClick('up-vote', event)}>
                            {(isUpVote && !isDownVote) ? <span><FaLaughBeam size='1.5rem' className="text-effect" /></span> : <span><FaRegLaughBeam size='1.5rem' className="text-effect" /></span>}
                        </button>



                        <button type="button" aria-label="vote" name='down-vote' onClick={event => onVoteClick('down-vote', event)} className="">
                            {(!isUpVote && isDownVote) ? <span><FaTired size='1.5rem' className="text-effect" /></span> : <span><FaRegTired size='1.5rem' className="text-effect" /></span>}
                        </button>

                        <span className="flex"><FaComment className="text-effect mr-2" size='1.5rem' />{thread.totalComments}</span>
                    </div>

                </div>
            </div>
        </div>
    )
}


export default ThreadItem;