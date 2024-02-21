import SplitFlapRow from "./components/SplitFlapRow";
import Logo from '../../public/logo.png';
import Image from "next/image";

export default function Home() {
  const speed1 = 0.02;
  const speed2 = 0.15;

  return (
    <main className="flex flex-col justify-center items-center min-w-screen min-h-screen mono">
      <div className="flex flex-col bg-zinc-900 px-10 pb-10 pt-6 overflow-hidden rounded-xl">
        <div className="flex flex-row justify-start items-center w-full px-3 py-6">
          <div className="flex flex-col mr-4 overflow-hidden rounded-lg">
            <Image src={Logo} alt="" width={150} height={190} />
          </div>
          <span className="text-white text-[7em] px-4">DEPARTURES</span>
        </div>
        <div className="flex flex-row justify-center items-center gap-20">
          <div className="flex flex-col justify-center items-start gap-8 p-2">
            <span className="text-white text-[4em]">ROOM</span>
            <SplitFlapRow word="SUITE 1" length={9} speed1={speed1} speed2={speed2} />
            <SplitFlapRow word="SUITE 2" length={9} speed1={speed1} speed2={speed2} />
            <SplitFlapRow word="MAIN HALL" length={9} speed1={speed1} speed2={speed2} />
            <SplitFlapRow word="BATHROOMS" length={9} speed1={speed1} speed2={speed2} />
          </div>
          <div className="flex flex-col justify-center items-start gap-8 p-2">
            <span className="text-white text-[4em]">CONFERENCE</span>
            <SplitFlapRow word="SOMETHING ABOUT CODE" length={20} speed1={speed1} speed2={speed2} type='ALPHABET' />
            <SplitFlapRow word="PYTHON IS NOT OK" length={20} speed1={speed1} speed2={speed2} type='ALPHABET' />
            <SplitFlapRow word="DATABASES FOR NERDS" length={20} speed1={speed1} speed2={speed2} type='ALPHABET' />
            <SplitFlapRow word="DUCK DUCK GOOSE" length={20} speed1={speed1} speed2={speed2} type='ALPHABET' />
          </div>
          <div className="flex flex-col justify-center items-start gap-8 p-2">
            <span className="text-white text-[4em]">TIME</span>
            <SplitFlapRow word="10:15" length={5} speed1={speed1} speed2={speed2} type='NUMERIC' />
            <SplitFlapRow word="11:10" length={5} speed1={speed1} speed2={speed2} type='NUMERIC' />
            <SplitFlapRow word="12:30" length={5} speed1={speed1} speed2={speed2} type='NUMERIC' />
            <SplitFlapRow word="14:40" length={5} speed1={speed1} speed2={speed2} type='NUMERIC' />
          </div>
        </div>
      </div>
    </main>
  );
}
