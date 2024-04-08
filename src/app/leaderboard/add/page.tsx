export const revalidate = 0;
import Image from "next/image";

import Logo from '../../../../public/PYTCHLogo.png';
import Pattern from '../../../../public/PYTCHBackground.jpeg';
import LeaderboardForm from "@/app/components/LeaderboardForm";

const Leaderboard = async () => {
  return (
    <main className="relative flex flex-col justify-start items-center min-w-screen min-h-screen mono bg-black text-white border">
      <Image src={Pattern} fill objectFit="cover" alt="" className="absolute top-0 left-0 w-full h-full opacity-[90%]" />
      <div className="absolute top-0 left-0 flex flex-col justify-between items-center w-full p-16">
        <div className="relative flex flex-col justify-center items-center w-full h-[260px] px-16 items-start">
          <Image className="relative" src={Logo} alt="" height={100} objectFit="contain" />
          <span className="px-4 text-[20pt] font-bold">FLIGHT SIMULATOR CHALLENGE</span>
        </div>
        <div className="flex flex-col w-full h-full mt-4 p-4 bg-white overflow-hidden rounded-xl shadow-[inset_0_0px_8px_rgba(0,0,0,0.2)] gap-8">
          <LeaderboardForm />
        </div>
      </div>
    </main >
  );
}

export default Leaderboard;