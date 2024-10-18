// components/MiningStatus.tsx

import { useMining } from "@/hooks/gameHook";
import { useUser } from "@/hooks/userHook";
import React from "react";

const MiningStatus = () => {
  const { activateMining } = useMining();
  const { isMining } = useUser();
  return (
    <div>
      {!isMining ? (
        <button onClick={activateMining}>start mining</button>
      ) : (
        <p>mining...</p>
      )}
    </div>
  );
};

export default MiningStatus;
