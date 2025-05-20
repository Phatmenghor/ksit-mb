"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { GenderEnum } from "@/constants/constant";
import { Card, CardContent } from "@/components/ui/card";

export default function StudentSibling() {
  const {
    control,
    formState: { isSubmitting },
    setValue,
    watch,
  } = useFormContext();

  const [totalSiblings, setTotalSiblings] = useState(1);
  const [femaleSiblings, setFemaleSiblings] = useState(0);

  const {} = useFieldArray({
    control,
    name: "StudentParent",
  });

  const {
    fields: siblingFields,
    append: appendSibling,
    remove: removeSibling,
    replace: replaceSiblings,
  } = useFieldArray({
    control,
    name: "studentSiblings",
  });

  // Generate siblings based on totals
  useEffect(() => {
    const validTotal = Math.max(0, totalSiblings);
    const validFemale = Math.min(femaleSiblings, validTotal);
    const maleSiblings = validTotal - validFemale;

    const newSiblings = [];

    for (let i = 0; i < validFemale; i++) {
      newSiblings.push({
        name: "",
        gender: "FEMALE",
        dateOfBirth: "",
        occupation: "",
        phoneNumber: "",
      });
    }

    for (let i = 0; i < maleSiblings; i++) {
      newSiblings.push({
        name: "",
        gender: "MALE",
        dateOfBirth: "",
        occupation: "",
        phoneNumber: "",
      });
    }

    replaceSiblings(newSiblings);

    // Save the total as a string in the form
    setValue("numberOfSiblings", String(validTotal));
  }, [totalSiblings, femaleSiblings, replaceSiblings, setValue]);

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
    <div className="space-y-4">
      <div className="flex gap-4 mt-4">
        <div className="flex flex-col">
          <label className="text-sm mb-2 font-medium">ចំនួនបងប្អូន</label>
          <Input
            type="text"
            pattern="\d*"
            value={
              totalSiblings - femaleSiblings === 0
                ? ""
                : String(totalSiblings - femaleSiblings)
            }
            onChange={(e) => {
              const raw = e.target.value;
              if (/^\d*$/.test(raw)) {
                const male = parseInt(raw) || 0;
                setTotalSiblings(male + femaleSiblings);
              }
            }}
            placeholder="ចំនួនបងប្អូន"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-2 font-medium">ចំនួនបងប្អូនស្រី</label>
          <Input
            type="text"
            pattern="\d*"
            value={femaleSiblings === 0 ? "" : String(femaleSiblings)}
            onChange={(e) => {
              const raw = e.target.value;
              if (/^\d*$/.test(raw)) {
                const female = parseInt(raw) || 0;
                const male = totalSiblings - femaleSiblings;
                setFemaleSiblings(female);
                setTotalSiblings(male + female);
              }
            }}
            placeholder="ចំនួនបងប្អូនស្រី"
          />
        </div>
      </div>
      <Card className="overflow-x-auto p-3">
        <CardContent>
          <div className="grid grid-cols-5 gap-4 font-semibold pb-2 mb-1">
            <div>ឈ្មោះ</div>
            <div>ភេទ</div>
            <div>ថ្ងៃខែឆ្នាំកំណើត</div>
            <div>មុខរបរ</div>
            <div>លេខទូរស័ព្ទ</div>
          </div>

          <div className="space-y-4">
            {siblingFields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-5 gap-4 items-center"
              >
                {/* Name */}
                <Controller
                  control={control}
                  name={`studentSiblings.${index}.name`}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                      placeholder="Placeholder"
                    />
                  )}
                />

                {/* Gender */}
                <Controller
                  control={control}
                  name={`studentSiblings.${index}.gender`}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    >
                      <option value="">Select</option>
                      <option value="MALE">ប្រុស</option>
                      <option value="FEMALE">ស្រី</option>
                    </select>
                  )}
                />

                {/* Date of Birth */}
                <Controller
                  control={control}
                  name={`studentSiblings.${index}.dateOfBirth`}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="date"
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  )}
                />

                {/* Occupation */}
                <Controller
                  control={control}
                  name={`studentSiblings.${index}.occupation`}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                      placeholder="Placeholder"
                    />
                  )}
                />

                {/* Phone Number */}
                <Controller
                  control={control}
                  name={`studentSiblings.${index}.phoneNumber`}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                      placeholder="Placeholder"
                    />
                  )}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 flex gap-2">
        <Button
          type="button"
          onClick={handleAddSibling}
          disabled={isSubmitting}
          className="bg-black text-white hover:bg-gray-800"
        >
          Add Sibling
        </Button>
        <Button
          type="button"
          onClick={handleRemoveSibling}
          disabled={isSubmitting || siblingFields.length === 0}
          className="bg-black text-white hover:bg-gray-800"
        >
          Remove Last Sibling
        </Button>
      </div>
    </div>
  );
}
