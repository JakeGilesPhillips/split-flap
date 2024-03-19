"use client"
import React, { createContext, useState } from "react";
import { SettingsNew } from "../contentful/routes/SettingsNew";

interface SettingsContextProps {
	settings: SettingsNew | null;
	setSettings: (schedule: SettingsNew) => void;
}

export const SettingsContext = createContext<SettingsContextProps>({
	settings: null,
	setSettings: () => { },
});

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
	const [settings, setSettings] = useState<SettingsNew | null>(null);

	return <SettingsContext.Provider value={{ settings, setSettings }}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => {
	const context = React.useContext(SettingsContext);
	if (!context) {
		throw new Error(
			'useSettings must be used within a SettingsProvider'
		);
	}
	return context;
};