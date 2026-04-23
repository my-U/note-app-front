import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useMemo, useMemoDetail, useUpdateMemo, useDeleteMemo } from "../hooks/useMemo"

export default function MemoDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { updateInput, handleChangeUpdate } = useMemo()
    const { data: memo, isLoading, isError } = useMemoDetail(Number(id))
    const { mutate: updateMutate } = useUpdateMemo()
    const { mutate: deleteMutate } = useDeleteMemo()

    const [isEditing, setIsEditing] = useState(false)

    if (isLoading) return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", color: "#6b7280" }}>로딩 중...</div>
    if (isError) return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", color: "#ef4444" }}>오류 발생</div>

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa", padding: "32px 16px" }}>
            <div style={{ maxWidth: "680px", margin: "0 auto" }}>

                {/* 헤더 */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                    <button
                        onClick={() => navigate("/memos")}
                        style={{ backgroundColor: "#e5e7eb", color: "#374151", border: "none", borderRadius: "8px", padding: "8px 16px", fontSize: "14px", fontWeight: "500", cursor: "pointer" }}
                    >
                        ← 목록으로
                    </button>
                    {!isEditing && (
                        <div style={{ display: "flex", gap: "8px" }}>
                            <button
                                onClick={() => setIsEditing(true)}
                                style={{ backgroundColor: "#f3f4f6", color: "#374151", border: "none", borderRadius: "8px", padding: "8px 16px", fontSize: "14px", cursor: "pointer" }}
                            >
                                수정
                            </button>
                            <button
                                onClick={() => deleteMutate({ id: Number(id) }, { onSuccess: () => navigate("/memos") })}
                                style={{ backgroundColor: "#fee2e2", color: "#ef4444", border: "none", borderRadius: "8px", padding: "8px 16px", fontSize: "14px", cursor: "pointer" }}
                            >
                                삭제
                            </button>
                        </div>
                    )}
                </div>

                {/* 카드 */}
                <div style={{ backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", padding: "28px" }}>
                    {isEditing ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
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
                            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "4px" }}>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    style={{ backgroundColor: "#e5e7eb", color: "#374151", border: "none", borderRadius: "8px", padding: "8px 16px", fontSize: "14px", cursor: "pointer" }}
                                >
                                    취소
                                </button>
                                <button
                                    onClick={() => updateMutate({ id: Number(id), ...updateInput }, { onSuccess: () => setIsEditing(false) })}
                                    style={{ backgroundColor: "#3b82f6", color: "#fff", border: "none", borderRadius: "8px", padding: "8px 16px", fontSize: "14px", cursor: "pointer" }}
                                >
                                    저장
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#1a1a1a", marginBottom: "16px" }}>{memo?.title}</h2>
                            <p style={{ fontSize: "15px", color: "#4b5563", lineHeight: "1.7" }}>{memo?.content}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
