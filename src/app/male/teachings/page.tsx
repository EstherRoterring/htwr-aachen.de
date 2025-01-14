import type { Metadata } from "next";
import Link from "next/link";
import { join } from "path";

import { HeadLine } from "@/components/rwth/headline";
import TeachingList from "@/components/teachings/List";
import { getAllDocsFromDir } from "@/lib/documents";

import { MaterialienSchnellzugriff } from "../Schnellzugriff";

async function getData() {
  const folien = getAllDocsFromDir(
    join(process.cwd(), "public", "teaching-assets", "male", "folien"),
    "/teaching-assets/male/folien",
    false
  );

  return {
    folien: await folien,
  };
}

export const metadata: Metadata = {
  title: "Zusammenfassungen",
  description:
    "KI, Blockchain, Digital Transformation, Web 4.0, 5G, AGI, Smart City",
  alternates: {
    canonical: "/male/teachings",
  },
};

export default async function TeachingsPage() {
  const { folien } = await getData();

  return (
    <div className="px-3">
      <HeadLine title="Vorlesungsmaterialien" />

      <div className="grid grid-flow-row-dense grid-rows-[auto_auto_auto] lg:grid-cols-[1fr_250px] lg:grid-rows-[auto_auto]">
        <div className="">
          <h1 className="font-sans text-4xl font-light" id="folien-merge">
            Vorlesungsfolien / Script
          </h1>

          <p className="my-2">It's stocha time.</p>

          <ul className="my-2 ml-8 list-disc">
            <li>
              <a
                target={"_blank"}
                href="/teaching-assets/male/folien-merged.pdf"
              >
                Folienmerge
              </a>
            </li>
            <li>
              <a target={"_blank"} href="https://panikzettel.htwr-aachen.de">
                Panikzettel
              </a>
            </li>
          </ul>

          <h2 className="font-sans text-4xl font-light" id="folien">
            Alle Folien
          </h2>

          <p className="my-2"></p>
          <ul className="my-2 ml-8 list-disc">
            {folien.map((doc) => {
              return (
                <li key={doc.name}>
                  <Link href={doc.url} target={"_blank"}>
                    {doc.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="my-8 lg:col-span-2">
          <h1 className="mb-2 mt-4 font-sans text-4xl">
            Erklärungen in ihrem eigenen Stil
          </h1>

          <p>
            Wenn jemand irgendwas falsches entdeckt (kann schon gut sein) meldet
            euch (oder korrigiert es selber{" "}
            <a
              target={"_blank"}
              href="https://github.com/JohnnyS318/htwr-aachen.de"
              rel="noreferrer"
            >
              hier.
            </a>
            ):{" "}
            <a
              target={"_blank"}
              href="mailto:jonas.max.schneider@gmail.com"
              rel="noreferrer"
            >
              jonas.max.schneider@gmail.com
            </a>{" "}
            oder Discord:{" "}
            <a
              target={"_blank"}
              href="https://discordapp.com/users/317018058428514314"
              rel="noreferrer"
            >
              Jonsch318
            </a>
          </p>
          <br />

          <p>
            Es kommt hier ganz eventuell noch was aber das dauert, also immer
            mal wieder vorbeischauen.
          </p>

          <ul className="list-disc px-4 pt-8 lg:pl-8">
            <TeachingList subject="male" />
          </ul>
        </div>
        <MaterialienSchnellzugriff />
      </div>
    </div>
  );
}
