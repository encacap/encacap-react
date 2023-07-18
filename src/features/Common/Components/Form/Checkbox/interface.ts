import { InputHTMLAttributes } from "react";
import { Control } from "react-hook-form";

export interface UncontrolledCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  indeterminate?: boolean;
  label?: string;
  name: string;
  error?: string;
}

export interface CheckboxProps extends UncontrolledCheckboxProps {
  control?: Control;
}
