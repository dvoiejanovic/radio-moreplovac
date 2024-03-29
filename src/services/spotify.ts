import type {IAlbum} from '~/interfaces/album';
import type {IArtist, IArtistResponse} from '~/interfaces/artist';
import type {ISearchResults} from '~/interfaces/search-results';
import type {ITrack} from '~/interfaces/track';
import type {IUserProfile} from '~/interfaces/user-profile';
import {Album} from '~/models/album';
import {Track} from '~/models/track';

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
  const endpoint = `me/top/artists?limit=${limit}&time_range=${timeRange}`;
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
  const endpoint = `me/top/tracks?limit=${limit}&time_range=${timeRange}`;
  const topTracks = await request<ITypeResponse<ITrack>>(endpoint);
  const tracks: Track[] = topTracks.items.map((item) => {
    return new Track(item);
  });

  return tracks;
}

export async function getTrack(id: string) {
  const endpoint = `tracks/${id}`;
  const track = await request<ITrack>(endpoint);

  return new Track(track);
}

export async function getAlbum(id: string) {
  const endpoint = `albums/${id}`;
  const album = await request<IAlbum>(endpoint);

  return new Album(album);
}

export async function getArtist(id: string) {
  const artist = await request<IArtist>('artists', id)
  return {
    ...artist,
    get image() {
      return artist.images[0]
    }
  };
}

export async function getArtistTopTracks(id: string) {
  const tracksResponse = await request<{tracks: ITrack[]}>(`artists/${id}/top-tracks?market=US`,);
  return tracksResponse.tracks.map((track) => new Track(track));
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
