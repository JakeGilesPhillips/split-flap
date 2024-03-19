"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import usePolling from "@eballoi/react-use-polling";

import Logo from '../../../public/logo.png';
import SplitFlapRow from "./SplitFlapRow";
import { Settings } from "../contentful/routes/Settings";
import { GetColumnsFromRowByID } from "../helpers/DataHelper";
import { ParseJson, fetchSettings } from "../helpers/ServerHelper";

interface SplitFlapGatesProps {
  initialSettings: Settings;
}

const SplitFlapGates = ({ initialSettings }: SplitFlapGatesProps) => {
  const [settings, setSettings] = useState<Settings>(initialSettings);

  // Configure fetch function
  const fetchData = async (): Promise<Settings> => {
    const res = await fetchSettings('gates')
    return ParseJson(res);
  }

  // Start polling
  const { data } = usePolling(fetchData, { interval: 2000 });

  // Update page when data changes
  useEffect(() => {
    if (!data) return;
    setSettings(data);
  }, [data]);

  return (
    <div className="grid grid-cols-3" style={{ columnGap: settings.scale, rowGap: 100 }}>
      {settings?.rows?.map((row, i) => (
        <div key={i} className="flex flex-col bg-zinc-900 p-6 overflow-hidden rounded-xl">
          <div className="flex flex-row justify-center items-center gap-10">
            <div className="text-white" style={{ fontSize: settings?.title?.fontSize }}>{row.rowName}</div>
            {row?.columns?.map((col, j) => {
              const parent = settings?.columns?.find((a) => a.id == col.columnId);

              return (
                <SplitFlapRow key={i} word={col.text} targetColor={col.color} speed1={settings.initialSpeed} height={settings.rowHeight} width={settings.logoWidth} fontSize={settings.rowFontSize} type={parent?.type} />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SplitFlapGates;