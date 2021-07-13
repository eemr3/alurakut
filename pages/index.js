import { useState } from "react";

import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { ProfileRelations } from "../src/components/ProfileRelations";
import ProfileSideBar from "../src/components/ProfileSideBar";

const initialData = {
  id: "2021-07-13T17:56:46.719Z",
  title: "Eu odeio acordar cedo de manhã",
  image: "http://alurakut.vercel.app/capa-comunidade-01.jpg",
  url: "https://github.com/eemr3",
};

export default function Home() {
  const [newCommunity, setNewCommunity] = useState([initialData]);
  const githubUser = "eemr3";
  const favoritiePeople = [
    "rafaballerini",
    "jeniblodev",
    "omariosouto",
    "peas",
    "marcobrunodev",
    "tiagu99",
    "juunegreiros",
    "felipefialho",
  ];

  function handleNewCommunity(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const updatedCommunities = [
      ...newCommunity,
      {
        id: new Date().toISOString(),
        title: formData.get("title"),
        image: formData.get("image"),
      },
    ];
    setNewCommunity(updatedCommunities);
  }

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSideBar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={handleNewCommunity}>
              <div>
                <input
                  type="text"
                  name="title"
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="image"
                  placeholder="Coloque uma URL par ausarmos como capa"
                  aria-label="Coloque uma URL par ausarmos como capa"
                />
              </div>
              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelations
            chosenArray="favoritiePeople"
            arrayState={favoritiePeople}
            children="Pessoas da comunidade"
            arrayLength={favoritiePeople}
            url={`https://github.com`}
          />
          <ProfileRelations
            chosenArray="newCommunity"
            arrayState={newCommunity}
            arrayLength={newCommunity}
            children="Comunidades"
          />
        </div>
      </MainGrid>
    </>
  );
}
