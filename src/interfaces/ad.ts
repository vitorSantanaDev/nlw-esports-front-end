export interface IAd {
  id: string;
  name: string;
  yearsPlaying: number;
  discord: string;
  weekDays: Array<number>;
  hourStart: string;
  hourEnd: string;
  useVoiceChannel: boolean;
  createdAt: Date;
  game: string;
}
