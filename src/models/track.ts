
import type {IAlbum} from './album'
import type {IImage} from './image'

export interface ITrack {
  id: string
  images: IImage[]
  image: IImage
  name: string
  album: IAlbum
}

