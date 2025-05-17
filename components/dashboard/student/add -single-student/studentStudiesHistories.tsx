import { useFormContext, Controller, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AddSingleStudentRequestType } from "@/model/student/add.student.zod";
import CollapsibleCard from "@/components/shared/collapsibleCard";

export default function StudentStudiesHistorySection() {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext<AddSingleStudentRequestType>();

  const { fields } = useFieldArray({
    control,
    name: "studentStudiesHistories",
  });

  return (
    <CollapsibleCard title="ប្រវត្តិសិក្សា">
      {/* Table Header */}
      <div className="grid grid-cols-6 gap-2 mb-2 text-sm font-semibold">
        <div>ប្រភេទសិក្សា</div>
        <div>ឈ្មោះសាលា</div>
        <div>ទីតាំង</div>
        <div>ចូលឆ្នាំ</div>
        <div>បញ្ចប់ឆ្នាំ</div>
        <div>សញ្ញាប័ត្រ/និទ្ទេស</div>
      </div>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="grid grid-cols-6 gap-2 mb-3 items-center"
        >
          {/* typeStudies */}
          <Controller
            control={control}
            name={`studentStudiesHistories.${index}.typeStudies`}
            render={({ field }) => (
              <Input
                {...field}
                disabled={isSubmitting}
                placeholder="ប្រភេទសិក្សា"
                className="bg-gray-100"
              />
            )}
          />

          {/* schoolName */}
          <Controller
            control={control}
            name={`studentStudiesHistories.${index}.schoolName`}
            render={({ field }) => (
              <Input
                {...field}
                disabled={isSubmitting}
                placeholder="ឈ្មោះសាលា"
                className="bg-gray-100"
              />
            )}
          />

          {/* location */}
          <Controller
            control={control}
            name={`studentStudiesHistories.${index}.location`}
            render={({ field }) => (
              <Input
                {...field}
                disabled={isSubmitting}
                placeholder="ទីតាំង"
                className="bg-gray-100"
              />
            )}
          />

          {/* fromYear */}
          <div className="relative">
            <Controller
              control={control}
              name={`studentStudiesHistories.${index}.fromYear`}
              render={({ field }) => (
                <>
                  <DatePicker
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date) =>
                      field.onChange(date?.toISOString().split("T")[0])
                    }
                    placeholderText="Select"
                    dateFormat="yyyy-MM-dd"
                    className="w-full bg-gray-100 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                  <Calendar
                    size={18}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
                  />
                </>
              )}
            />
          </div>

          {/* endYear */}
          <div className="relative">
            <Controller
              control={control}
              name={`studentStudiesHistories.${index}.endYear`}
              render={({ field }) => (
                <>
                  <DatePicker
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date) =>
                      field.onChange(date?.toISOString().split("T")[0])
                    }
                    placeholderText="Select"
                    dateFormat="yyyy-MM-dd"
                    className="w-full bg-gray-100 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                  <Calendar
                    size={18}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
                  />
                </>
              )}
            />
          </div>

          {/* obtainedCertificate */}
          <Controller
            control={control}
            name={`studentStudiesHistories.${index}.obtainedCertificate`}
            render={({ field }) => (
              <Input
                {...field}
                disabled={isSubmitting}
                placeholder="សញ្ញាប័ត្រ/និទ្ទេស"
                className="bg-gray-100"
              />
            )}
          />
        </div>
      ))}
    </CollapsibleCard>
  );
}
