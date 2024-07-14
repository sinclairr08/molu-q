import { UseFormRegisterReturn } from "react-hook-form";

interface ShortInputProps {
  register: UseFormRegisterReturn<any>;
}

export default function ShortInput({ register }: ShortInputProps) {
  return (
    <div className="flex justify-center">
      <input
        className="border-2 border-orange-200 rounded-md p-1 text-orange-600
        focus:border-orange-600 focus:outline-none"
        {...register}
      />
    </div>
  );
}
