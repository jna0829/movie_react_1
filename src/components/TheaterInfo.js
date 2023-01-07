import theaterImg from '../img/theater.jpg';
import '../css/TheaterInfo.css';

const TheaterInfo = ({theater}) => {


    return(
        <>
        <h3 className="theaterTit">{theater.theaterNm}점</h3>
        <div className="theaterTab">
            <div className="box-img">
                <img className="theaterImg" src={theaterImg} />
                <div className="box-contents">
                    <strong className="title">
                        주소 : {theater.address} <br/>
                        전화번호 : {theater.tell}
                    </strong>
                </div>
            </div>
        </div>
        </>
    );
};

export default TheaterInfo;