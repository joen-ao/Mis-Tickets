import useEventsResults from "../state/events-results";

//hook para hacer un llamado a la API y guardar en tu estado local

const useEventsData = () => {
  const { data, isLoading, error, fetchEvents } = useEventsResults();

  return {
    events: data?._embedded?.events || [],
    page: data?.page || {},
    isLoading,
    error,
    fetchEvents,
  };
};
export default useEventsData;
