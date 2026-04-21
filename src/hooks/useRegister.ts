import {register} from "../api/auth.ts";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import type {RegisterRequest} from "../types/auth/register-request.ts";

export const useRegister = () => {
    const [input, setInput] = useState<RegisterRequest>({
        username: "",
        password: "",
        email: ""
    })

    // 페이지를 이동시켜주는 함수
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        /**
         * e.target은 이벤트가 발생한 input 요소 자체
         * e.target = {
         *       name: "username",   // input의 name 속성
         *       value: "h",         // 현재 입력된 값
         *       type: "text",       // 그 외 input 정보도 있지만
         *       placeholder: "...", // 필요한 name, value만 꺼내서 사용
         *       ...
         *   }
         */
        const { name, value } = e.target

        /**
         * 해당 handle 함수가 등록된 모든 필드의 값을 가져온 후 handle 함수를 호출한 필드(name)의 값(value)만 변경하는 흐름
         * prev : 값을 변경하기 전 useState에 선언한 전체 객체(RegisterRequest의 모든 필드)
         * ...prev, [name]: value : 객체의 전체 필드 중 name에 해당하는 필드의 값만 value로 변경
         */
        setInput(prev => ({...prev, [name]: value}));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        /** form 태그는 submit 시 기본적으로 페이지를 새로고침함. 그걸 막는 코드 **/
        e.preventDefault();
        try {
            await register(input)
            navigate("/login")
        } catch {
            alert("회원 가입 실패")
        }
    }

    return { input, handleChange, handleSubmit }
}

