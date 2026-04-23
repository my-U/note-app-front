import type {CreateMemoRequest} from "../types/create-memo-request.ts";
import {useState} from "react";
import type {UpdateMemoRequest} from "../types/update-memo-request.ts";
import * as React from "react";
import {createMemo, deleteMemo, getMemoDetail, getMemoList, updateMemo} from "../api/memo.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

export const useMemo = () => {
    const [createInput, setCreateInput] = useState<CreateMemoRequest>({
        title: "",
        content: ""
    });
    const [updateInput, setUpdateInput] = useState<UpdateMemoRequest>({
        title: "",
        content: ""
    });


    const handleChangeCreate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setCreateInput(prev => ({...prev, [name]: value}))
    }

    const handleChangeUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setUpdateInput(prev => ({...prev, [name]: value}))
    }

    return {createInput, updateInput, handleChangeCreate, handleChangeUpdate}
}

    /**
     * useQuery / useMutation 장점
     *   1. 로딩/에러 상태 자동 관리
     *   2. 캐싱 - 같은 queryKey 재호출 시 API 한 번만 실행
     *   3. invalidateQueries로 필요한 시점에 최신 데이터 자동 갱신
     *   4. 동시 중복 요청 방지
     *   5. try-catch, useState, useEffect 직접 작성 불필요
     */

    // 메모 목록 조회
    export const useMemoList = () => {
        return useQuery({ // 데이터를 가져오는(GET) React Query 훅
            queryKey: ['memos'], // 이 쿼리의 고유 식별자. invalidateQueries에서 이 키를 지정하면 해당 쿼리를 무효화해서 재fetch 트리거
            queryFn: () => getMemoList() // 실제로 호출할 API 함수
        })
    }

    // 메모 상세 조회
    export const useMemoDetail = (id: number) => {
        return useQuery({ // 데이터를 가져오는(GET) React Query 훅
            queryKey: ['memo'], // 이 쿼리의 고유 식별자. invalidateQueries에서 이 키를 지정하면 해당 쿼리를 무효화해서 재fetch 트리거
            queryFn: () => getMemoDetail(id) // 실제로 호출할 API 함수
        })
    }

    // 메모 생성 후 목록 자동 갱신
    export const useCreateMemo = () => {
        const queryClient = useQueryClient()
        return useMutation({ // 데이터를 변경하는(POST/PATCH/DELETE) React Query 훅
            mutationFn: createMemo, // 실제로 호출할 API 함수
            onSuccess: () => { // API 성공 후 실행되는 콜백
                queryClient.invalidateQueries({ queryKey: ['memos'] })
            }
        })
    }

    // 메모 수정 후 목록 자동 갱신
    export const useUpdateMemo = () => {
        const queryClient = useQueryClient()
        return useMutation({
            mutationFn: ({ id, ...body }: {id: number } & UpdateMemoRequest) => updateMemo(id, body),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['memos'] })
            }
        })
    }

    // 메모 삭제
    export const useDeleteMemo = () => {
        const queryClient = useQueryClient()
        return useMutation({
            mutationFn: ({ id}: {id: number }) => deleteMemo(id),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['memos'] })
            }
        })
    }