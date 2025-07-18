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
  replay?: boolean;
};

type Description = {
  "en-us": string;
  "pt-br": string;
};

export enum MediaTypeEnum {
  ANIME = 1,
  MANGA,
  MOVIE,
  GAME,
  TV_SERIES,
  BOOK,
}
