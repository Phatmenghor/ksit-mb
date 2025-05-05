import { Input } from "@/components/ui/input";

export default function TeachingDetailForm() {
  return (
    <div>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="rankings-and-ratings"
            className="mb-2 block text-sm font-medium"
          >
            ឋាននន្តរស័ក្តិ និងថ្នាក់
          </label>
          <Input
            id="rankings-and-ratings"
            placeholder="ឋាននន្តរស័ក្តិ និងថ្នាក់..."
          />
        </div>
        <div>
          <label
            htmlFor="teaching-english"
            className="mb-2 block text-sm font-medium"
          >
            បង្រៀនភាសាអង់គ្លេស
          </label>
          <Input id="teaching-english" placeholder="បង្រៀនភាសាអង់គ្លេស..." />
        </div>
        <div>
          <label
            htmlFor="class-level"
            className="mb-2 block text-sm font-medium"
          >
            ថ្នាក់គួបបីកម្រិត
          </label>
          <Input id="class-level" placeholder="ថ្នាក់គួបបីកម្រិត..." />
        </div>
        <div>
          <label htmlFor="reference" className="mb-2 block text-sm font-medium">
            យោង
          </label>
          <Input id="reference" placeholder="យោង..." />
        </div>
        <div>
          <label
            htmlFor="technical-team-lead"
            className="mb-2 block text-sm font-medium"
          >
            ប្រធានក្រុមបច្ចេកទេស
          </label>
          <Input
            id="technical-team-lead"
            placeholder="ប្រធានក្រុមបច្ចេកទេស..."
          />
        </div>
        <div>
          <label
            htmlFor="teaching-assistant"
            className="mb-2 block text-sm font-medium"
          >
            ជួយបង្រៀន
          </label>
          <Input id="teaching-assistant" placeholder="ជួយបង្រៀន..." />
        </div>
        <div>
          <label
            htmlFor="serial-number"
            className="mb-2 block text-sm font-medium"
          >
            លេខរៀង
          </label>
          <Input id="serial-number" placeholder="លេខរៀង..." />
        </div>
        <div>
          <label
            htmlFor="two-level-class"
            className="mb-2 block text-sm font-medium"
          >
            ពីរថ្នាក់ណីរពេល
          </label>
          <Input id="two-level-class" placeholder="ពីរថ្នាក់ណីរពេល..." />
        </div>
        <div>
          <label
            htmlFor="class-responsibility"
            className="mb-2 block text-sm font-medium"
          >
            ទទួលបន្ទុកថ្នាក់
          </label>
          <Input id="class-responsibility" placeholder="ទទួលបន្ទុកថ្នាក់..." />
        </div>
        <div>
          <label
            htmlFor="last-salary-increase"
            className="mb-2 block text-sm font-medium"
          >
            ថ្ងៃខែឡើងការប្រាក់ចុងក្រោយ
          </label>
          <Input id="last-salary-increase" placeholder="លេខរៀង..." />
        </div>
        <div>
          <label
            htmlFor="cross-school-teaching"
            className="mb-2 block text-sm font-medium"
          >
            បង្រៀនឆ្លងសាលា
          </label>
          <Input id="cross-school-teaching" placeholder="បង្រៀនឆ្លងសាលា..." />
        </div>
        <div>
          <label
            htmlFor="overtime-hours"
            className="mb-2 block text-sm font-medium"
          >
            ម៉ោងលើស
          </label>
          <Input id="overtime-hours" placeholder="ម៉ោងលើស..." />
        </div>
        <div>
          <label
            htmlFor="date-of-signature"
            className="mb-2 block text-sm font-medium"
          >
            ចុះថ្ងៃទី
          </label>
          <Input id="date-of-signature" placeholder="លេខរៀង..." />
        </div>
        <div>
          <label
            htmlFor="class-level-2"
            className="mb-2 block text-sm font-medium"
          >
            ថ្នាក់គួប
          </label>
          <Input id="class-level-2" placeholder="ថ្នាក់គួប..." />
        </div>
        <div>
          <label
            htmlFor="two-languages"
            className="mb-2 block text-sm font-medium"
          >
            ពីរភាសា
          </label>
          <Input id="two-languages" placeholder="ពីរភាសា..." />
        </div>
        <div>
          <label
            htmlFor="teaching-in-academic-year"
            className="mb-2 block text-sm font-medium"
          >
            បង្រៀននៅឆ្នាំសិក្សា
          </label>
          <Input
            id="teaching-in-academic-year"
            placeholder="បង្រៀននៅឆ្នាំសិក្សា..."
          />
        </div>
      </div>
    </div>
  );
}
