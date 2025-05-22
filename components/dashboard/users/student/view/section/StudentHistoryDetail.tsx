import CollapsibleCard from "@/components/shared/collapsibleCard";
import { StudentByIdModel } from "@/model/user/student/getById.student.model";

interface StudentProfileProps {
  student: StudentByIdModel | null;
}

export default function StudentPersonalInfo({ student }: StudentProfileProps) {
  return (
    <CollapsibleCard title="ព័ត៍មានទាក់ទងនឹងគ្រួសារសិស្ស">
      <div className="grid grid-cols-4 gap-x-4 gap-y-3 text-sm mt-4">
        <div className="text-muted-foreground">គោត្តនាម និងនាម</div>
        <div>
          {student?.khmerFirstName} {student?.khmerLastName}
        </div>

        <div className="text-muted-foreground">ភេទ</div>
        <div>{student?.gender}</div>

        <div className="text-muted-foreground">ថ្ងៃខែឆ្នាំកំណើត</div>
        <div>{student?.dateOfBirth}</div>

        <div className="text-muted-foreground">លេខទូរស័ព្ទ</div>
        <div>{student?.phoneNumber}</div>

        <div className="text-muted-foreground">សញ្ជាតិ</div>
        <div>{student?.nationality}</div>

        <div className="text-muted-foreground">ទីកន្លែងកំណើត</div>
        <div>{student?.placeOfBirth}</div>

        <div className="text-muted-foreground">អាសយដ្ឋានបច្ចុប្បន្ន</div>
        <div>{student?.currentAddress}</div>
      </div>
    </CollapsibleCard>
  );
}
