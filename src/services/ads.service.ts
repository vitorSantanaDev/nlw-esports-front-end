import axios from "axios";
import { IAd } from "../interfaces/ad";

export async function createAd(payload: Partial<IAd>) {
  const response = await axios.post(
    `http://localhost:3333/games/${payload.game}/ads`,
    { ...payload }
  );
  return response.data.data;
}
