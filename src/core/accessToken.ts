const storeKey = "access-token";

export function setAccessToken(accessToken: string) {
  localStorage.setItem(storeKey, accessToken);
}

export function getAccessToken() {
  return localStorage.getItem(storeKey);
}

export function deleteAccessToken() {
  localStorage.removeItem(storeKey);
}
