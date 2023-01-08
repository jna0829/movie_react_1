import '../css/Header.css';


const Header = () => {

    const USERNAME = localStorage.getItem('LOGGIN_USERNAME');

    //로그아웃 핸들러
    const logoutHandler = e => {
        //로컬스토리지 데이터 제거
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('LOGGIN_USERNAME');
        window.location.href='/login';
    };


    return (
        <header>
            <div className="header_content">
                <div className='logo'>
                    <a href='#'> logo </a>
                </div>
                <div className="nav">
                    <ul className='nav-menu'>
                        <li className='nav-open-menu'>
                            <a href='#'>영화</a>
                        </li>
                        <li className='nav-open-menu'>
                            <a href='#'>극장</a>
                        </li>
                        <li className='nav-open-menu'>
                            <a href='#'>예매</a>
                        </li>
                    </ul>
                </div> 
                <div className='mypage'>
                        <a href='#'>마이페이지</a>
                </div>
            </div>
        </header>
    );
};

export default Header;