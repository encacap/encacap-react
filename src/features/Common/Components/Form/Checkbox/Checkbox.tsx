import { ChangeEvent, memo, useCallback } from "react";
import { useController } from "react-hook-form";

import UncontrolledCheckbox from "./UncontrolledCheckbox";
import { CheckboxProps } from "./interface";

const Checkbox = ({ control, name, ...props }: CheckboxProps) => {
  if (!control) {
    return <UncontrolledCheckbox name={name} {...props} />;
  }

  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.checked);
    },
    [onChange],
  );

  return <UncontrolledCheckbox name={name} checked={value} onChange={handleChange} {...props} />;
};

export default memo(Checkbox);
