// 페이지 전환 담당
import React from "react";

// 라우팅에 사용할 라이브러리
import { Routes, Route } from "react-router-dom";
import App from "../App";
import Theater from "../components/Theater";


const AppRouter = () => {
    return (
        <>
            {/* <Header /> */}

            <Routes>
                {/* 뜻 : "/" 경로로 요청하면 App컴포넌트를 렌더링하세요 */}
                <Route path="/" element={<App />} />
                <Route path="/theaters" element={<Theater />} />
                {/* <Route path="/theaters/:theaterID" element={<Theater />} /> */}
            </Routes>
        </>
    );
};

export default AppRouter;

