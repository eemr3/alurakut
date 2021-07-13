import { useState } from "react";

import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";
import ProfileSideBar from "../src/components/ProfileSideBar";

const initialData = {
  id: "2021-07-13T17:56:46.719Z",
  title: "Eu odeio acordar cedo",
  image: "http://alurakut.vercel.app/capa-comunidade-01.jpg",
};

export default function Home() {
  const [newCommunity, setNewCommunity] = useState([initialData]);
  const githubUser = "eemr3";
  const favoritiePeople = [
    "juunegreiros",
    "omariosouto",
    "peas",
    "rafaballerini",
    "marcobrunodev",
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
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({newCommunity.length})</h2>
            <ul>
              {newCommunity.map((community) => (
                <li key={community.id}>
                  <a>
                    <img src={community.image} />
                    <span>{community.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidades ({favoritiePeople.length})
            </h2>
            <ul>
              {favoritiePeople.map((people) => (
                <li key={people}>
                  <a href={`/users/${people}`} target="_blank">
                    <img src={`https://github.com/${people}.png`} />
                    <span>{people}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
