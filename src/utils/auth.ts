import { LocalStorageService } from '../app/services';

export const isAuthenticated = () => {
  const accessToken = LocalStorageService.get<string>(
    LocalStorageService.OAUTH_TOKEN,
  );
  return !!accessToken && accessToken.length > 0;
  // return true;
};

export const hasAnyAuthority = (
  authorities: string[],
  hasAnyAuthorities: string[],
) => {
  if (authorities && authorities.length !== 0) {
    if (hasAnyAuthorities.length === 0) {
      return true;
    }
    return hasAnyAuthorities.some(auth => authorities.includes(auth));
  }
  return false;
};
