import {FC} from "react";
import Sidebar from "../../components/sidebar/Sidebar.tsx";
import {Outlet, Routes} from "react-router";

const Home: FC = () => {
    return <>
        <div className={"flex h-screen"}>
            <Sidebar></Sidebar>

            <div className="rounded w-full flex justify-between flex-wrap">
                <Outlet></Outlet>
            </div>
        </div>
    </>
}

export default Home;