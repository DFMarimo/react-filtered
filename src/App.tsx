import {Route, Routes} from "react-router";
import Home from "./pages/Home/Home.tsx";
import MainContent from "./components/main/MainContent.tsx";
import ProductPage from "./components/productPage/ProductPage.tsx";

function App() {
    return (
        <>
            <Routes>
                <Route element={<Home/>}>
                    <Route index element={<MainContent/>}></Route>
                    <Route path={"/product/:id"} element={<ProductPage/>}></Route>
                </Route>
            </Routes>
        </>
    )
}

export default App
