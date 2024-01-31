
import { FaAngleDown } from "react-icons/fa";
import { authUserType } from "../states/authUser/action";

function Naviation({ authUser }: { authUser: authUserType | null }) {
    function HamburgerTogggle() {
        const hamburger = document.getElementById("hamburger");
        const NavMenu = document.querySelector("#nav-menu");

        hamburger!.classList.toggle("hamburger-active");
        NavMenu!.classList.toggle("hidden");
    }

    return (
        <div className="container py-4 px-4 bg-white">
            <div className="navigation flex justify-between">
                <div className="logos">
                    <h1 className="font-bold text-xl text-plugins">Gibah Apps</h1>
                </div>

                <div className="navbar flex gap-5">
                    <select name="translate" id="translate" className="rounded-lg bg-layout px-2">
                        <option value="id">Indonesia</option>
                        <option value="en">English</option>
                    </select>
                    <div className="tool flex bg-layout rounded-full px-2 py-1">
                        {authUser !== null && <img src={authUser.avatar} alt={authUser.name} title={authUser.name} className="w-10 rounded-full" />}
                        <div className="">
                            <button type="button" id="hamburger" name="hamburger" onClick={HamburgerTogggle}><span className="hamburger-line transition duration-300 ease-in-out origin-center -rotate-90 h-5"><FaAngleDown size='1.5rem' /></span></button>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}


/* <h2>{authUser?.name}</h2>
<h3>{authUser?.email.split('@gmail.com')}</h3> */

export default Naviation;