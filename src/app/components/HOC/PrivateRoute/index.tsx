import React from 'react';
import { Navigate } from 'react-router-dom';
import { hasAnyAuthority, isAuthenticated } from '../../../../utils/auth';
import { LocalStorageService } from '../../../services';
import { path } from '../../../routes/path';

interface IOwnProps {
  hasAnyAuthorities?: string[];
  children: React.ReactNode;
}

export const PrivateRoute = ({
  children,
  hasAnyAuthorities = [],
}: IOwnProps) => {
  const userRoles = LocalStorageService.get<string[]>(
    LocalStorageService.USER_ROLE,
  );
  const isAuthorized = hasAnyAuthority(userRoles || [], hasAnyAuthorities);

  if (!isAuthenticated()) {
    return (
      <Navigate
        to={{
          pathname: path.login,
          search: location.search,
        }}
      />
    );
  }

  if (isAuthenticated()) {
    return <div>{children}</div>;
  }
  return (
    <Navigate
      to={{
        pathname: path.login,
        search: location.search,
      }}
    />
  );
};

export default PrivateRoute;
