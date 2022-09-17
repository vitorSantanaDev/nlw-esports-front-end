import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "./global/main.css";

import LogoNWL from "./assets/logo-nlw.svg";
import GameCard from "./components/GameCard";
import CreateAdBanner from "./components/CreateAdBanner";
import CreateAdModal from "./components/CreateAdModal";
import { IGame } from "./interfaces/game";
import { getAllGames } from "./services/games.service";

function App() {
  const [games, setGames] = useState<Array<IGame>>([]);

  const fetchGames = () => {
    (async () => {
      const response = await getAllGames();
      setGames(response);
    })();
  };

  useEffect(fetchGames, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={LogoNWL} alt="" />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        está aqui.
      </h1>
      <div className="grid grid-cols-6 gap-6  mt-16">
        {games.length &&
          games.map((game) => (
            <GameCard
              key={game.id}
              name={game.title}
              countAds={game._count.ads}
              bannerUrl={game.bannerUrl}
            />
          ))}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
