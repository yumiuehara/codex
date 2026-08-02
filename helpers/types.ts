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

export interface Media {
  IdMediaPk: number
  ImagePath: string
  IdMediaTypeFk: number
  MediaTypeName: string
  MediaName: string
  YearRelease?: number
  Authors?: string
  Status?: string
  logs: Log[]
}

export interface Log {
  IdLogPk: number
  IdMediaFk: number
  StartDate: string | number
  EndDate: string | number
  Description: string
  Enjoy: boolean
  Replay: boolean | null
  Score: number | null
  EternalSuffering: boolean | null
  Hate: boolean | null
  IdMediaPk: number
  ImagePath: string
  IdMediaTypeFk: number
  MediaTypeName: string
  MediaName: string
  MediaStatus: string
  Progress: number
  ProgressTotal: number
}

export interface Total {
  IdMediaTypePk: number
  total: number
}

export interface Years {
  year: string
}