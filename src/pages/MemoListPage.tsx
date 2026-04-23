import { useState } from "react"
import { useMemo, useMemoList, useCreateMemo, useUpdateMemo, useDeleteMemo } from "../hooks/useMemo"
import type { MemoListResponse } from "../types/memo-list-response"

export default function MemoListPage() {
    const { data: memos, isLoading, isError } = useMemoList()
    const { createInput, updateInput, handleChangeCreate, handleChangeUpdate } = useMemo()
    const { mutate: createMutate } = useCreateMemo()
    const { mutate: updateMutate } = useUpdateMemo()
    const { mutate: deleteMutate } = useDeleteMemo()

    const [editingMemo, setEditingMemo] = useState<MemoListResponse | null>(null)
    const [showCreateForm, setShowCreateForm] = useState(false)

    if (isLoading) return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", color: "#6b7280" }}>로딩 중...</div>
    if (isError) return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", color: "#ef4444" }}>오류 발생</div>

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa", padding: "32px 16px" }}>
            <div style={{ maxWidth: "680px", margin: "0 auto" }}>

                {/* 헤더 */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                    <h2 style={{ fontSize: "22px", fontWeight: "600", color: "#1a1a1a" }}>메모 목록</h2>
                    <button
                        onClick={() => setShowCreateForm(prev => !prev)}
                        style={{ backgroundColor: showCreateForm ? "#e5e7eb" : "#3b82f6", color: showCreateForm ? "#374151" : "#fff", border: "none", borderRadius: "8px", padding: "8px 16px", fontSize: "14px", fontWeight: "500", cursor: "pointer" }}
                    >
                        {showCreateForm ? "취소" : "+ 메모 생성"}
                    </button>
                </div>

                {/* 생성 폼 */}
                {showCreateForm && (
                    <div style={{ backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", padding: "20px", marginBottom: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                        <input
                            name="title"
                            value={createInput.title}
                            onChange={handleChangeCreate}
                            placeholder="제목"
                            style={{ border: "1px solid #d1d5db", borderRadius: "8px", padding: "10px 14px", fontSize: "14px", outline: "none", boxSizing: "border-box", width: "100%" }}
                        />
                        <input
                            name="content"
                            value={createInput.content}
                            onChange={handleChangeCreate}
                            placeholder="내용"
                            style={{ border: "1px solid #d1d5db", borderRadius: "8px", padding: "10px 14px", fontSize: "14px", outline: "none", boxSizing: "border-box", width: "100%" }}
                        />
                        <button
                            onClick={() => createMutate(createInput, { onSuccess: () => setShowCreateForm(false) })}
                            style={{ alignSelf: "flex-end", backgroundColor: "#3b82f6", color: "#fff", border: "none", borderRadius: "8px", padding: "8px 20px", fontSize: "14px", fontWeight: "500", cursor: "pointer" }}
                        >
                            저장
                        </button>
                    </div>
                )}

                {/* 메모 목록 */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {memos && Array.isArray(memos) && memos.map((memo: MemoListResponse) => (
                        <div key={memo.id} style={{ backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", padding: "20px" }}>
                            {editingMemo?.id === memo.id ? (
                                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                    <input
                                        name="title"
                                        value={updateInput.title}
                                        onChange={handleChangeUpdate}
                                        placeholder="제목"
                                        style={{ border: "1px solid #d1d5db", borderRadius: "8px", padding: "10px 14px", fontSize: "14px", outline: "none", boxSizing: "border-box", width: "100%" }}
                                    />
                                    <input
                                        name="content"
                                        value={updateInput.content}
                                        onChange={handleChangeUpdate}
                                        placeholder="내용"
                                        style={{ border: "1px solid #d1d5db", borderRadius: "8px", padding: "10px 14px", fontSize: "14px", outline: "none", boxSizing: "border-box", width: "100%" }}
                                    />
                                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                                        <button
                                            onClick={() => setEditingMemo(null)}
                                            style={{ backgroundColor: "#e5e7eb", color: "#374151", border: "none", borderRadius: "8px", padding: "7px 16px", fontSize: "13px", cursor: "pointer" }}
                                        >
                                            취소
                                        </button>
                                        <button
                                            onClick={() => updateMutate({ id: memo.id, ...updateInput }, { onSuccess: () => setEditingMemo(null) })}
                                            style={{ backgroundColor: "#3b82f6", color: "#fff", border: "none", borderRadius: "8px", padding: "7px 16px", fontSize: "13px", cursor: "pointer" }}
                                        >
                                            저장
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                        <div>
                                            <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#1a1a1a", marginBottom: "6px" }}>{memo.title}</h3>
                                            <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "10px" }}>{memo.content}</p>
                                            <p style={{ fontSize: "12px", color: "#9ca3af" }}>{memo.regDate}</p>
                                        </div>
                                        <div style={{ display: "flex", gap: "8px", flexShrink: 0, marginLeft: "12px" }}>
                                            <button
                                                onClick={() => setEditingMemo(memo)}
                                                style={{ backgroundColor: "#f3f4f6", color: "#374151", border: "none", borderRadius: "8px", padding: "6px 14px", fontSize: "13px", cursor: "pointer" }}
                                            >
                                                수정
                                            </button>
                                            <button
                                                onClick={() => deleteMutate({ id: memo.id })}
                                                style={{ backgroundColor: "#fee2e2", color: "#ef4444", border: "none", borderRadius: "8px", padding: "6px 14px", fontSize: "13px", cursor: "pointer" }}
                                            >
                                                삭제
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
