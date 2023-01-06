import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../css/Theater.css';
import TheaterInfo from "./TheaterInfo";

import { API_BASE_URL } from "../config/host-config";
export const BASE_URL = API_BASE_URL + '/api/theater';

const Theater = () => {

    const [locationId, setLocationID] = useState('Seoul');
    const [itemList, setItemList] = useState([]);
    const [theaterID, setTheaterID] = useState('1-1');
    const [theater, setTheater] = useState([]);
    const [currentMenu, setCurrentMenu] = useState({});

    // 메뉴 지역 클릭 활성화 기능
    function activate(elem) {
        // console.log('activate 작동!! elem: ', elem);
        [...document.querySelector('.btn-group').children].forEach(btn => {
            if (btn.classList.contains('menu-active')) {
                btn.classList.remove('menu-active');
            }
        });

        elem.classList.add('menu-active');
        setCurrentMenu(elem);

        setLocationID(elem.dataset.loc);
    }

    function clickMenuHandler(e) {
        activate(e.target);
    };

    useEffect(() => {
        // 지점 정보 불러오기
        fetch(`${BASE_URL}/${locationId}`)
        .then(res => res.json())
        .then(json => {
            console.log('theater: ', json.theaters);
            setItemList(json.theaters);
            }
        );
    }, [locationId]);

    useEffect(() => {
        fetch(`${BASE_URL}/${locationId}/${theaterID}`)
        .then(res => {
            return res.json()
        })
        .then(data => {
            setTheater(data);
        })
    }, [theaterID]);


    return(
        <>
        <div className="container">

            <h1 className="title">전체극장</h1>
            <div className="theater-box">
                <div className="btn-group">
                    <button className="location menu-active" data-loc='Seoul' onClick={clickMenuHandler} >서울</button>
                    {/* 서울을 초기 디폴트로 시작하기 위해 menu-active */}
                    <button className="location" data-loc='Gyeonggi' onClick={clickMenuHandler}>경기</button>
                    <button className="location" data-loc='Gangwon' onClick={clickMenuHandler}>강원</button>
                    <button className="location" data-loc='Gyeongbuk' onClick={clickMenuHandler}>경북</button>
                    <button className="location" data-loc='Gyeongnam' onClick={clickMenuHandler}>경남</button>
                </div>
                
                {/* Tab Content */}
                <div id={locationId} className="tabContent">
                    <ul>
                        {itemList.map(item => {
                                return (
                                    <li key={item.theaterID} >
                                        <Link to={`${item.theaterID}`}>{item.theaterNm}점</Link>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </div>

            {/* 지점 상세정보 */}
            <h2 className="title">지점 상세정보</h2>
            <h3 className="theaterTit">{theater.theaterNm}점</h3>
                <TheaterInfo theater={theater} key={theater.id} />
        </div>
        </>
    );

};

export default Theater;