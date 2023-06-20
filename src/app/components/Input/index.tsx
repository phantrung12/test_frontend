import { Input, InputProps } from 'antd';
import React from 'react';

interface CustomInputProps extends InputProps {
  allowSpace?: boolean;
}

const AntdInput = ({
  onChange,
  maxLength = 255,
  placeholder,
  ...rest
}: CustomInputProps) => {
  return (
    <Input
      onChange={e => onChange && onChange(e)}
      maxLength={maxLength}
      placeholder={placeholder || ''}
      {...rest}
      onBlur={e => {
        onChange &&
          onChange({
            ...e,
            target: { ...e.target, value: e.target.value.trim() },
          });
      }}
    />
  );
};
export default AntdInput;
