import React, { useEffect, useState } from "react";
import { FindByPnu } from "../NetworkUtils";
const { kakao } = window;

function Main() {
  const [map, setMap] = useState(null);

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

    setMap(kakaoMap);

    kakao.maps.event.addListener(kakaoMap, "click", function (mouseEvent) {
      latlng = mouseEvent.latLng;

      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.coord2Address(
        latlng.getLng(),
        latlng.getLat(),
        function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            const address = result[0].address.address_name;
            console.log("주소는 : " + address);
            const encodedAddress = encodeURIComponent(address);
            FindByPnu(
              "GET",
              `https://map.vworld.kr/search.do?category=jibun&q=${encodedAddress}&pageunit=10&output=json&pageindex=1&apiKey=4FB88625-7D2E-36D5-9AE9-F6401DF87374`
            ).then((data) => {
              console.log(data);
            });
          }
        }
      );
    });
  }, []);

  useEffect(() => {
    const polygon = new kakao.maps.Polygon({
      map: map,
      path: [
        new kakao.maps.LatLng(37.58627147691941, 126.97291695278227),
        new kakao.maps.LatLng(37.586157217822496, 126.97319465456775),
        new kakao.maps.LatLng(37.58607386650917, 126.97311492351132),
        new kakao.maps.LatLng(37.58603000840896, 126.97301058647821),
        new kakao.maps.LatLng(37.58601453238504, 126.97298533328807),
        new kakao.maps.LatLng(37.5859909222094, 126.97296732921032),
        new kakao.maps.LatLng(37.58602020289903, 126.97296178163238),
        new kakao.maps.LatLng(37.58609628733498, 126.97294609440449),
        new kakao.maps.LatLng(37.58611291869937, 126.97294266883853),
        new kakao.maps.LatLng(37.58621086899864, 126.97292263692108),
        new kakao.maps.LatLng(37.586252376172965, 126.97291756015134),
      ],
      fillColor: "rgba(255, 0, 0, 0.5)",
      strokeWeight: 3,
      strokeColor: "rgba(255, 0, 0, 0.8)",
    });

    kakao.maps.event.addListener(polygon, "click", function () {
      polygon.setOptions({
        fillColor: "rgba(255, 0, 0, 0.5)",
        strokeColor: "rgba(255, 0, 0, 0.8)",
      });
    });
  }, [map]);

  return (
    <div>
      <h2>Text</h2>
      <div id="kakaoMaps" style={{ width: "1200px", height: "800px" }}></div>
      <input
        type="checkbox"
        id="chkUseDistrict"
        onClick={setOverlayMapTypeId}
      />
      지적편집도
      <input type="checkbox" id="chkroadView" onClick={setOverlayMapTypeId} />
      로드뷰
    </div>
  );
}

export default Main;
