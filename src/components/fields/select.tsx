import React from "react";
import { 
    Select as ShadcnSelect, 
    SelectTrigger, 
    SelectValue, 
    SelectContent, 
    SelectItem 
} from "@/components/ui/select";

interface SelectProps<T> {
  items: Record<string, T>;
  selectedValue?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

const Select = <T extends string | number>({
  items,
  selectedValue,
  onValueChange,
  placeholder = "Select an option",
}: SelectProps<T>) => {
  return (
    <ShadcnSelect value={selectedValue} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(items).map(([key, label], index) => (
          <SelectItem key={index} value={key}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </ShadcnSelect>
  );
};

export default Select;
