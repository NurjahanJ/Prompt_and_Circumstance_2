import React from 'react';
import { ConvexProvider as ConvexReactProvider } from 'convex/react';
import { convex } from '../../convex/convex';

/**
 * Convex Provider component to wrap the application
 * This provides access to the Convex client throughout the app
 */
export const ConvexProvider = ({ children }) => {
  return (
    <ConvexReactProvider client={convex}>
      {children}
    </ConvexReactProvider>
  );
};
