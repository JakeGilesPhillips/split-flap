"use client"
import { FormEvent, useState } from "react";
import { postLeaderboard } from "../helpers/ServerHelper";

const LeaderboardForm = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [score, setScore] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<string>('');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('');

    const body = JSON.stringify({ name, email, company, score: parseInt(score) });
    const response = await postLeaderboard(body);

    try {
      parseInt(score);
    } catch {
      setError('Error');
      return;
    }

    if (!name || !score) {
      setError('Missing data');
      return;
    }

    if (response && response.ok) {
      setName("");
      setEmail("");
      setCompany("");
      setScore("");
      setSuccess('Added to leaderboard');
      setTimeout(() => setSuccess(''), 2000);
    } else {
      setError(response.statusText);
    }
  }

  return (
    <div className="h-full flex flex-col w-full gap-8">
      <form className="flex flex-col w-full gap-8" onSubmit={onSubmit}>
        <input className="h-[80px] placeholder:text-white text-[20pt] py-4 px-2 text-white bg-black" onInput={(e) => setName(e.currentTarget.value)} value={name} placeholder="Name..." type="text" name="name" />
        <input className="h-[80px] placeholder:text-white text-[20pt] py-4 px-2 text-white bg-black" onInput={(e) => setEmail(e.currentTarget.value)} value={email} placeholder="Email (optional)..." type="email" name="email" />
        <input className="h-[80px] placeholder:text-white text-[20pt] py-4 px-2 text-white bg-black" onInput={(e) => setCompany(e.currentTarget.value)} value={company} placeholder="Company (optional)..." type="text" name="company" />
        <input className="h-[80px] placeholder:text-white text-[20pt] py-4 px-2 text-white bg-black" onInput={(e) => setScore(e.currentTarget.value)} value={score} placeholder="Score..." type="text" name="score" />
        <button className="bg-black text-white text-[20pt]" type="submit">SUBMIT</button>
      </form>
      {success && <span className="mt-4 text-green-600 text-[20pt] text-center w-full">{success}</span>}
      {error && <span className="mt-4 text-red-600 text-[20pt] text-center w-full">Error: {error}</span>}
    </div>
  )

}

export default LeaderboardForm;