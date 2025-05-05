import MembersList from "@/components/dashboard/users/members/member-list";
import { Button } from "@/components/ui/button";
export default function MemberListPage() {
  return (
    <main>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Members list</h2>
          <Button>Add new</Button>
        </div>
        <MembersList />
      </div>
    </main>
  );
}
