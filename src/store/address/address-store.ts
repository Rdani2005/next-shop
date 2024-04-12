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
  setAddress: (address: State["address"]) => void;
}

export const useAddressStore = create<State>()(
  persist(
    (set) => ({
      address: {
        firstName: "",
        lastName: "",
        address: "",
        zipCode: "",
        city: "",
        country: "",
        phone: "",
      },
      setAddress: (address) => {
        set({ address });
      },
    }),
    {
      name: "user-address",
    },
  ),
);
