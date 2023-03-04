import {IFollower} from "./follower"
import {IImage} from "./image"

export interface IArtist {
  external_urls: string
  followers: IFollower
  genres: string[]
  href: string
  id: string
  images: IImage[]
  imageUrl: string
  name: string
  popularity: string
  topGenre: string;
  type: string
  uri: string
}

