export function shouldUseStaticCatalog(hasPlatformApi: boolean, hasApiError: boolean) {
  return !hasPlatformApi || hasApiError;
}
