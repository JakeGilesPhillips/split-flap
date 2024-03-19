export const revalidate = 0;

import { PageProps } from "../../../.next/types/app/page";
import { fetchSettings } from "../contentful/routes/Settings";

const Home = async ({ searchParams }: PageProps) => {
  const initialSettings = await fetchSettings('gates');


  return (
    <main className="flex flex-row justify-center items-center min-w-screen min-h-screen mono">
      <div className="flex flex-row h-full justi">

      </div>
    </main>
  );
}

export default Home;