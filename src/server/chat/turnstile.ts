export const verifyTurnstileToken = async (
  token: string,
  secretKey: string,
  remoteIp: string,
  fetchFn: typeof fetch = fetch
): Promise<boolean> => {
  const formData = new URLSearchParams();
  formData.append('secret', secretKey);
  formData.append('response', token);
  formData.append('remoteip', remoteIp);

  try {
    const response = await fetchFn('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    });

    if (!response.ok) return false;
    const outcome = await response.json() as { success?: boolean };
    return !!outcome.success;
  } catch {
    return false;
  }
};
