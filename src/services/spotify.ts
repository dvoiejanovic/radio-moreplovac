const client_id = 'e236bc35cc7f4e798afc340769206ad4';
const client_secret = '7e161270372447f4a779cd63c027f287';
const accountsBaseUrl = 'https://accounts.spotify.com';
const apiBaseUrl = 'https://api.spotify.com/v1';

interface IAccessTokenResponse {
  access_token: string,
  token_type: string,
  refresh_token: string
  expires_in: number,
  scope?: string,
}

interface ISpotifyResponse<T> {
  href: string
  limit: number
  next: string
  offset: number
  previous: string | null
  total: number
  items: T[]
}

export interface IUserProfile {
  display_name: string
  images: IImage[]
}

export interface ITopArtist {
  id: string
  genres: string[]
  href: string
  images: IImage[]
  name: string
  popularity: number
  type: string
  uri: string
}

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

interface IImage {
  height?: number
  width?: number
  url: string
}

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

interface IFollower {
  href?: string
  total: number
}

export function authorize() {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: client_id,
    redirect_uri: 'http://127.0.0.1:5173/redirect',
    scope: 'user-top-read user-read-recently-played'
  });
  const authorizeUrl = `${accountsBaseUrl}/authorize?` + params;

  window.location.href = authorizeUrl;
}

export async function requestAccessToken(code: string, redirect_uri: string): Promise<IAccessTokenResponse | undefined> {
  const url = `${accountsBaseUrl}/api/token`;
  const encodedClientInfo = btoa(`${client_id}:${client_secret}`);

  const data = {
    code,
    redirect_uri,
    grant_type: 'authorization_code'
  }

  try {
    const accessTokenData = await fetch(url, {
      method: 'POST',
      body: new URLSearchParams(data),
      headers: {
        Authorization: `Basic ${encodedClientInfo}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    })
    .then((response) => response.json())
    .then((data: IAccessTokenResponse) => data);

    return accessTokenData;
  } catch {
    console.error('Unable to request access token.')
    return;
  }
}

// Spotify API

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
      get topGenre() {
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
