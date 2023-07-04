import React, { useEffect, useState } from "react";
const { kakao } = window;

function Main() {
  const [map, setMap] = useState(null);
  const [drawingManager, setDrawingManager] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=1c2736880e154ad5c17fe5727c4e432e&libraries=services,clusterer,drawing";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      const { kakao } = window;
      const container = document.getElementById("kakaoMaps");
      const options = { center: new kakao.maps.LatLng(33.450701, 126.570667) };
      const kakaoMap = new kakao.maps.Map(container, options);
      setMap(kakaoMap);

      const manager = new kakao.maps.drawing.DrawingManager({
        map: kakaoMap,
        drawingMode: [kakao.maps.drawing.OverlayType.POLYGON],
        polygonOptions: {
          draggable: true,
          fillColor: "#39f",
          strokeColor: "#39f",
        },
      });
      setDrawingManager(manager);
    };
  }, []);

  useEffect(() => {
    if (drawingManager) {
      const handleClick = () => {
        drawingManager.start(kakao.maps.drawing.OverlayType.POLYGON);
      };
      kakao.maps.event.addListener(map, "click", handleClick);
    }
  }, [drawingManager]);

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

          const marker = new window.kakao.maps.Marker({
            position: path.getCenter(),
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
  }, [drawingManager]);

  return (
    <div>
      <h2>Text</h2>
      <div id="kakaoMaps" style={{ width: "99%", height: "500px" }}></div>
    </div>
  );
}

export default Main;
