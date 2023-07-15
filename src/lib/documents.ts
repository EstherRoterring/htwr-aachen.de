import { readdir } from "fs/promises";

import { API_URL } from "@/utils/TeachingConfig";

export type Document = {
  name: string;
  url: string;
  year: number;
};

export const getProtectedDownloads = async (
  subject: string
): Promise<string[]> => {
  try {
    const res = await fetch(`${API_URL}/info/klausuren?subject=${subject}`, {
      method: "GET",
      redirect: "follow",
    });

    if (res.status !== 200) {
      return [];
    }

    const data = await res.json();
    return data;
  } catch (e) {
    return [];
  }
};

const replacer = (file: string): string => {
  const strList = file.split(".");
  strList.pop();
  const str = strList.join(".");

  const definition = str.substring(0, 2);
  const rest = str
    .substring(2)
    .replace("wdh", "Wiederholungsklausur")
    .replace("lsg", "mit Lösung")
    .replace("pro", "Probe")
    .replaceAll("-", " ");

  switch (definition) {
    case "VL":
    case "vl":
      return `Vorlesung ${rest}`;
    case "ue":
      return `Übung ${rest}`;
    case "gl":
      return `Globalübung (Glob) ${rest}`;
    case "ss":
      return `Sommersemester ${rest}`;
    case "ws":
      return `Wintersemester ${rest}`;
    default:
      return str;
  }
};

export async function getAllDocsFromDir(
  dir: string,
  urlPrefix: string,
  sortByKlausurFormat: boolean
): Promise<Document[]> {
  try {
    let docs: Document[] = [];
    const files = await readdir(dir);
    docs = files.map((file) => {
      const name = replacer(file);
      return {
        name,
        url: `${urlPrefix}/${file}`,
        year: parseInt(file.substring(2, 4), 10) || -1,
      };
    });

    if (sortByKlausurFormat) {
      docs.sort((a, b) => {
        return a.year > b.year ? -1 : 1;
      });
    } else {
      docs.sort((a, b) => {
        return a.name > b.name ? 1 : -1;
      });
    }

    return docs;
  } catch (err) {
    return [];
  }
}
