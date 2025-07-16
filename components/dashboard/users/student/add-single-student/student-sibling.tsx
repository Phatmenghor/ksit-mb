"use client";
import { useState, useEffect, useRef } from "react";
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
import { useIsMobile } from "@/hooks/use-mobile";

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
  const skipReplaceRef = useRef(false);

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

  const handleAddSibling = () => {
    if (totalSiblings >= MAX_SIBLINGS) {
      setValidationError(`ចំនួនបងប្អូនមិនអាចលើសពី ${MAX_SIBLINGS} នាក់ទេ`);
      return;
    }

    skipReplaceRef.current = true;
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
      const lastIndex = siblingFields.length - 1;
      const siblingValues = watch("studentSiblings");
      const lastSibling = siblingValues[lastIndex];

      removeSibling(lastIndex);
      skipReplaceRef.current = true; // 🔥 prevent replace on next render

      setTotalSiblings((prev) => Math.max(prev - 1, MIN_SIBLINGS));

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

      if (newTotal > MAX_SIBLINGS) {
        setValidationError(
          `ចំនួនបងប្អូនសរុបមិនអាចលើសពី ${MAX_SIBLINGS} នាក់ទេ`
        );
        return;
      }

      const currentSiblings = watch("studentSiblings");
      const currentMaleCount = currentSiblings.filter(
        (s: any) => s.gender === "MALE"
      ).length;

      const diff = male - currentMaleCount;

      if (diff > 0) {
        // Add new male siblings
        for (let i = 0; i < diff; i++) {
          appendSibling({
            name: "",
            gender: "MALE",
            dateOfBirth: "",
            occupation: "",
            phoneNumber: "",
          });
        }
      } else if (diff < 0) {
        // Remove excess male siblings
        let removed = 0;
        for (let i = siblingFields.length - 1; i >= 0 && removed < -diff; i--) {
          const sibling = watch(`studentSiblings.${i}`);
          if (sibling.gender === "MALE") {
            removeSibling(i);
            removed++;
          }
        }
      }

      setTotalSiblings(newTotal);
      setValidationError("");
    }
  };

  const handleFemaleSiblingChange = (value: string) => {
    if (/^\d*$/.test(value)) {
      const female = Math.min(parseInt(value) || 0, MAX_SIBLINGS);
      const currentSiblings = watch("studentSiblings");
      const currentFemaleCount = currentSiblings.filter(
        (s: any) => s.gender === "FEMALE"
      ).length;
      const maleCount = currentSiblings.filter(
        (s: any) => s.gender === "MALE"
      ).length;
      const newTotal = maleCount + female;

      if (newTotal > MAX_SIBLINGS) {
        setValidationError(
          `ចំនួនបងប្អូនសរុបមិនអាចលើសពី ${MAX_SIBLINGS} នាក់ទេ`
        );
        return;
      }

      const diff = female - currentFemaleCount;

      if (diff > 0) {
        // Add new female siblings
        for (let i = 0; i < diff; i++) {
          appendSibling({
            name: "",
            gender: "FEMALE",
            dateOfBirth: "",
            occupation: "",
            phoneNumber: "",
          });
        }
      } else if (diff < 0) {
        // Remove excess female siblings
        let removed = 0;
        for (let i = siblingFields.length - 1; i >= 0 && removed < -diff; i--) {
          const sibling = watch(`studentSiblings.${i}`);
          if (sibling.gender === "FEMALE") {
            removeSibling(i);
            removed++;
          }
        }
      }

      setFemaleSiblings(female);
      setTotalSiblings(newTotal);
      setValidationError("");
    }
  };

  const isMobile = useIsMobile();

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
          <label className="text-sm mb-2 font-semibold leading-relaxed break-words whitespace-normal">
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

      <Card
        className="overflow-x-auto p-1"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#000000 #d1d5db",
        }}
      >
        <CardContent>
          <div className="min-w-[800px]">
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
