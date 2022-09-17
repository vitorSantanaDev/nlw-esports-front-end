import { FormEvent, useEffect, useMemo, useState } from "react";
import { Check, GameController } from "phosphor-react";

import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import InputComponent from "./Form/InputComponent";

import { IGame } from "../interfaces/game";
import { getAllGames } from "../services/games.service";
import { createAd } from "../services/ads.service";

const CreateAdModal = () => {
  const [games, setGames] = useState<Partial<IGame[]>>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  const daysOfWeekArray = useMemo(() => {
    return [
      {
        id: "0",
        value: "0",
        label: "D",
        title: "Domingo",
      },
      {
        id: "1",
        value: "1",
        label: "S",
        title: "Segunda",
      },
      {
        id: "2",
        value: "2",
        label: "T",
        title: "Terça",
      },
      {
        id: "3",
        value: "3",
        label: "Q",
        title: "Quarta",
      },
      {
        id: "4",
        value: "4",
        label: "Q",
        title: "Quinta",
      },
      {
        id: "5",
        value: "5",
        label: "S",
        title: "Sexta",
      },
      {
        id: "6",
        value: "6",
        label: "S",
        title: "Sabádo",
      },
    ];
  }, []);

  const fetchGames = () => {
    (async () => {
      const response = await getAllGames();
      setGames(response);
    })();
  };

  const checkedFieldUseVoiceChannelHandle = (
    checked: boolean | "indeterminate"
  ) => {
    if (checked === true) {
      setUseVoiceChannel(checked);
    } else {
      setUseVoiceChannel(false);
    }
  };

  const handleCreateAd = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    console.log(data.yearsPlaying);

    await createAd({
      game: String(data.game),
      name: String(data.name),
      yearsPlaying: Number(data.yearsPlaying),
      weekDays: weekDays.map(Number),
      useVoiceChannel,
      hourStart: String(data.hourStart),
      hourEnd: String(data.hourEnd),
      discord: String(data.discord),
    });
  };

  useEffect(fetchGames, []);

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/50 inset-0 fixed" />
      <Dialog.Content className="fixed bg-[#262434] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-3xl font-bold">
          Publique um novo anúncio
        </Dialog.Title>
        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="game">
              Qual o game?
            </label>
            <select
              id="game"
              name="game"
              defaultValue="Selecione o jogo que dejesa jogar"
              className="bg-zinc-900 py-3 px-4 rounded text-small placeholder:text-zinc-500 appearance-none"
            >
              <option disabled value="Selecione o jogo que dejesa jogar">
                Selecione o jogo que dejesa jogar
              </option>
              {games.map((game) => (
                <option key={game?.id} value={game?.id}>
                  {game?.title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome ou (nickname)</label>
            <InputComponent
              id="name"
              name="name"
              type="text"
              placeholder="Como te chamam dentro do game?"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga há quanto tempo?</label>
              <InputComponent
                type="number"
                id="yearsPlaying"
                name="yearsPlaying"
                placeholder="Tudo bem ser zero"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual o seu Discord</label>
              <InputComponent
                type="text"
                name="discord"
                id="discord"
                placeholder="Usuário#0000 "
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>
              <ToggleGroup.Root
                type="multiple"
                value={weekDays}
                onValueChange={setWeekDays}
                className="grid grid-cols-4 gap-2"
              >
                {daysOfWeekArray.map((day) => {
                  return (
                    <ToggleGroup.Item
                      key={day.id}
                      value={day.value}
                      title={day.title}
                      className={`w-8 h-8 rounded  ${
                        weekDays.includes(day.value)
                          ? "bg-violet-500"
                          : "bg-zinc-900"
                      }`}
                    >
                      {day.label}
                    </ToggleGroup.Item>
                  );
                })}
              </ToggleGroup.Root>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hoursStart">Qual o horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <InputComponent
                  type="time"
                  name="hourStart"
                  id="hourStart"
                  placeholder="De"
                />
                <InputComponent
                  type="time"
                  name="hourEnd"
                  id="hourEnd"
                  placeholder="Até"
                />
              </div>
            </div>
          </div>

          <label
            htmlFor="useVoiceChannel"
            className="mt-2 flex items-center gap-2"
          >
            <Checkbox.Root
              checked={useVoiceChannel}
              onCheckedChange={checkedFieldUseVoiceChannelHandle}
              className="w-6 h-6 p-1 rounded bg-zinc-900"
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar no chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close
              type="button"
              className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
            >
              Cancelar
            </Dialog.Close>
            <button
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
              type="submit"
            >
              <GameController size={24} />
              Encontrar Duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export default CreateAdModal;
