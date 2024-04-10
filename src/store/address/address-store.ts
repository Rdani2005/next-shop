import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  address: {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    zipCode: string;
    city: string;
    country: string;
    phone: string;
  };

  // methods.
}

export const useAddressStore = create<State>()(
  persist(
    (set, get) => ({
      address: {
        firstName: "",
        lastName: "",
        address: "",
        zipCode: "",
        city: "",
        country: "",
        phone: "",
      },
    }),
    {
      name: "user-address",
    },
  ),
);
