import GenerateMultiStudentForm from "@/components/dashboard/student/generate-multi-Student/GenerateMultiStudent";
import { CardHeaderSection } from "@/components/shared/layout/CardHeaderSection";
import { ROUTE } from "@/constants/routes";

export default function AddMultipleStudentsPage() {
  return (
    <div className="space-y-3">
      <CardHeaderSection
        title="Add Multi students"
        breadcrumbs={[
          { label: "Home", href: ROUTE.DASHBOARD },
          { label: "Add Students", href: ROUTE.STUDENTS.ADD_MULTIPLE },
        ]}
        backHref={ROUTE.STUDENTS.LIST}
      />
      <GenerateMultiStudentForm />
    </div>
  );
}
