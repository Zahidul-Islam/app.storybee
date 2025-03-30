import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { BiSolidError } from "react-icons/bi";
import { Label } from "../label";
import { Textarea } from "../textarea";
import { Input } from "../input";

type CustomInputProps = {
  id: string;
  type: string;
  label?: string;
  errors?: any;
  helpertext?: string;
  helperText?: string;
  placeholder?: string;
  autoComplete?: InputHTMLAttributes<HTMLInputElement>["autoComplete"];
  className?: string;
  labelClassName?: string;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
  onChange?: (e: any) => void;
  required?: boolean;
};

const CustomInput = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  CustomInputProps
>(({ ...props }, ref: React.Ref<any>) => {
  const { type, required, multiline, labelClassName, ...restProps } = props;
  return (
    <div className="grid w-full gap-2">
      {props?.label && (
        <Label
          className={cn("flex gap-1 leading-tight ", labelClassName)}
          htmlFor={props?.id}
        >
          {props?.label}
          {required && (
            <span className="text-base font-medium leading-none text-red-800">
              *
            </span>
          )}
        </Label>
      )}
      {multiline ? (
        <Textarea
          ref={ref}
          {...restProps}
          className={cn(
            "backdrop-blur-lg",
            props?.errors[props?.id] &&
              "border-red-600 focus-visible:ring-transparent",
            props?.className
          )}
        />
      ) : (
        <Input
          type={type}
          ref={ref}
          {...restProps}
          className={cn(
            "backdrop-blur-lg",
            props?.errors[props?.id] &&
              "border-red-600 focus-visible:ring-transparent",
            props?.className
          )}
        />
      )}
      {props?.errors[props?.id] ? (
        <p className="flex items-center gap-1 text-xs font-medium text-red-600">
          <BiSolidError />
          {props?.errors[props?.id]?.message}
        </p>
      ) : props?.helpertext || props?.helperText ? (
        <p className="text-xs text-muted-foreground/70">
          {props?.helpertext || props?.helperText}
        </p>
      ) : null}
    </div>
  );
});

CustomInput.displayName = "CustomInput";
export default CustomInput;
