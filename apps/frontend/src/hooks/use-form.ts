import { ChangeEvent, FormEvent, useState } from "react";
import { formObject } from "../types/form-object";

export function useForm(
  initialState: formObject,
  onSubmit?: (formState: formObject) => void
) {
  const [formState, setFormState] = useState(initialState);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit?.(formState);
  }

  function handleChangeByValue(name: string, value: string | number) {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return { formState, handleChange, handleChangeByValue, handleSubmit };
}
