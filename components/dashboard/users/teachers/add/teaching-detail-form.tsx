import { Input } from "@/components/ui/input";
import { AddStaffModel } from "@/model/user/stuff.request.model";
import { Controller, useFormContext } from "react-hook-form";

export default function TeachingDetailForm() {
  const {
    control,
    register,
    formState: { isSubmitting },
  } = useFormContext<AddStaffModel>();

  return (
    <div className="space-y-3">
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="rankings-and-ratings"
            className="mb-1 block text-sm font-bold"
          >
            ឋាននន្តរស័ក្តិ និងថ្នាក់
          </label>
          <Controller
            name="rankAndClass"
            control={control}
            render={({ field }) => (
              <Input
                id="rankings-and-ratings"
                {...field}
                placeholder="ឋាននន្តរស័ក្តិ និងថ្នាក់..."
                className="bg-gray-100"
              />
            )}
          />
        </div>

        <div>
          <label
            htmlFor="teaching-english"
            className="mb-1 block text-sm font-bold"
          >
            បង្រៀនភាសាអង់គ្លេស
          </label>
          <Controller
            name="affiliatedProfession"
            control={control}
            render={({ field }) => (
              <Input
                id="teaching-english"
                {...field}
                placeholder="បង្រៀនភាសាអង់គ្លេស..."
                className="bg-gray-100"
              />
            )}
          />
        </div>

        <div>
          <label htmlFor="class-level" className="mb-1 block text-sm font-bold">
            ថ្នាក់គួបបីកម្រិត
          </label>
          <Controller
            name="commune"
            control={control}
            render={({ field }) => (
              <Input
                id="class-level"
                {...field}
                placeholder="ថ្នាក់គួបបីកម្រិត..."
                className="bg-gray-100"
              />
            )}
          />
        </div>

        <div>
          <label htmlFor="reference" className="mb-1 block text-sm font-bold">
            យោង
          </label>
          <Controller
            name="reference"
            control={control}
            render={({ field }) => (
              <Input
                id="reference"
                {...field}
                placeholder="យោង..."
                className="bg-gray-100"
              />
            )}
          />
        </div>

        <div>
          <label
            htmlFor="technicalTeamLead"
            className="mb-1 block text-sm font-bold"
          >
            ប្រធានក្រុមបច្ចេកទេស
          </label>
          <Controller
            name="technicalTeamLead"
            control={control}
            render={({ field }) => (
              <Input
                id="technical-team-lead"
                {...field}
                placeholder="ប្រធានក្រុមបច្ចេកទេស..."
                className="bg-gray-100"
              />
            )}
          />
        </div>

        <div>
          <label
            htmlFor="teachingAssistant"
            className="mb-1 block text-sm font-bold"
          >
            ជួយបង្រៀន
          </label>
          <Controller
            name="teachingAssistant"
            control={control}
            render={({ field }) => (
              <Input
                id="teaching-assistant"
                {...field}
                placeholder="ជួយបង្រៀន..."
                className="bg-gray-100"
              />
            )}
          />
        </div>

        <div>
          <label
            htmlFor="serialNumber"
            className="mb-1 block text-sm font-bold"
          >
            លេខរៀង
          </label>
          <Controller
            name="serialNumber"
            control={control}
            render={({ field }) => (
              <Input
                id="serial-number"
                {...field}
                placeholder="លេខរៀង..."
                className="bg-gray-100"
              />
            )}
          />
        </div>

        <div>
          <label
            htmlFor="twoLevelClass"
            className="mb-1 block text-sm font-bold"
          >
            ពីរថ្នាក់ណីរពេល
          </label>
          <Controller
            name="twoLevelClass"
            control={control}
            render={({ field }) => (
              <Input
                id="two-level-class"
                {...field}
                placeholder="ពីរថ្នាក់ណីរពេល..."
                className="bg-gray-100"
              />
            )}
          />
        </div>

        <div>
          <label
            htmlFor="classResponsibility"
            className="mb-1 block text-sm font-bold"
          >
            ទទួលបន្ទុកថ្នាក់
          </label>
          <Controller
            name="classResponsibility"
            control={control}
            render={({ field }) => (
              <Input
                id="class-responsibility"
                {...field}
                placeholder="ទទួលបន្ទុកថ្នាក់..."
                className="bg-gray-100"
              />
            )}
          />
        </div>

        <div>
          <label
            htmlFor="last-salary-increase"
            className="mb-1 block text-sm font-bold"
          >
            ថ្ងៃខែឡើងការប្រាក់ចុងក្រោយ
          </label>
          <Controller
            name="lastSalaryIncrease"
            control={control}
            render={({ field }) => (
              <Input
                id="last-salary-increase"
                {...field}
                placeholder="ថ្ងៃខែឡើងការប្រាក់ចុងក្រោយ..."
                className="bg-gray-100"
              />
            )}
          />
        </div>

        <div>
          <label
            htmlFor="crossSchoolTeaching"
            className="mb-1 block text-sm font-bold"
          >
            បង្រៀនឆ្លងសាលា
          </label>
          <Controller
            name="crossSchoolTeaching"
            control={control}
            render={({ field }) => (
              <Input
                id="cross-school-teaching"
                {...field}
                placeholder="បង្រៀនឆ្លងសាលា..."
                className="bg-gray-100"
              />
            )}
          />
        </div>

        <div>
          <label
            htmlFor="overtimeHours"
            className="mb-1 block text-sm font-bold"
          >
            ម៉ោងលើស
          </label>
          <Controller
            name="overtimeHours"
            control={control}
            render={({ field }) => (
              <Input
                id="overtime-hours"
                {...field}
                placeholder="ម៉ោងលើស..."
                className="bg-gray-100"
              />
            )}
          />
        </div>

        <div>
          <label
            htmlFor="date-of-signature"
            className="mb-1 block text-sm font-bold"
          >
            ចុះថ្ងៃទី
          </label>
          <Controller
            name="dateOfSignature"
            control={control}
            render={({ field }) => (
              <Input
                id="date-of-signature"
                {...field}
                placeholder="ចុះថ្ងៃទី..."
                className="bg-gray-100"
              />
            )}
          />
        </div>

        <div>
          <label
            htmlFor="class-level-2"
            className="mb-1 block text-sm font-bold"
          >
            ថ្នាក់គួប
          </label>
          <Controller
            name="classLevel2"
            control={control}
            render={({ field }) => (
              <Input
                id="class-level-2"
                {...field}
                placeholder="ថ្នាក់គួប..."
                className="bg-gray-100"
              />
            )}
          />
        </div>

        <div>
          <label
            htmlFor="two-languages"
            className="mb-1 block text-sm font-bold"
          >
            ពីរភាសា
          </label>
          <Controller
            name="twoLanguages"
            control={control}
            render={({ field }) => (
              <Input
                id="two-languages"
                {...field}
                placeholder="ពីរភាសា..."
                className="bg-gray-100"
              />
            )}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="teaching-in-academic-year"
          className="mb-1 block text-sm font-bold"
        >
          បង្រៀននៅឆ្នាំសិក្សា
        </label>
        <Controller
          name="year"
          control={control}
          render={({ field }) => (
            <Input
              id="teaching-in-academic-year"
              {...field}
              placeholder="បង្រៀននៅឆ្នាំសិក្សា..."
              className="bg-gray-100"
            />
          )}
        />
      </div>
    </div>
  );
}
