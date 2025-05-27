"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { GenderEnum } from "@/constants/constant";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// Constants for limits
const MAX_SIBLINGS = 20; // Maximum total siblings
const MIN_SIBLINGS = 0; // Minimum siblings

export default function StudentSibling() {
  const {
    control,
    formState: { isSubmitting },
    setValue,
    watch,
  } = useFormContext();

  const [totalSiblings, setTotalSiblings] = useState(1);
  const [femaleSiblings, setFemaleSiblings] = useState(0);
  const [validationError, setValidationError] = useState("");

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

  // Validation function
  const validateSiblingInput = (total: number, female: number): string => {
    if (total > MAX_SIBLINGS) {
      return `ចំនួនបងប្អូនមិនអាចលើសពី ${MAX_SIBLINGS} នាក់ទេ`;
    }
    if (total < MIN_SIBLINGS) {
      return `ចំនួនបងប្អូនមិនអាចតិចជាង ${MIN_SIBLINGS} នាក់ទេ`;
    }
    if (female > total) {
      return "ចំនួនបងប្អូនស្រីមិនអាចលើសពីចំនួនបងប្អូនសរុបទេ";
    }
    return "";
  };

  // Generate siblings based on totals
  useEffect(() => {
    const validTotal = Math.max(
      MIN_SIBLINGS,
      Math.min(totalSiblings, MAX_SIBLINGS)
    );
    const validFemale = Math.min(femaleSiblings, validTotal);
    const maleSiblings = validTotal - validFemale;

    // Validate input
    const error = validateSiblingInput(validTotal, validFemale);
    setValidationError(error);

    // Only proceed if validation passes
    if (!error) {
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
    }
  }, [totalSiblings, femaleSiblings, replaceSiblings, setValue]);

  const handleAddSibling = () => {
    if (totalSiblings >= MAX_SIBLINGS) {
      setValidationError(`ចំនួនបងប្អូនមិនអាចលើសពី ${MAX_SIBLINGS} នាក់ទេ`);
      return;
    }

    appendSibling({
      name: "",
      gender: "MALE",
      dateOfBirth: "",
      occupation: "",
      phoneNumber: "",
    });
    setTotalSiblings((prev) => Math.min(prev + 1, MAX_SIBLINGS));
    setValidationError("");
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
      setTotalSiblings((prev) => Math.max(prev - 1, MIN_SIBLINGS));

      // Check if the removed sibling was female and update the female count
      if (lastSibling && lastSibling.gender === GenderEnum.FEMALE) {
        setFemaleSiblings((prev) => Math.max(prev - 1, MIN_SIBLINGS));
      }

      setValidationError("");
    }
  };

  const handleMaleSiblingChange = (value: string) => {
    if (/^\d*$/.test(value)) {
      const male = Math.min(parseInt(value) || 0, MAX_SIBLINGS);
      const newTotal = male + femaleSiblings;

      if (newTotal <= MAX_SIBLINGS) {
        setTotalSiblings(newTotal);
        setValidationError("");
      } else {
        setValidationError(
          `ចំនួនបងប្អូនសរុបមិនអាចលើសពី ${MAX_SIBLINGS} នាក់ទេ`
        );
      }
    }
  };

  const handleFemaleSiblingChange = (value: string) => {
    if (/^\d*$/.test(value)) {
      const female = Math.min(parseInt(value) || 0, MAX_SIBLINGS);
      const male = totalSiblings - femaleSiblings;
      const newTotal = male + female;

      if (newTotal <= MAX_SIBLINGS && female <= newTotal) {
        setFemaleSiblings(female);
        setTotalSiblings(newTotal);
        setValidationError("");
      } else if (newTotal > MAX_SIBLINGS) {
        setValidationError(
          `ចំនួនបងប្អូនសរុបមិនអាចលើសពី ${MAX_SIBLINGS} នាក់ទេ`
        );
      } else if (female > newTotal) {
        setValidationError("ចំនួនបងប្អូនស្រីមិនអាចលើសពីចំនួនបងប្អូនសរុបទេ");
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 mt-4">
        <div className="flex flex-col">
          <label className="text-sm mb-2 font-semibold">
            ចំនួនបងប្អូនប្រុស (អតិបរមា {MAX_SIBLINGS} នាក់)
          </label>
          <Input
            type="text"
            pattern="\d*"
            maxLength={2}
            value={
              totalSiblings - femaleSiblings === 0
                ? ""
                : String(totalSiblings - femaleSiblings)
            }
            onChange={(e) => handleMaleSiblingChange(e.target.value)}
            placeholder="ចំនួនបងប្អូនប្រុស"
            className={validationError ? "border-red-500" : ""}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-2 font-semibold">
            ចំនួនបងប្អូនស្រី (អតិបរមា {MAX_SIBLINGS} នាក់)
          </label>
          <Input
            type="text"
            pattern="\d*"
            maxLength={2}
            value={femaleSiblings === 0 ? "" : String(femaleSiblings)}
            onChange={(e) => handleFemaleSiblingChange(e.target.value)}
            placeholder="ចំនួនបងប្អូនស្រី"
            className={validationError ? "border-red-500" : ""}
          />
        </div>
      </div>

      {/* Validation Error Message */}
      {validationError && (
        <div className="text-red-500 text-sm font-medium bg-red-50 border border-red-200 rounded p-2">
          {validationError}
        </div>
      )}

      {/* Total Display */}
      <div className="text-sm text-gray-600">
        ចំនួនបងប្អូនសរុប:{" "}
        <span className="font-semibold">{totalSiblings} នាក់</span>
      </div>

      <Card className="overflow-x-auto p-1">
        <CardContent>
          <div className="grid grid-cols-5 mt-3 gap-4 font-semibold pb-2">
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
                      className="border border-gray-300 bg-gray-100 rounded px-2 py-1 w-full"
                      placeholder="ឈ្មោះ"
                      maxLength={50}
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
                      className="border border-gray-300 bg-gray-100 rounded px-2 py-1 w-full"
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
                  render={({ field }) => {
                    const selectedDate = field.value
                      ? new Date(field.value)
                      : undefined;

                    return (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full bg-gray-100 justify-start text-left text-sm",
                              !selectedDate && "text-muted-foreground"
                            )}
                            disabled={isSubmitting}
                          >
                            {selectedDate
                              ? format(selectedDate, "yyyy-MM-dd")
                              : "ជ្រើសរើស"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={(date) => {
                              field.onChange(
                                date ? format(date, "yyyy-MM-dd") : ""
                              );
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    );
                  }}
                />

                {/* Occupation */}
                <Controller
                  control={control}
                  name={`studentSiblings.${index}.occupation`}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="border border-gray-300 rounded bg-gray-100 px-2 py-1 w-full"
                      placeholder="មុខរបរ"
                      maxLength={100}
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
                      className="border border-gray-300 bg-gray-100 rounded px-2 py-1 w-full"
                      placeholder="លេខទូរស័ព្ទ"
                      maxLength={15}
                      pattern="[0-9]*"
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
          disabled={isSubmitting || totalSiblings >= MAX_SIBLINGS}
          className="bg-black text-white hover:bg-gray-800 disabled:opacity-50"
        >
          Add Sibling {totalSiblings >= MAX_SIBLINGS && "(Max reached)"}
        </Button>
        <Button
          type="button"
          onClick={handleRemoveSibling}
          disabled={isSubmitting || siblingFields.length === 0}
          className="bg-black text-white hover:bg-gray-800 disabled:opacity-50"
        >
          Remove Last Sibling
        </Button>
      </div>
    </div>
  );
}
