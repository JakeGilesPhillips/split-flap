"use client"
import Image from "next/image";
import { use, useEffect, useState } from "react";
import Logo from '../../../public/logo.png';

import SplitFlapRow from "./SplitFlapRow";
import SplitFlapClock from "./SplitFlapClock";
import { useSchedule } from "../contexts/ScheduleContext";
import { useSettings } from "../contexts/SettingsContext";
import { ParseJson, fetchAPIData, fetchSettingsNew } from "../helpers/ServerHelper";
import { useInterval } from "../hooks/useInterval";


const SplitFlapBoard = () => {
  // Set mounted state
  const [mounted, setMounted] = useState<boolean>(false);
  const { settings, setSettings } = useSettings()
  const { params, schedule, setSchedule, page1, page2, page3, incrementPage1, incrementPage2, incrementPage3 } = useSchedule();

  const _fetchSettings = async () => {
    const res = await fetchSettingsNew('departures');
    const json = await ParseJson(res);
    setSettings(json);
  }

  const _fetchSchedule = async () => {
    const res = await fetchAPIData(params);
    const json = await res.json();
    setSchedule(json.value);
  }

  const changePage = async () => {
    incrementPage1();
    setTimeout(() => incrementPage2(), 3000);
    setTimeout(() => incrementPage3(), 6000);
  }

  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  // Fetch data
  useEffect(() => {
    if (!mounted && !schedule && !settings) return;
    _fetchSettings();
    _fetchSchedule();
  }, []);

  useInterval(() => {
    _fetchSchedule();
  }, 1000 * 60 * 60 * 8)

  useInterval(() => {
    if (!schedule) return;
    changePage();
  }, 20000);

  // Skip if nothing to return
  if (!mounted || !settings) return <></>;

  return (
    <div className="absolute w-full h-full flex flex-col bg-sql-gray overflow-hidden" style={{ scale: 1 }}>
      <div className="flex flex-row justify-between items-center w-full px-6 py-4 w-full bg-sql-yellow  text-black">
        <div className="flex flex-row justify-center items-center">
          <div className="flex flex-col justify-start items-start mr-4 overflow-hidden rounded-lg">
            <Image src={Logo} alt="" width={settings?.logoWidth} height={settings?.logoWidth} />
          </div>
          <span className="px-4 text-[60pt]">{settings?.title?.text}</span>
        </div>
        {/* <div className="flex flex-col justify-center items-center">
          <span className="px-4 text-[40pt] text-center">TIME</span>
          <SplitFlapClock />
        </div> */}
      </div>
      {schedule != null && schedule.length > 0 && (
        <div className="flex flex-col justify-start items-start gap-4 p-4 w-full">
          <SplitFlapRow index={0} />
          <SplitFlapRow index={1} />
          <SplitFlapRow index={2} />
        </div>
      )}
    </div>
  );
}

export default SplitFlapBoard;
