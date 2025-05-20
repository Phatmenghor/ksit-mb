import React from "react";
import { ComboboxSelect } from "../custom-comboBox";
import { ClassModel } from "@/model/master-data/class/all-class-model";
import { StatusEnum } from "@/constants/constant";
import { title } from "process";
import { AllClassFilterModel } from "@/model/master-data/class/type-class-model";
import { getAllClassService } from "@/service/master-data/class.service";

export default function ComboBoxClass({
  selectedClass,
  onChange,
  disabled,
  title,
}: {
  selectedClass: ClassModel | null;
  disabled: boolean;
  onChange: (dept: ClassModel | null) => void;
  title?: string;
}) {
  const fetchClasses = async (search: string, pageNo: number) => {
    const payload: AllClassFilterModel = {
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
