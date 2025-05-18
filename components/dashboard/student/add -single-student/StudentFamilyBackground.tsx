import CollapsibleCard from "@/components/shared/collapsibleCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AddSingleStudentRequestType } from "@/model/student/add.student.zod";
import { useEffect } from "react";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";

export default function StudentFamilyBackgroundSection() {
  const {
    control,
    formState: { isSubmitting },
    setValue,
  } = useFormContext<AddSingleStudentRequestType>();

  // Initialize parents array with 2 parents if empty
  useEffect(() => {
    setValue("studentParents", [
      {
        parentType: "FATHER",
        name: "",
        age: "",
        job: "",
        phone: "",
        address: "",
      },
      {
        parentType: "MOTHER",
        name: "",
        age: "",
        job: "",
        phone: "",
        address: "",
      },
    ]);
  }, [setValue]);

  const { fields: parentFields } = useFieldArray({
    control,
    name: "studentParents",
  });

  const {
    fields: siblingFields,
    append: appendSibling,
    remove: removeSibling,
  } = useFieldArray({
    control,
    name: "studentSiblings",
  });

  const handleAddSibling = () => {
    appendSibling({
      name: "",
      gender: "",
      dateOfBirth: "",
      occupation: "",
      phoneNumber: "",
    });
  };

  return (
    <CollapsibleCard title="ព័ត៌មានគ្រួសារ">
      <div className="grid grid-cols-2 gap-6">
        {parentFields.map((field, index) => (
          <div key={field.id} className="space-y-4">
            <div>
              <label className="block font-medium text-sm mb-1">
                {index === 0 ? "ឈ្មោះឪពុក" : "ឈ្មោះម្ដាយ"}
              </label>
              <Controller
                control={control}
                name={`studentParents.${index}.name`}
                render={({ field }) => <Input {...field} placeholder="ឈ្មោះ" />}
              />
            </div>
            <div>
              <label className="block font-medium text-sm mb-1">
                {index === 0 ? "អាយុឪពុក" : "អាយុម្ដាយ"}
              </label>
              <Controller
                control={control}
                name={`studentParents.${index}.age`}
                render={({ field }) => <Input {...field} placeholder="អាយុ" />}
              />
            </div>
            <div>
              <label className="block font-medium text-sm mb-1">មុខរបរ</label>
              <Controller
                control={control}
                name={`studentParents.${index}.job`}
                render={({ field }) => (
                  <Input {...field} placeholder="មុខរបរ" />
                )}
              />
            </div>
            <div>
              <label className="block font-medium text-sm mb-1">
                លេខទូរស័ព្ទ
              </label>
              <Controller
                control={control}
                name={`studentParents.${index}.phone`}
                render={({ field }) => (
                  <Input {...field} placeholder="លេខទូរស័ព្ទ" />
                )}
              />
            </div>
            <div>
              <label className="block font-medium text-sm mb-1">
                ទីកន្លែងបច្ចុប្បន្ន
              </label>
              <Controller
                control={control}
                name={`studentParents.${index}.address`}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    placeholder="ភូមិ ឃុំ/សង្កាត់ ស្រុក/ខណ្ឌ ខេត្ត"
                  />
                )}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Siblings Section */}
      <div className="mt-8">
        <div className="mb-2 flex gap-4 items-center">
          <div>
            <h1>ចំនួនសមាជិកបងប្អូន</h1>
            <Input type="number" className="w-3/5" min="0" />
          </div>
          <div>
            <h1>ចំនួនបងប្អូនស្រី</h1>
            <Input type="number" className="w-3/5" min="0" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-sm">
                <th className="py-2 px-1 text-left">លេខរៀង</th>
                <th className="py-2 px-4 text-left">ឈ្មោះ</th>
                <th className="py-2 px-4 text-left">ភេទ</th>
                <th className="py-2 px-4 text-left">ថ្ងៃខែឆ្នាំកំណើត</th>
                <th className="py-2 px-4 text-left">មុខរបរ</th>
                <th className="py-2 px-4 text-left">លេខទូរស័ព្ទ</th>
              </tr>
            </thead>
            <tbody>
              {siblingFields.map((field, index) => (
                <tr key={field.id}>
                  <td className="py-2 px-1 align-top">{index + 1}</td>
                  <td className="py-2 px-1 align-top">
                    <Controller
                      control={control}
                      name={`studentSiblings.${index}.name`}
                      render={({ field }) => (
                        <Input {...field} placeholder="ឈ្មោះ" />
                      )}
                    />
                  </td>
                  <td className="py-2 px-1 align-top">
                    <Controller
                      control={control}
                      name={`studentSiblings.${index}.gender`}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="MALE">ប្រុស</SelectItem>
                            <SelectItem value="FEMALE">ស្រី</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </td>
                  <td className="py-2 px-1 align-top">
                    <Controller
                      control={control}
                      name={`studentSiblings.${index}.dateOfBirth`}
                      render={({ field }) => (
                        <Input {...field} type="date" className="w-full" />
                      )}
                    />
                  </td>
                  <td className="py-2 px-1 align-top">
                    <Controller
                      control={control}
                      name={`studentSiblings.${index}.occupation`}
                      render={({ field }) => (
                        <Input {...field} placeholder="មុខរបរ" />
                      )}
                    />
                  </td>
                  <td className="py-2 px-1 align-top">
                    <Controller
                      control={control}
                      name={`studentSiblings.${index}.phoneNumber`}
                      render={({ field }) => (
                        <Input {...field} placeholder="លេខទូរស័ព្ទ" />
                      )}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex gap-2">
          <Button
            onClick={handleAddSibling}
            disabled={isSubmitting}
            className="bg-black text-white hover:bg-gray-800"
          >
            Add Sibling
          </Button>
          <Button
            onClick={() => {
              if (siblingFields.length > 0)
                removeSibling(siblingFields.length - 1);
            }}
            disabled={isSubmitting || siblingFields.length === 0}
            className="bg-black text-white hover:bg-gray-800"
          >
            Remove Last Sibling
          </Button>
        </div>
      </div>
    </CollapsibleCard>
  );
}
