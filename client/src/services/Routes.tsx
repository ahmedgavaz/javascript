import React from 'react';
import { Navigate, Route, RouteProps } from 'react-router-dom';
import { authService } from './auth';

export function PrivateRoute({ element, ...rest }: RouteProps) {
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Route {...rest} element={element} />;
}

export function PublicRoute({ element, ...rest }: RouteProps) {
  const isAuthenticated = authService.isAuthenticated();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Route {...rest} element={element} />;
}