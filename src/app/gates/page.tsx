export const revalidate = 0;

import { PageProps } from "../../../.next/types/app/page";
import SplitFlapGates from "../components/SplitFlapGates";
import { fetchSettings } from "../contentful/routes/Settings";

const Home = async () => {
  const initialSettings = await fetchSettings('gates');

  return (
    <main className="flex flex-col justify-center items-center min-w-screen min-h-screen mono">
      <SplitFlapGates initialSettings={initialSettings} />
    </main>
  );
}

export default Home;