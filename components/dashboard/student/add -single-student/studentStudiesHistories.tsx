import { useFormContext } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { AddSingleStudentRequestType } from "@/model/student/add.student.zod";
import { useEffect } from "react";
import { educationLevels } from "@/constants/constant";

export const StudentStudiesHistorySection = () => {
  const { register, setValue, watch } =
    useFormContext<AddSingleStudentRequestType>();

  useEffect(() => {
    educationLevels.forEach((level, index) => {
      setValue(`studentStudiesHistories.${index}.typeStudies`, level.value, {
        shouldValidate: false,
        shouldDirty: false,
      });
    });
  }, [setValue]);

  return (
    <Card className="mt-4">
      <CardContent className="pt-6 space-y-4">
        <h3 className="text-lg font-semibold">ប្រវត្តិសិក្សា</h3>
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-8 gap-2 font-medium mb-4 text-sm pb-2">
              <span>កម្រិតថ្នាក់</span>
              <span>ឈ្មោះសាលារៀន </span>
              <span>ខេត្ត/រាជធានី </span>
              <span>ពីឆ្នាំណាដល់ឆ្នាំណា </span>
              <span>ពីឆ្នាំណាដល់ឆ្នាំណា </span>
              <span>សញ្ញាបត្រទទួលបាន</span>
              <span>ពិន្ទុសរុប</span>
              <span></span>
            </div>

            {educationLevels.map((level, index) => {
              const fromYear = watch(
                `studentStudiesHistories.${index}.fromYear`
              );
              const endYear = watch(`studentStudiesHistories.${index}.endYear`);

              return (
                <div
                  key={level.value}
                  className="grid grid-cols-8 gap-4 space-y-4 items-center"
                >
                  {/* Static label */}
                  <div className="text-sm font-medium">{level.label}</div>

                  {/* Inputs */}
                  <Input
                    placeholder="សាលា"
                    {...register(`studentStudiesHistories.${index}.schoolName`)}
                  />
                  <Input
                    placeholder="ទីតាំង"
                    {...register(`studentStudiesHistories.${index}.location`)}
                  />

                  {/* From Year */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left text-sm",
                          !fromYear && "text-muted-foreground"
                        )}
                      >
                        {fromYear
                          ? format(new Date(fromYear), "yyyy-MM-dd")
                          : "ជ្រើសរើស"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={fromYear ? new Date(fromYear) : undefined}
                        onSelect={(date) =>
                          setValue(
                            `studentStudiesHistories.${index}.fromYear`,
                            format(date!, "yyyy-MM-dd")
                          )
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  {/* End Year */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left text-sm",
                          !endYear && "text-muted-foreground"
                        )}
                      >
                        {endYear
                          ? format(new Date(endYear), "yyyy-MM-dd")
                          : "ជ្រើសរើស"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={endYear ? new Date(endYear) : undefined}
                        onSelect={(date) =>
                          setValue(
                            `studentStudiesHistories.${index}.endYear`,
                            format(date!, "yyyy-MM-dd")
                          )
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <Input
                    placeholder="សញ្ញាបត្រ"
                    {...register(
                      `studentStudiesHistories.${index}.obtainedCertificate`
                    )}
                  />
                  <Input
                    placeholder="ពិន្ទុសរុប"
                    {...register(
                      `studentStudiesHistories.${index}.overallGrade`
                    )}
                  />
                </div>
              );
            })}
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};
