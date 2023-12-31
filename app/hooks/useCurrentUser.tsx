import useSWR from "swr";
import fetcher from "../lib/fetcher";

const useCurrentUser = () => {
  const { data, error, isLoading } = useSWR("/api/currentuser", fetcher);
  return { data, error, isLoading };
};

export default useCurrentUser;
