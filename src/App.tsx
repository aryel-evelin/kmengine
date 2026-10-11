/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Dashboard from './Dashboard.jsx';
import Login from './Login.jsx';

export interface UserSession {
  email: string;
  name: string;
  avatar?: string | null;
  provider: 'email' | 'google';
  role?: string;
  tier?: string;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);

  const handleLoginSuccess = (userData: UserSession) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <Dashboard
      user={currentUser}
      onLogout={handleLogout}
    />
  );
}
