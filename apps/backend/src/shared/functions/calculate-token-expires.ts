export function calculateTokenExpires(tokenExpiresTime: string) {
  return new Date(Date.now() + parseInt(tokenExpiresTime));
}
