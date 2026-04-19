import api from "./api.ts";
import type {MemoListResponse} from "../types/memo-list-response.ts";
import type {MemoDetailResponse} from "../types/memo-detail-response.ts";
import type {CreateMemoRequest} from "../types/create-memo-request.ts";
import type {CreateMemoResponse} from "../types/create-memo-response.ts";
import type {UpdateMemoRequest} from "../types/update-memo-request.ts";
import type {UpdateMemoResponse} from "../types/update-memo-response.ts";

export const getMemoList = async(): Promise<MemoListResponse> => {
    const response = await api.get<MemoListResponse>("/memo");
    return response.data;
}

export const getMemoDetail = async(id: number): Promise<MemoDetailResponse> => {
    const response = await api.get<MemoDetailResponse>(`/memo/${id}`);
    return response.data;
}

export const createMemo = async(createMemoRequest: CreateMemoRequest): Promise<CreateMemoResponse> => {
    const response = await api.post<CreateMemoResponse>("/memo", createMemoRequest);
    return response.data;
}

export const updateMemo = async(id: number, updateMemoRequest: UpdateMemoRequest): Promise<UpdateMemoResponse> => {
    const response = await api.patch<UpdateMemoResponse>(`/memo/${id}`, updateMemoRequest);
    return response.data;
}

export const deleteMemo = async(id: number): Promise<void> => {
    await api.delete(`/memo/${id}`);
}