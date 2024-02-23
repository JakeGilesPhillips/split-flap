export const revalidate = 0;

import SplitFlapBoard from "./components/SplitFlapBoard";
import { fetchSettings } from "./contentful/routes/Settings";

const Home = async () => {
  const initialSettings = await fetchSettings();

  return (
    <main className="flex flex-col justify-center items-center min-w-screen min-h-screen mono">
      <SplitFlapBoard initialSettings={initialSettings} />
    </main>
  );
}

export default Home;