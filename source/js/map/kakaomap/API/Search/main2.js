// 카카오 맵 관리 설정
// [x] 카카오 맵 API사이트에서 제공하는 기본 지도 HTML를 가져온다.
// [x] 카카오 개발자 사이트에가서 내 애플리케이션에 Test용도를 만들어준다.
// [x] 웹으로 만들거니깐 JavaScript 키값을 'appkey=발급받은 APP KEY를 사용하세요'라는 곳에 수정합니다.
// [x] 카카오 개발자 사이트에 플랙폼 탭에서 테스트 할 해당 주소를 추가해야 합니다. ex) http://127.0.0.1:5500

// 카카오 맵 API 사용
// [x] 마커에 인포윈도우 표시하기
// [x] 마커 정보(data)가 담겨져 있는 JSON파일 만들기
// [x] JSON파일을 async await fetch를 통해서 가져와 화면에 뿌려줍니다.
// [x] 마커 클러스터러 라이브러리 사용하기 (카카오맵 API에서 제공)
// [x] 지도에서 마커 마우스 오버할때만 인포윈도우를 표시되게 하기

(() => {
  const mapContainer = document.getElementById("map"), // 지도를 표시할 div
    mapOption = {
      center: new kakao.maps.LatLng(37.56682, 126.97865), // 지도의 중심좌표
      level: 4, // 지도의 확대 레벨
      mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
    };

  // 지도를 생성한다
  const map = new kakao.maps.Map(mapContainer, mapOption);

  // 마커 클러스터러를 생성합니다
  new kakao.maps.MarkerClusterer({
    map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
    averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
  });

  // 지도에 마커와 인포윈도우를 표시하는 함수입니다
  function displayMarker(locPosition, message) {
    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      map: map,
      position: locPosition, // 현재위치의 마커 입니다.!!
    });

    const iwContent = message, // 인포윈도우에 표시할 내용
      iwRemoveable = false;

    // 인포윈도우를 생성합니다
    const infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
      removable: iwRemoveable,
    });

    // 인포윈도우를 마커위에 표시합니다
    infowindow.open(map, marker);

    // 지도 중심좌표를 접속위치로 변경합니다
    map.setCenter(locPosition);
  }

  // geolocation true 기능 //
  const geolocationT = () => {
    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
    navigator.geolocation.getCurrentPosition(function (position) {
      const { latitude, longitude } = position.coords;
      const locPosition = new kakao.maps.LatLng(latitude, longitude), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
        message = '<div style="padding:5px;">지금 여기에 계십니다.!!</div>'; // 인포윈도우에 표시될 내용입니다

      // 마커와 인포윈도우를 표시합니다
      displayMarker(locPosition, message);
    });
  };
  // geolocation true 기능 //
  // geolocation false 인경우 기능 //
  const geolocationF = () => {
    const locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
      message = "geolocation을 사용할수 없어요..";

    displayMarker(locPosition, message);
  };
  // geolocation false 인경우 기능 //

  const imageSrc =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
  const base_url = "./data2.json";
  const getData = async () => {
    const res = await fetch(base_url);
    return res.text();
  };

  const init = async () => {
    const db = JSON.parse(await getData());
    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
    if (navigator.geolocation) {
      geolocationT();
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      geolocationF();
    }

    // data.json있는 데이터 불러와 뿌려준다. //
    db.data.forEach((item, i) => {
      const { name, positions } = item;

      // 마커 이미지의 이미지 크기 입니다
      const imageSize = new kakao.maps.Size(24, 35);

      // 마커 이미지를 생성합니다
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성합니다
      const marker = new kakao.maps.Marker({
        map: map, // 인포윈도우가 표시될 지도
        position: new kakao.maps.LatLng(positions[0], positions[1]),
        image: markerImage, // 마커 이미지
      });

      // 인포윈도우를 마커위에 표시합니다
      //   infowindow.open(map, marker);
      marker.setMap(map);
      console.log(marker);

      // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      const temp_html = `<div class="customoverlay">
                        <a href="https://map.kakao.com/link/map/${name},${positions[0]},${positions[1]}"" target="_blank">
                            <span class="title">${name}</span>
                        </a></div>`;

      // 커스텀 오버레이를 생성합니다
      new kakao.maps.CustomOverlay({
        map: map,
        position: new kakao.maps.LatLng(positions[0], positions[1]),
        content: temp_html,
        yAnchor: 1,
      });
    });
    // data.json있는 데이터 불러와 뿌려준다. //
  };

  init();
})();
