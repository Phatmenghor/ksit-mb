import { useState, useEffect } from "react";
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
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { GenderEnum } from "@/constants/constant";
import { StudentFormData } from "@/model/user/student/add.student.zod";

export default function StudentFamilyBackgroundSection() {
  const {
    control,
    formState: { isSubmitting },
    setValue,
    watch,
  } = useFormContext<StudentFormData>();

  const [totalSiblings, setTotalSiblings] = useState(0);
  const [femaleSiblings, setFemaleSiblings] = useState(0);

  const {
    fields: siblingFields,
    append: appendSibling,
    remove: removeSibling,
    replace: replaceSiblings,
  } = useFieldArray({
    control,
    name: "studentSiblings",
  });

  // Handle changes to total siblings and female siblings
  const handleTotalSiblingsChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setTotalSiblings(value);
  };

  const handleFemaleSiblingsChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setFemaleSiblings(Math.min(value, totalSiblings));
  };

  // Generate siblings based on totals
  useEffect(() => {
    if (totalSiblings >= 0) {
      const maleSiblings =
        totalSiblings - Math.min(femaleSiblings, totalSiblings);
      const newSiblings = [];

      // Create female siblings
      for (let i = 0; i < femaleSiblings; i++) {
        newSiblings.push({
          name: "",
          gender: "FEMALE",
          dateOfBirth: "",
          occupation: "",
          phoneNumber: "",
        });
      }

      // Create male siblings
      for (let i = 0; i < maleSiblings; i++) {
        newSiblings.push({
          name: "",
          gender: "MALE",
          dateOfBirth: "",
          occupation: "",
          phoneNumber: "",
        });
      }

      // Replace all existing siblings with new array
      replaceSiblings(newSiblings);
      setValue("numberOfSiblings", String(totalSiblings));
    }
  }, [totalSiblings, femaleSiblings, replaceSiblings]);

  const handleAddSibling = () => {
    appendSibling({
      name: "",
      gender: "MALE",
      dateOfBirth: "",
      occupation: "",
      phoneNumber: "",
    });
    setTotalSiblings((prev) => prev + 1);
  };

  const handleRemoveSibling = () => {
    if (siblingFields.length > 0) {
      // Get the index of the last sibling
      const lastIndex = siblingFields.length - 1;

      // Get the full data of the last sibling (including gender)
      // We need to use watch to get the actual form values, not just the field metadata
      const siblingValues = watch("studentSiblings");
      const lastSibling = siblingValues[lastIndex];

      // Remove the sibling
      removeSibling(lastIndex);

      // Update counts
      setTotalSiblings((prev) => prev - 1);

      // Check if the removed sibling was female and update the female count
      if (lastSibling && lastSibling.gender === GenderEnum.FEMALE) {
        setFemaleSiblings((prev) => prev - 1);
      }
    }
  };

  return (
    <CollapsibleCard title="ព័ត៌មានគ្រួសារ">
      {/* Siblings Section */}
      <div className="mt-8">
        <div className="mb-2 flex gap-4 items-center">
          <div>
            <h1>ចំនួនសមាជិកបងប្អូន</h1>
            <Input
              type="number"
              className="w-3/5"
              min="0"
              value={totalSiblings}
              onChange={handleTotalSiblingsChange}
            />
          </div>
          <div>
            <h1>ចំនួនបងប្អូនស្រី</h1>
            <Input
              type="number"
              className="w-3/5"
              min="0"
              max={totalSiblings}
              value={femaleSiblings}
              onChange={handleFemaleSiblingsChange}
            />
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
            onClick={handleRemoveSibling}
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
