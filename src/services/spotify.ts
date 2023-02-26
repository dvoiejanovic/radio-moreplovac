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

export interface IUserProfile {
  display_name: string
  images: IImage[]
}

export interface ITopArtist {
  genres: string[]
  href: string
  id: string
  images: IImage[]
  name: string
  popularity: number
  type: string
  uri: string
}

interface ITopArtistsReponse {
  items: ITopArtist[]
}

interface IImage {
  height?: number
  width?: number
  url: string
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
  const userProfile = await fetch(`${apiBaseUrl}/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  })
  .then((response) => response.json())
  .then((data: IUserProfile) => data);

  return userProfile;
}

export async function getUserTopArtists() {
  const topArtists = await fetch(`${apiBaseUrl}/me/top/artists`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  })
  .then((response) => response.json())
  .then((data: ITopArtistsReponse) => data);

  return topArtists.items;
}
