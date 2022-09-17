import React, { FC } from "react";

export interface IGameCardProps {
  bannerUrl: string;
  name: string;
  countAds: number;
}

const GameCard: FC<IGameCardProps> = ({ bannerUrl, countAds, name }) => {
  return (
    <a className="relative rounded-lg overflow-hidden" href="">
      <img src={bannerUrl} alt="" />
      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
        <strong className="font-bold text-white block">{name}</strong>
        <span className="text-zinc-300 text-sm block mt-1">
          {countAds} {countAds > 1 ? "anúcios" : "anúcio"}
        </span>
      </div>
    </a>
  );
};

export default GameCard;
