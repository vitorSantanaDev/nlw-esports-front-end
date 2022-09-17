import axios from "axios";
import { IGame } from "../interfaces/game";

export const getAllGames = async (): Promise<IGame[]> => {
  const response = await axios.get("http://localhost:3333/games");
  return response.data.data.games;
};
