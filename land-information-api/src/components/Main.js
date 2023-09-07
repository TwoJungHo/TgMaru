import React, { useEffect, useState, useRef } from "react";
import { FindByPolygon, recentViewFn } from "../NetworkUtils";
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

const { kakao } = window;

function Main() {
  const [map, setMap] = useState(null);
  const [netPolygon, setNetPolygon] = useState();
  const [juso,setJuso] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const isLoggedIn = !!localStorage.getItem('userId');
  const [recentView, setRecentView] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  const previousPolygonRef = useRef(null); // useRef로 변수 생성

  var mapTypes = {
    roadView: kakao.maps.MapTypeId.ROADVIEW,
    useDistrict: kakao.maps.MapTypeId.USE_DISTRICT,
  };

  function setOverlayMapTypeId() {
     var chkUseDistrict = document.getElementById("chkUseDistrict");
     setIsChecked(chkUseDistrict.checked);
    // 기본지도
    for (var type in mapTypes) {
      map.removeOverlayMapTypeId(mapTypes[type]);
    }
    // 지적편집도
    if (chkUseDistrict.checked) {
      map.addOverlayMapTypeId(mapTypes.useDistrict);
    }

  }

  useEffect(()=>{
  recentViewFn("GET", `http://localhost:8000/recentlist/findRecentList/${localStorage.getItem("userId")}`)
    .then((data) => {
    setRecentView(data)
    })
    if(!userLocation){
    return;
    }
  },[])

  useEffect(() => {

    

    let latlng;
    const container = document.getElementById("kakaoMaps");
    const options = {
      center: new kakao.maps.LatLng(37.58627147691941, 126.97291695278227),
    };
    const kakaoMap = new kakao.maps.Map(container, options);

    // 지도 타입 변경 컨트롤을 생성한다
    const mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도의 상단 우측에 지도 타입 변경 컨트롤을 추가한다
    kakaoMap.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);


    setMap(kakaoMap);

    kakao.maps.event.addListener(kakaoMap, "click", function (mouseEvent) {
      latlng = mouseEvent.latLng;

      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.coord2Address(latlng.getLng(), latlng.getLat(), function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          const address = result[0].address.address_name;
          setJuso(address);
          const dto = {
            category: "jibun",
            address: address,
            userId : window.localStorage.getItem("userId")
          };
          FindByPolygon("POST", `http://localhost:8000/mapinfo/findpnu`, dto).then((data) => {
            setNetPolygon(data);
          });

          // 로그인 상태인 경우에만 함수 실행
          if(isLoggedIn){
          recentViewFn("GET", `http://localhost:8000/recentlist/findRecentList/${localStorage.getItem("userId")}`)
          .then((data)=>{
            setRecentView(data)
          });
          }
        }
      });
    });
  }, [isLoggedIn]);

  useEffect(() => {
    if (!map || !netPolygon) {
      return;
    }

    if (previousPolygonRef.current) {
      previousPolygonRef.current.setMap(null); // 이전 다각형을 지도에서 제거
    }

    const polygonCoords = netPolygon.map(coord => new kakao.maps.LatLng(coord[1], coord[0]));
    const newPolygon = new kakao.maps.Polygon({
      map: map,
      path: polygonCoords,
      fillColor: "rgba(255, 0, 0, 0.5)",
      strokeWeight: 3,
      strokeColor: "rgba(255, 0, 0, 0.8)",
    });

    previousPolygonRef.current = newPolygon; // previousPolygon 업데이트

    kakao.maps.event.addListener(newPolygon, "click", function () {
      newPolygon.setOptions({
        fillColor: "rgba(255, 0, 0, 0.5)",
        strokeColor: "rgba(255, 0, 0, 0.8)",
      });
    });

  }, [map, netPolygon]);

  return (
    <div>
      <header className="Main-header">
        <div style={{ display: "flex", justifyContent: "center"}}>
          {/* 왼쪽에 배치될 요소 */}
          <div style={{ display: "inline-block", width: "500px", padding: "10px", backgroundColor: "black", height:"915px"}}>
            <h2 style={{textAlign:"center"}}><Badge bg="dark">선택한 주소</Badge></h2>
            <Button style={{margin:"auto", display:"block"}} variant="outline-success">{juso !== null ? juso : '주소'}</Button><br/>
            <Button style={{margin:"auto", display:"block"}} variant="outline-primary">{juso !== null ? '자세히보기' : '지도 클릭시 활성화'}</Button>
            <br/><br/><br/>
            <h2 style={{color:"white", textAlign:"center"}}>최근 본 목록</h2><br/>
            {isLoggedIn ? (
              // 로그인 상태일 때 표시될 내용
              <p style={{fontSize:"20px", color:"white", textAlign:"center"}}>
                {recentView.map((item, index) => (
        <li key={index}>{item.address}</li>
      ))}
              </p>
              
            ) : (
              // 로그인 상태가 아닐 때 표시될 내용
              <p style={{fontSize:"20px", color:"white", textAlign:"center"}}>로그인시 활성화됩니다.</p>
            )}
          </div>
  
          <div style={{ position: "relative", width: "100%", height: "800px" }}>
            <div id="kakaoMaps" style={{ width: "100%", height: "915px" }}></div>
            {/* 버튼 컨테이너 */}
            <div style={{ position: "absolute", top: "10px", zIndex: 100 }}>
              <label className="checkbox-container" htmlFor="chkUseDistrict">
                <input className="checkmark" type="checkbox" id="chkUseDistrict" onClick={setOverlayMapTypeId} />
                <p style={{fontSize:"20px"}}>
                  <Badge bg="dark">{isChecked ? '지적편집도 비활성화' : '지적편집도 활성화'}</Badge>
                </p>
              </label>
            </div>
          </div>
        </div>
        <p style={{textAlign:"center", backgroundColor:"black", color:"white"}}>본 지도의 표시되는 지적은 사실과 다를 수 있습니다</p>  
      </header>
    </div>
  );
  
}

export default Main;
