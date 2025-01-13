import { InputHTMLAttributes } from "react";

import tw from "@/utils/tw-identity";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function FormInput({ label, ...otherProps }: FormInputProps) {
  const inputId = label.toLowerCase().replace(" ", "-");

  const shrinkClasses = otherProps.value?.toString().length
    ? tw`-top-5 text-xs text-black`
    : tw`top-3 text-gray-600`;
  const passwordClasses =
    otherProps.type === "password" ? "tracking-widest" : "";

  const inputClasses = tw`peer my-6 block w-full border-b-2 border-b-gray-600 bg-slate-100 py-2.5 pl-1 pr-2.5 text-lg text-gray-600 focus:outline-none ${passwordClasses}`;
  const labelClasses = tw`pointer-events-none absolute left-1 transition-all peer-focus:-top-5 peer-focus:text-xs peer-focus:text-black ${shrinkClasses}`;

  return (
    <div className="relative my-12">
      <input id={inputId} className={inputClasses} {...otherProps} />
      <label htmlFor={inputId} className={labelClasses}>
        {label}
      </label>
    </div>
  );
}
