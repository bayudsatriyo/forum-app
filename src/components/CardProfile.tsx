import { authUserType } from "../states/authUser/action";

function CardProfile({ authUser }: { authUser: authUserType }) {
    return (
        <div className="cardProfile  border border-blue-500 pt-5 pb-20 h-fit backdrop-filter rounded-xl backdrop-brightness-95 backdrop-opacity-70 backdrop-blur-sm  ">
            <div className="card flex flex-col text-center gap-4  ">
                <div className="profile">
                    <img src={authUser.avatar} alt={authUser.id} className="w-1/2 mx-auto rounded-full " />
                </div>

                <h4 className="text-xl font-bold">{authUser.name}</h4>
                <div className="cardname flex flex-col">
                    <div className="nameuser bg-slate-50 mx-10 p-5 rounded-lg shadow-lg">
                        <p>{authUser.email}</p>
                        <p>{authUser.id}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardProfile;