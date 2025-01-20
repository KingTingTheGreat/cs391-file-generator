import { NextRequest, NextResponse } from "next/server";

async function isValidUrl(url: string): Promise<boolean> {
  try {
    const res = await fetch(url);
    return res.ok;
  } catch {
    return false;
  }
}

function isFromDomain(url: string, domain: string): boolean {
  const parsedUrl = new URL(url);
  return parsedUrl.host.endsWith(domain);
}

function currentESTTime(): string {
  const date = new Date();
  const datestring = date
    .toLocaleString("en-us", {
      timeZone: "America/New_York",
    })
    .replaceAll("/", "-")
    .replaceAll(":", "-")
    .replaceAll(", ", "_");
  const parts = datestring.split(" ");
  return parts[0].slice(0, -3) + parts[1];
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const vercelLink = decodeURIComponent(
    req.nextUrl.searchParams.get("vercelLink") as string,
  );
  const githubLink = decodeURIComponent(
    req.nextUrl.searchParams.get("githubLink") as string,
  );

  // check vercel link
  if (vercelLink === "") {
    return new NextResponse("MISSING VERCEL URL", { status: 400 });
  } else if (!(await isValidUrl(vercelLink))) {
    return new NextResponse("VERCEL URL IS NOT ACCESSIBLE", { status: 400 });
  } else if (!isFromDomain(vercelLink, "vercel.app")) {
    return new NextResponse("URL IS NOT FROM VERCEL", { status: 400 });
  }

  // check github link
  if (githubLink === "") {
    return new NextResponse("MISSING GITHUB URL", { status: 400 });
  } else if (!(await isValidUrl(githubLink))) {
    return new NextResponse("GITHUB URL IS NOT ACCESSIBLE", { status: 400 });
  } else if (!isFromDomain(githubLink, "github.com")) {
    return new NextResponse("URL IS NOT FROM GITHUB", { status: 400 });
  }

  // const res = NextResponse.json("OK", { status: 200 });
  const headers = new Headers();
  headers.set(
    "Content-Disposition",
    `attachment; filename=cs391-${currentESTTime()}.txt`,
  );
  headers.set("Content-Type", "text/plain");

  // Return the file with the content "hello"
  return new NextResponse(`${vercelLink}\n${githubLink}`, {
    status: 200,
    headers,
  });
}
