import React, { useEffect, useState, useRef } from "react";
import { FindByPolygon } from "../NetworkUtils";
const { kakao } = window;

function Main() {
  const [map, setMap] = useState(null);
  const [netPolygon, setNetPolygon] = useState();
  const [juso,setJuso] = useState();

  const previousPolygonRef = useRef(null); // useRef로 변수 생성

  var mapTypes = {
    roadView: kakao.maps.MapTypeId.ROADVIEW,
    useDistrict: kakao.maps.MapTypeId.USE_DISTRICT,
  };

  function setOverlayMapTypeId() {
    var roadView = document.getElementById("chkroadView"),
      chkUseDistrict = document.getElementById("chkUseDistrict");

    // 기본지도
    for (var type in mapTypes) {
      map.removeOverlayMapTypeId(mapTypes[type]);
    }
    // 지적편집도
    if (chkUseDistrict.checked) {
      map.addOverlayMapTypeId(mapTypes.useDistrict);
    }

    // 로드뷰
    if (roadView.checked) {
      map.addOverlayMapTypeId(mapTypes.roadView);
    }
  }

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
          };
          FindByPolygon("POST", `http://localhost:8000/pnu/findpnu`, dto).then((data) => {
            setNetPolygon(data);
          });
        }
      });
    });
  }, []);

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
    <div style={{backgroundColor:"whitesmoke", height:"875px"}}>
    <div style={{display:"flex",justifyContent:"center",height:"auto"}}>
      <div style={{display:"inline-table", width:"300px"}}>
      <h2>선택한 주소</h2>
      <p>{juso}</p>
      <h1>4/1만 차지하게</h1>
      <h1>4/1만 차지하게</h1>
      
      </div>
        
      <div id="kakaoMapsContainer" style={{ position: "relative", width: "70%", height: "800px" }}>
        <div id="kakaoMaps" style={{ width: "100%", height: "100%" }}></div>
        {/* 버튼 컨테이너 */}
        <div style={{ position: "absolute", top: "40px", right: "10px", zIndex: 100 }}>
          {/* zIndex 값을 높게 설정하여 다른 요소 위에 올라오도록 함 */}
          <input type="checkbox" id="chkUseDistrict" onClick={setOverlayMapTypeId} />
          지적편집도<br/>
          <input type="checkbox" id="chkroadView" onClick={setOverlayMapTypeId} />
          로드뷰
        </div>
      </div>
      </div>
    </div>
  );
}

export default Main;
