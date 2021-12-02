import React from "react";
import ReactDatePicker from "react-datepicker";
import { ru } from "date-fns/locale";
import * as Markup from "./date-picker.styles";
import "react-datepicker/dist/react-datepicker.min.css";

const CustomInput = React.forwardRef(({ value, onClick, placeholder }, ref) => {
  return (
    <Markup.Wrapper onClick={onClick} ref={ref} isPlaceholder={!value}>
      {value || placeholder}
    </Markup.Wrapper>
  );
});

export const DatePicker = React.memo((props) => {
  const { value, onChange, placeholder, excludeDates } = props;

  return (
    <ReactDatePicker
      locale={ru}
      minDate={new Date("2021-10-05")}
      maxDate={new Date("2021-10-07")}
      dateFormat="dd.MM.yyyy"
      disabledKeyboardNavigation
      selected={value}
      onChange={onChange}
      excludeDates={excludeDates}
      placeholderText={placeholder}
      customInput={<CustomInput />}
    />
  );
});
