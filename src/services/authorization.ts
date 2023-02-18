const clientId = 'e236bc35cc7f4e798afc340769206ad4';
const clientSecret = '7e161270372447f4a779cd63c027f287';
const baseUrl = 'https://accounts.spotify.com';

export function authorize() {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: 'http://127.0.0.1:5173/redirect'
  });
  const authorizeUrl = `${baseUrl}/authorize?` + params;

  window.location.href = authorizeUrl;
}

export async function requestAccessToken(code: string, redirect_uri: string) {
  const url = `${baseUrl}/api/token`;
  const encodedClientInfo = btoa(`${clientId}:${clientSecret}`);

  const data = {
    code,
    redirect_uri,
    grant_type: 'authorization_code'
  }

  const accessToken = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${encodedClientInfo}`,
      'Content-Type': 'application/x-www-form-urlencoded.'
    }
  });

  console.log(accessToken);
}
