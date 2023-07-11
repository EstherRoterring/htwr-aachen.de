import type { FC } from "react";

import { HeadLine } from "@/components/rwth/headline";
import {
  Schnellzugriff,
  Schnellzugrifflink,
} from "@/components/rwth/schnellzugriff";
import { WSIConfig } from "@/layouts/configs";
import { Meta } from "@/layouts/Meta";
import { WSINavbar } from "@/layouts/rwth/instituteConfig";
import { Main } from "@/layouts/rwth/Main";

export const MaterialienSchnellzugriff: FC = () => {
  return (
    <div className="max-h-[410]">
      <Schnellzugriff title="Materialien">
        <Schnellzugrifflink href="/wsi/studium">Studium</Schnellzugrifflink>
        <Schnellzugrifflink href="/wsi/studium/klausuren">
          Klausuren
        </Schnellzugrifflink>
        <Schnellzugrifflink href="/wsi/studium/teachings">
          Zusammenfassungen
        </Schnellzugrifflink>
        <Schnellzugrifflink href="/wsi/studium/aufgaben">
          Aufgaben
        </Schnellzugrifflink>
      </Schnellzugriff>
    </div>
  );
};

const Studium: FC = () => {
  return (
    <Main
      meta={
        <Meta title="WSI@HTWR - Studium" description="Diskret oder?"></Meta>
      }
      {...WSIConfig}
      navbarConfig={WSINavbar}
    >
      <HeadLine title="Studium" />
      <p className="my-4">Jaja hier kommt bald was für BuK.</p>

      <MaterialienSchnellzugriff />
    </Main>
  );
};

export default Studium;
