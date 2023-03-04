import {IAlbum} from "~/models/album";
import {IArtist} from "~/models/artist";
import {IUserProfile} from "~/models/user-profile";

const apiBaseUrl = 'https://api.spotify.com/v1';

interface ISpotifyResponse<T> {
  href: string
  limit: number
  next: string
  offset: number
  previous: string | null
  total: number
  items: T[]
}

export async function getUserProfile() {
  const userProfile = await request<IUserProfile>('me');
  return userProfile;
}

export async function getUserTopArtists() {
  const topArtists = await request<ISpotifyResponse<IArtist>>('me/top/artists');
  const artists = topArtists.items.map((item) => {
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
  return topArtists.items;
}

export async function getArtist(id: string) {
  const artist = await request<IArtist>('artists', id)
  return artist;
}

export async function getArtistAlbums(id: string) {
  const artistAlbums = await request<ISpotifyResponse<IAlbum>>('artists', `${id}/albums?include_groups=album,single`);
  return artistAlbums.items;
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
