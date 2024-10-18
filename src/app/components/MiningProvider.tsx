import { useMining } from '@/hooks/gameHook';
import React from 'react';

const MiningProvider = ({ children }: { children: React.ReactNode }) => {
  useMining(); 

  return <>{children}</>;
};

export default MiningProvider;
