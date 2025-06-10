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
  description?: string;
  like: boolean;
};

export enum MediaTypeEnum {
  ANIME = 1,
  MANGA,
  MOVIE,
  GAME,
  TV_SERIES,
  BOOK,
}
