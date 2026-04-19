import axios from "axios";

const api = axios.create({
    baseURL: `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}`,
});

/**
    interceptors : HTTP 요청이 서버로 전달 되기 전, 또는 서버 응답이 도착한 직후에 중간에서 가로채서 로직을 처리할 수 있는 기능
                   ex) 모든 요청을 서버로 전송하기 전에 토큰을 붙이기 위해 사용
    request / response : 인터셉트의 두 종류 중 하나.
              request -> 요청이 서버로 전송 되기 전에 가로채는 것
             response -> 서버에서 응답이 돌아온 직후 가로채는 것
    use() : "이 함수를 인터셉터로 등록해줘"라는 의미
            괄호 안에 구현한 콜백 함수를 매 요청마다 자동으로 실행함
    config : axios가 요청을 보낼 때 사용하는 설정 객체
             이 안에 URL, headers, method, body 등 요청에 필요한 모든 정보가 담겨 있음
 **/
/*e
 * 화살표 함수 => 기존 function 문법을 짧게 쓰는 방법
 * => 화살표 기준 왼쪽이 입력(매개변수), 오른쪽이 출력(실행할 코드)
 * 아래 함수에서는 config가 매개변수
 */
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default api;