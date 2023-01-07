import React, { useState, useEffect } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import '../css/Theater.css';
import TheaterInfo from "./TheaterInfo";

import { API_BASE_URL } from "../config/host-config";
export const BASE_URL = API_BASE_URL + '/api/theater';

const Theater = () => {

    const [locationId, setLocationID] = useState('Seoul');
    const [itemList, setItemList] = useState([]);
    const [theaterID, setTheaterID] = useState([]);
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

    function click(elem) {
        console.log('클릭 작동 elem: ',elem);
        setTheaterID(elem.dataset.id);
        // console.log('theaterID: ', theaterID);
        
    }

    function clickInfoHandler(e) {
        click(e.target);

        fetch(`${BASE_URL}/${locationId}/${theaterID}`)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            setTheater(json.theaters);
        })

    }

    useEffect(() => {

        console.log('지점 정보 불러옴!~');
        // 지점 정보 불러오기
        fetch(`${BASE_URL}/${locationId}`)
        .then(res => res.json())
        .then(json => {
            console.log('theater: ', json.theaters);
            setItemList(json.theaters);
            }
        );
    }, [locationId]);



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
                                        <Link to={`/theaters/${item.theaterID}`} data-id={item.theaterID} onClick={clickInfoHandler}>{item.theaterNm}점</Link>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </div>

            {/* 지점 상세정보 */}
            <h2 className="title">지점 상세정보</h2>
            <TheaterInfo theater={theater} />
            
        </div>
        </>
    );

};

export default Theater;