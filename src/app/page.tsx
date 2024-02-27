export const revalidate = 0;

import { PageProps } from "../../.next/types/app/page";
import SplitFlapBoard from "./components/SplitFlapBoard";
import { fetchSettings } from "./contentful/routes/Settings";

const Home = async ({ searchParams }: PageProps) => {
  const initialSettings = await fetchSettings(searchParams?.name);

  return (
    <main className="flex flex-col justify-center items-center min-w-screen min-h-screen mono">
      <SplitFlapBoard initialSettings={initialSettings} />
    </main>
  );
}

export default Home;