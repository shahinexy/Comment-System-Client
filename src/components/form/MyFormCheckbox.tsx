"use client";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { cn } from "@/lib/utils";

interface MyFormCheckboxProps {
  name: string; 
  consentText?: string; 
  onValueChange?: (value: boolean) => void; 
  required?: boolean; 
  className?: string; 
  labelClassName?: string; 
  checkboxClassName?: string; 
}

const MyFormCheckbox = ({
  name,
  consentText,
  onValueChange,
  required = false,
  className,
  checkboxClassName,
}: MyFormCheckboxProps) => {
  const { control, getValues } = useFormContext();
  const inputValue = useWatch({ control, name }) ?? false; 

  useEffect(() => {
    if (onValueChange) {
      onValueChange(inputValue);
    }
  }, [inputValue, onValueChange]);

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <Controller
        name={name}
        control={control}
        defaultValue={getValues(name) ?? false} 
        rules={required ? { required: "This field is required" } : {}}
        render={({ field, fieldState: { error } }) => (
          <div className="relative flex items-center">
            <input
              {...field}
              id={name}
              type="checkbox"
              className={cn(
                "h-4 w-4 border rounded-md focus:ring-2",
                error ? "border-red-500" : "border-gray-300",
                checkboxClassName
              )}
            />
            {consentText && (
              <span
                className="ml-2 text-sm"
                dangerouslySetInnerHTML={{ __html: consentText }}
              ></span>
            )}
            <div className="h-4 my-1">
              {error && (
                <small className="text-red-500 text-xs">{error.message}</small>
              )}
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default MyFormCheckbox;
