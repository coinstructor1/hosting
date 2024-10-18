"use client";

import { levelToStatus } from "@/utilities/utils";

// a progress bar that is filled with the progress of the user
// shows the actual level of user (level/maxLevel)
// shows the progress of the user to the next level
// shows the status of the user (like epic, legendary, etc.)

interface ProgressBarProps {
  level: number;
  progress: number;
  maxLevel: number;
}
export default function ProgressBar({
  level,
  progress,
  maxLevel,
}: ProgressBarProps) {
  return (
    <div className="w-full px-4 pt-4">
      <div className="flex justify-between">
        <div className="progress-bar-status-label">
          <span>{levelToStatus(level)}</span>
        </div>
        <div className="progress-bar-level-label">
          <span>
            Level {level}/{maxLevel}
          </span>
        </div>
      </div>
      <div className="progress-bar">
        <div className="bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-400 via-purple-500 to-blue-500 h-2 rounded-full"
            style={{ width: `${progress <= 100 ? progress : 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
