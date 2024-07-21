import { create } from "zustand";

//Store para guardar datos de manera globlal
const useEventsResults = create((set) => ({
  data: [],
  error: null,
  isLoading: false,

  fetchEvents: async (params) => {
    try {
      await set(() => ({ isLoading: true }));

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/events.json?apikey=${
          import.meta.env.VITE_API_KEY
        }&countryCode=MX${params || ""}`
      );

      const data = await response.json();
      await set(() => ({ data, isLoading: false }));
    } catch (error) {
      await set(() => ({ error }));
    }
  },
}));

export default useEventsResults;
