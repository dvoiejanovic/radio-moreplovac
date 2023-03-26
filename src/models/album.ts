import type {IImage} from "./image";

export interface IAlbum {
  id: string
  album_group: string
  album_type: string
  available_markets: string[]
  images: IImage[]
  name: string
  release_date: string
  total_tracks: number
  type: string
  uri: string
}

