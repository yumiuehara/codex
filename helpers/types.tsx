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
  score?: number,
  eternalSuffering?: boolean
  hate?: boolean
};

type Description = {
  "en-us": string;
  "pt-br": string;
};

export type Favorite = {
  img: string,
  name: string,
  source: string,
  favoriteType: string
}

export enum MediaTypeEnum {
  ANIME = 1,
  MANGA,
  MOVIE,
  GAME,
  TV_SERIES,
  BOOK,
}

export enum FavoriteTypeEnum {
  CHARACTER = 'CHARACTER'
}