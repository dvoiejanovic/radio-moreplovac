
import type {IAlbum} from './album'
import type {IArtist} from './artist'

export interface ITrack {
  id: string
  name: string
  type: string
  album: IAlbum
  duration_ms: number
  artists: IArtist[]
  genres: string[]
}

