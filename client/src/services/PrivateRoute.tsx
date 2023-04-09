import React from 'react';
import { Navigate, Route, RouteProps } from 'react-router-dom';
import { authService } from '../services/auth';

export function PrivateRoute({ element, ...rest }: RouteProps) {
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Route {...rest} element={element} />;
}