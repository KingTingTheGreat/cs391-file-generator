"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [vercelLink, setVercelLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  return (
    <main className="text-center p-6">
      <h1 className="text-4xl">CS391 File Generator</h1>
      <h2 className="text-xl">
        Submit your Vercel and GitHub links here to create a text file to submit
        on Gradescope.
      </h2>
      <div className="flex justify-center">
        <p className="text-sm max-w-[45vw]">
          A note on this tool: This tool checks if your links are publicly
          accessible and are from Vercel and GitHub, respectively. This tool
          does not check the correctness of your project nor if you have
          submitted the correct GitHub repository. It is up to you to make sure
          your project works and the links are for the correct resource. If you
          believe there is a bug with this tool, please report it to the course
          staff on Piazza.
        </p>
      </div>
      <div className="flex justify-center p-4">
        <form
          className="flex flex-col min-w-[45vw] items-center"
          onSubmit={(e) => {
            e.preventDefault();
            setError("");
            const endpoint = `/generate-file?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&vercelLink=${encodeURIComponent(vercelLink)}&githubLink=${encodeURIComponent(githubLink)}&t=${new Date().getTime()}`;
            fetch(endpoint).then((res) =>
              res.ok
                ? router.push(endpoint)
                : res.text().then((errorMsg) => setError(errorMsg)),
            );
          }}
        >
          <div className="w-full text-start m-1">
            <p className="text-sm">Name</p>
            <input
              type="name"
              placeholder="Name"
              className="w-full p-1 border-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="w-full text-start m-1">
            <p className="text-sm">BU Email</p>
            <input
              type="email"
              placeholder="BU Email"
              className="w-full p-1 border-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full text-start m-1">
            <p className="text-sm">Vercel Link</p>
            <input
              type="url"
              placeholder="Vercel Link"
              className="w-full p-1 border-2"
              value={vercelLink}
              onChange={(e) => setVercelLink(e.target.value)}
            />
          </div>
          <div className="w-full text-start m-1">
            <p className="text-sm">GitHub Link</p>
            <input
              type="url"
              placeholder="GitHub Link"
              className="w-full p-1 border-2"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
            />
          </div>
          <button type="submit" className="border-2 rounded-xl py-2 px-4 m-1">
            Submit
          </button>
          <p className="text-red-600">{error}</p>
        </form>
      </div>
    </main>
  );
}
