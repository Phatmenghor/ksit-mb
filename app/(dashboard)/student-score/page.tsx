import ScoreManagementSystem from "@/components/dashboard/student-scores/student-scores";
import StudentScoreList from "@/components/dashboard/student-scores/student-scores";

export default function StudentScorePage() {
  return (
    <section className="p-6">
      <h1 className="mb-6 text-2xl font-semibold">Input Student Score</h1>
      <ScoreManagementSystem />
    </section>
  );
}
