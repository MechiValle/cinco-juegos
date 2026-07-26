import { useQuery } from "@tanstack/react-query";
import { searchGames } from "../api/rawg";

export const useGameSearch = (
  query: string
) => {
  return useQuery({
    queryKey: ["games", query],

    queryFn: () => searchGames(query),

    enabled: query.trim().length > 0,
  });
};