import type {IAlbum} from "~/models/album";
import type {IArtist, IArtistResponse} from "~/models/artist";
import type {ISearchResults} from "~/models/search-results";
import type {IUserProfile} from "~/models/user-profile";

const apiBaseUrl = 'https://api.spotify.com/v1';

export interface ITypeResponse<T> {
  href: string
  limit: number
  next: string
  offset: number
  previous: string | null
  total: number
  items: T[]
}

type TTimeRange = 'long_term' | 'medium_term' | 'short_term';

export async function getUserProfile() {
  const userProfile = await request<IUserProfile>('me');
  return userProfile;
}

export async function getUserTopArtists(limit = 6, timeRange: TTimeRange = 'medium_term' ) {
  let endpoint = `me/top/artists?limit=${limit}&time_range=${timeRange}`;
  const topArtists = await request<ITypeResponse<IArtistResponse>>(endpoint);
  const artists: IArtist[] = topArtists.items.map((item) => {
    return {
      ...item,
      get imageUrl() {
        return item.images.at(0)?.url
      },
      get topGenre() {
        return item.genres.at(0);
      }
    }
  })
  return artists;
}

export async function getUserTopTracks(limit = 6, timeRange: TTimeRange = 'medium_term' ) {
  let endpoint = `me/top/tracks?limit=${limit}&time_range=${timeRange}`;
  const topTracks = await request<ITypeResponse<any>>(endpoint);
  const tracks: any[] = topTracks.items.map((item) => {
    return {
      ...item,
      get imageUrl() {
        return item.album.images?.at(0)?.url
      }
    }
  })
  return tracks;
}

export async function getArtist(id: string) {
  const artist = await request<IArtist>('artists', id)
  return artist;
}

export async function getArtistAlbums(id: string) {
  const artistAlbums = await request<ITypeResponse<IAlbum>>('artists', `${id}/albums?include_groups=album,single`);
  return artistAlbums.items;
}

export async function getSearchResults(query: string, filters?: any) {
  const requestPath = 'search?' + new URLSearchParams({
    q: query,
    type: 'artist,album',
    limit: '10'
  })

  const results = await request<ISearchResults>(requestPath);
  return results;
}

async function request<TData>(endpoint: string, param?: string, headers?: Record<string, string>) {
  const staticUrl = `${apiBaseUrl}/${endpoint}`;
  const apiUrl = param ? `${staticUrl}/${param}` : staticUrl;

  const data = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
      ...headers
    }
  })
  .then((response) => response.json())
  .then((data: TData) => data);

  return data;
}
