"use client";
import React, { createContext, useState } from "react";
import { Schedule } from "../models/api";

interface ScheduleContextProps {
	params?: any;
	page1: number;
	page2: number;
	page3: number;
	setPage1: (page: number) => void;
	setPage2: (page: number) => void;
	setPage3: (page: number) => void;
	incrementPage1: () => void;
	incrementPage2: () => void;
	incrementPage3: () => void;
	getPage: (index: number) => number;

	schedule: Schedule[];
	setSchedule: (schedule: Schedule[]) => void;
}

export const ScheduleContext = createContext<ScheduleContextProps>({
	params: undefined,
	page1: 0,
	page2: 1,
	page3: 2,
	setPage1: () => { },
	setPage2: () => { },
	setPage3: () => { },
	incrementPage1: () => { },
	incrementPage2: () => { },
	incrementPage3: () => { },
	schedule: [],
	setSchedule: () => { },
	getPage: (index: number) => 0,
});

export const ScheduleProvider = ({ children, searchParams }: { children: React.ReactNode, searchParams?: any }) => {
	const [params, setParams] = useState<string>(searchParams || "");
	const [page1, setPage1] = useState<number>(0);
	const [page2, setPage2] = useState<number>(1);
	const [page3, setPage3] = useState<number>(2);
	const [schedule, setSchedule] = useState<Schedule[]>([]);

	const incrementPage1 = () => {
		setPage1((page1 + 3) % schedule?.length || 3);
	}

	const incrementPage2 = () => {
		setPage2((page2 + 3) % schedule?.length || 3);
	}

	const incrementPage3 = () => {
		setPage3((page3 + 3) % schedule?.length || 3);
	}

	const getPage = (index: number) => {
		if (index === 0) return page1;
		if (index === 1) return page2;
		if (index === 2) return page3;
		return 0;
	}

	return <ScheduleContext.Provider value={{ params, page1, setPage1, page2, setPage2, page3, setPage3, incrementPage1, incrementPage2, incrementPage3, schedule, setSchedule, getPage }}>{children}</ScheduleContext.Provider>;
};

export const useSchedule = () => {
	const context = React.useContext(ScheduleContext);
	if (!context) {
		throw new Error(
			'useSchedule must be used within a ScheduleProvider'
		);
	}
	return context;
};