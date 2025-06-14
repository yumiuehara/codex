export type MediaType = {
  id: number;
  name: string;
};

export type Media = {
  name: string;
  image: string;
  idMedia: number;
};

export type Log = {
  id: number;
  media: Media;
  startDate: string;
  endDate?: string;
  description?: Description;
  like: boolean;
};

type Description = {
  en_us: string;
  pt_br: string;
};

export enum MediaTypeEnum {
  ANIME = 1,
  MANGA,
  MOVIE,
  GAME,
  TV_SERIES,
  BOOK,
}
