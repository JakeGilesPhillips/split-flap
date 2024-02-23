"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import usePolling from "@eballoi/react-use-polling";

import Logo from '../../../public/logo.png';
import SplitFlapRow from "../components/SplitFlapRow";
import { Settings } from "../contentful/routes/Settings";
import { ParseJson } from "../helpers/ResponseHelper";
import { GetColumnsFromRowByID } from "../helpers/DataHelper";

interface SplitFlapBoardProps {
  initialSettings: Settings;
}

const SplitFlapBoard = ({ initialSettings }: SplitFlapBoardProps) => {
  const [settings, setSettings] = useState(initialSettings);

  // Configure fetch function
  const fetchData = async (): Promise<Settings> => {
    const res = await fetch("/api/settings");
    return ParseJson(res);
  }

  // Start polling
  const { data } = usePolling(fetchData, { interval: 2000 });

  // Update page when data changes
  useEffect(() => {
    if (!data) return;
    setSettings(data);
  }, [data])

  return (
    <div className="flex flex-col bg-zinc-900 px-6 pb-8 pt-4 overflow-hidden rounded-xl" style={{ scale: settings.scale }}>
      <div className="flex flex-row justify-start items-center w-full px-3 py-6">
        <div className="flex flex-col mr-4 overflow-hidden rounded-lg">
          <Image src={Logo} alt="" width={settings?.logoWidth} height={settings?.logoWidth} />
        </div>
        <span className="text-white px-4" style={{ fontSize: settings?.title?.fontSize }}>{settings?.title?.text}</span>
      </div>
      <div className="flex flex-row justify-center items-center gap-10">
        {settings?.columns?.map((col, i) => {
          const rows = GetColumnsFromRowByID(i, settings.rows);
          return (
            <div key={i} className="flex flex-col justify-center items-start gap-2 p-2">
              <span className="text-white" style={{ fontSize: col.fontSize }}>{col.text}</span>
              {rows?.map((row, j) => (
                <SplitFlapRow key={i * j} word={row.text} length={col.characters} speed1={settings.initialSpeed} speed2={settings.finalSpeed} height={settings.rowHeight} fontSize={settings.rowFontSize} type={col.type} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SplitFlapBoard;