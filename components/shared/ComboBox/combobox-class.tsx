import React from "react";
import { ComboboxSelect } from "../custom-comboBox";
import { ClassModel } from "@/model/master-data/class/all-class-model";
import { getAllClassService } from "@/service/student.service";
import { StatusEnum } from "@/constants/constant";
import { GetAllClassModel } from "@/model/class/class-model";
import { title } from "process";

export default function ComboBoxClass({
  selectedClass,
  onChange,
  disabled,
  title,
}: {
  selectedClass: ClassModel | null;
  disabled: boolean;
  onChange: (dept: ClassModel | null) => void;
  title: string;
}) {
  const fetchClasses = async (search: string, pageNo: number) => {
    const payload: GetAllClassModel = {
      search: search,
      pageSize: 10,
      pageNo: 1,
      status: StatusEnum.ACTIVE,
    };

    const result = await getAllClassService(payload);
    // Ensure the return value always matches the expected shape
    return result ?? { content: [], pageNo, last: true };
  };
  return (
    <div>
      <ComboboxSelect<ClassModel>
        disabled={disabled}
        labelKey="code"
        valueKey="id"
        formatLabel={(item) => `Class ${item.code}-${item.academyYear}`}
        selectedItem={selectedClass}
        onSelect={onChange}
        fetcher={fetchClasses}
        placeholder={title ?? "Select:"}
      />
    </div>
  );
}
