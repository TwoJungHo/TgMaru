import React, { useEffect, useState } from "react";
const { kakao } = window;

function Main() {
  const [map, setMap] = useState(null);
  const [drawingManager, setDrawingManager] = useState(null);

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
    const container = document.getElementById("kakaoMaps");
    const options = { center: new kakao.maps.LatLng(33.450701, 126.570667) };
    const kakaoMap = new kakao.maps.Map(container, options);
    setMap(kakaoMap);

    const manager = new kakao.maps.drawing.DrawingManager({
      map: kakaoMap,
      drawingMode: [kakao.maps.drawing.OverlayType.POLYLINE],
      polylineOptions: {
        draggable: true,
        removable: true,
        editable: true,
        strokeColor: "#39f",
        strokeWeight: 3,
      },
    });
    setDrawingManager(manager);
  }, []);

  useEffect(() => {
    if (drawingManager) {
      const handleClick = (mouseEvent) => {
        const latlng = mouseEvent.latLng;
        const geocoder = new kakao.maps.services.Geocoder();

        geocoder.coord2Address(
          latlng.getLng(),
          latlng.getLat(),
          (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              if (result[0]) {
                const address = result[0].address.address_name;
                console.log(address); //선택한 위치에 대한 주소가 나옴
                console.log(latlng); // 위도 경도
              }
            }
          }
        );
      };
      kakao.maps.event.addListener(map, "click", handleClick);
    }
  }, [drawingManager, map]);

  useEffect(() => {
    if (drawingManager) {
      kakao.maps.event.addListener(
        drawingManager,
        "polygoncomplete",
        (polygon) => {
          const path = polygon.getPath();

          const selectedArea = new window.kakao.maps.Polygon({
            path: path,
            fillColor: "rgba(255, 0, 0, 0.5)",
            strokeWeight: 3,
            strokeColor: "rgba(255, 0, 0, 0.8)",
            map: map,
          });

          polygon.setOptions({
            fillColor: "rgba(0, 255, 0, 0.5)",
            strokeColor: "rgba(0, 255, 0, 0.8)",
          });

          kakao.maps.event.addListener(selectedArea, "click", function () {
            selectedArea.setOptions({
              fillColor: "rgba(255, 0, 0, 0.5)",
              strokeColor: "rgba(255, 0, 0, 0.8)",
            });
          });
        }
      );
    }
  }, [drawingManager, map]);

  return (
    <div>
      <h2>Text</h2>
      <div id="kakaoMaps" style={{ width: "100%", height: "800px" }}></div>
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
