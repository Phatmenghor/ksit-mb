"use client"

import { useState } from "react"
import { ScoreSubmittedPage } from "./index"
import { ScoreSubmissionDetail } from "./score-submitted-detail"
import ScoreManagementSystem from "./score-management-system"

type ViewType = "list" | "detail" | "new"

export function ScoreSubmissionFlow() {
  const [view, setView] = useState<ViewType>("list")
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null)

  // Handle viewing a submission detail
  const handleViewSubmission = (id: string) => {
    setSelectedSubmissionId(id)
    setView("detail")
  }

  // Handle creating a new submission
  const handleNewSubmission = () => {
    setView("new")
  }

  // Handle going back to the list
  const handleBackToList = () => {
    setView("list")
    setSelectedSubmissionId(null)
  }

  // Handle submission completion
  const handleSubmissionComplete = () => {
    setView("list")
  }

  return (
    <div>
      {view === "list" && (
        <ScoreSubmittedPage onViewSubmission={handleViewSubmission} onNewSubmission={handleNewSubmission} />
      )}

      {view === "detail" && selectedSubmissionId && (
        <ScoreSubmissionDetail id={selectedSubmissionId} onBack={handleBackToList} />
      )}

      {view === "new" && <ScoreManagementSystem onSubmissionComplete={handleSubmissionComplete} />}
    </div>
  )
}
