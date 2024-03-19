"use client"
export const revalidate = 0;

import SplitFlapBoard from "./components/SplitFlapBoard";
import { ScheduleProvider } from "./contexts/ScheduleContext";
import { SettingsProvider } from "./contexts/SettingsContext";

const Home = () => {
  return (
    <main className="flex flex-col justify-center items-center min-w-screen min-h-screen mono">
      <ScheduleProvider>
        <SettingsProvider>
          <SplitFlapBoard />
        </SettingsProvider>
      </ScheduleProvider>
    </main>
  );
}

export default Home;