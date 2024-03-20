export const revalidate = 0;
import Image from "next/image";

import Logo from '../../../../public/Solarwinds.png';
import Pattern from '../../../../public/SolarwindsPattern.png';
import { FormEvent } from "react";

const Leaderboard = async () => {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: formData,
    })

    // Handle response if necessary
    const data = await response.json()
    // ...
  }

  return (
    <main className="relative flex flex-col justify-start items-center min-w-screen min-h-screen mono bg-solarwinds text-white border">
      <Image src={Pattern} fill objectFit="contain" alt="" className="absolute top-0 left-0 w-full h-full opacity-[10%]" />
      <div className="absolute top-0 left-0 flex flex-col justify-center items-center h-full w-full p-8">
        <div className="relative flex flex-col justify-start w-full h-[160px] px-16 items-start">
          <Image className="relative" src={Logo} alt="" height={200} objectFit="contain" />
        </div>
        <span className="px-4 text-[30pt] font-bold">FLIGHT SIMULATOR CHALLENGE</span>
      </div>
      <form onSubmit={onSubmit}>
        <input type="text" name="name" />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

export default Leaderboard;