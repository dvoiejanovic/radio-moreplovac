import type {ITypeResponse} from '~/services/spotify';
import type {IAlbum} from './album';
import type {IArtist} from './artist';

export interface ISearchResults {
  albums: ITypeResponse<IAlbum>
  artists: ITypeResponse<IArtist>
}
