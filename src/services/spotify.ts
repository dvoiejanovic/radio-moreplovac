const client_id = 'e236bc35cc7f4e798afc340769206ad4';
const client_secret = '7e161270372447f4a779cd63c027f287';
const baseUrl = 'https://accounts.spotify.com';

interface IAccessTokenResponse {
  access_token: string,
  token_type: string,
  refresh_token: string
  expires_in: number,
  scope?: string,
}

export function authorize() {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: client_id,
    redirect_uri: 'http://127.0.0.1:5173/redirect'
  });
  const authorizeUrl = `${baseUrl}/authorize?` + params;

  window.location.href = authorizeUrl;
}

export async function requestAccessToken(code: string, redirect_uri: string): Promise<IAccessTokenResponse | undefined> {
  const url = `${baseUrl}/api/token`;
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
    .then((data: IAccessTokenResponse) => {
      return data;
    });

    return accessTokenData;
  } catch {
    console.error('Unable to request access token.')
    return;
  }
}
