import { Size } from "@/interfaces";
import clsx from "clsx";
import React, { FC } from "react";

interface Props {
  selectedSize?: Size;
  availableSizes: Size[];
  onSelectedSize?: (size: Size) => void;
}

export const SizeSelector: FC<Props> = ({
  selectedSize,
  availableSizes,
  onSelectedSize,
}) => {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Available Sizes</h3>

      <div className="flex space-x-2">
        {availableSizes.map((size) => (
          <button
            onClick={() => {
              if (onSelectedSize) onSelectedSize(size);
            }}
            key={size}
            className={clsx("px-3 py-2 rounded hover:underline", {
              underline: size === selectedSize,
            })}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
