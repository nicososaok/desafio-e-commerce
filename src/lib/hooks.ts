import useSWR from "swr";
import { fetchAPI } from ".api";
export function useSearchResults(query: string) {
  const { data } = useSWR(() => "/search?q=" + query, fetchAPI);
  return data;
}

export function useMe() {
  const { data } = useSWR("/me", fetchAPI);
  return data;
}