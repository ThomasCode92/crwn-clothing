import { ButtonHTMLAttributes, ReactNode } from "react";

import tw from "@/utils/tw-identity";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  buttonType?: "inverted" | "google-sign-in";
}

export default function Button({
  children,
  buttonType,
  ...otherProps
}: ButtonProps) {
  let classes = tw`h-12 min-w-40 px-8 font-bold uppercase hover:border-2` + " ";

  if (!buttonType) {
    classes += tw`bg-black text-white hover:border-black hover:bg-white hover:text-black`;
  }

  if (buttonType === "google-sign-in") {
    classes += tw`bg-google text-white hover:border-google hover:bg-white hover:text-google`;
  }

  if (buttonType === "inverted") {
    classes += tw`border-2 border-black bg-white text-black hover:border-white hover:bg-black hover:text-white`;
  }

  return (
    <button className={classes} {...otherProps}>
      {children}
    </button>
  );
}
