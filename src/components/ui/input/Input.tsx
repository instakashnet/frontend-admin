import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  inputClasses?: string;
  containerClasses?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ inputClasses, className, containerClasses, type, iconLeft, iconRight, ...props }, ref) => {
    return (
      <div className={`relative w-full ${containerClasses}`}>
        {iconLeft && <div className='absolute h-full inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>{iconLeft}</div>}
        <input
          type={type}
          className={cn(
            `flex items-center h-14 w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
            ${iconLeft ? "pl-11" : "pl-3"}
            ${iconRight ? "pr-11" : "pr-3"}
          `,
            className,
            inputClasses
          )}
          ref={ref}
          {...props}
        />
        {iconRight && <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>{iconRight}</div>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
