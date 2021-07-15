import { useEffect, useState } from "react";

import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import {
  ProfileRelationsBox,
  ProfileRelationsBoxWrapper,
} from "../src/components/ProfileRelations";
import ProfileSideBar from "../src/components/ProfileSideBar";

export default function Home() {
  const [newCommunity, setNewCommunity] = useState([]);

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [githubUser, setGithubUser] = useState({
    login: "",
    avatar_url: "",
    name: "",
  });

  useEffect(() => {
    fetch("https://api.github.com/users/eemr3/followers")
      .then((responseServer) => {
        return responseServer.json();
      })
      .then((response) => {
        setFollowers(response);
      });

    fetch("https://api.github.com/users/eemr3/following")
      .then((responseServer) => {
        return responseServer.json();
      })
      .then((response) => {
        setFollowing(response);
      });

    fetch("https://api.github.com/users/eemr3").then(async (responseServer) => {
      const dataUser = await responseServer.json();
      setGithubUser({
        login: dataUser.login,
        avatar_url: dataUser.avatar_url,
        name: dataUser.name,
      });
    });

    // Get data DatoCMS (comunidades)
    fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "4aa5008c61f6434b23a3b98af69a81",
      },
      body: JSON.stringify({
        query: `query {
  allCommunities {
    id,
    title,
    linkUrl,
    imageUrl,
    creatorSlug,
  }
}`,
      }),
    }).then(async (response) => {
      const dataDatoCMS = await response.json();
      const resultData = dataDatoCMS.data.allCommunities;

      setNewCommunity(resultData);
    });
  }, []);

  function handleNewCommunity(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const newDataCommunity = {
      title: formData.get("title"),
      imageUrl: formData.get("image"),
      linkUrl: formData.get("link"),
      creatorSlug: githubUser.login,
    };

    fetch("/api/community", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDataCommunity),
    }).then(async (response) => {
      const data = await response.json();
      const communityCreate = data.record;
      const updatedCommunities = [communityCreate, ...newCommunity];
      console.log(updatedCommunities);
      setNewCommunity(updatedCommunities);
    });
  }

  return (
    <>
      <AlurakutMenu
        githubUser={githubUser.login}
        userAvatar={githubUser.avatar_url}
      />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSideBar
            githubUser={githubUser.login}
            userAvatar={githubUser.avatar_url}
          />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem vindo(a) {githubUser.name}</h1>
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
                  placeholder="Coloque uma URL para ausarmos como capa"
                  aria-label="Coloque uma URL para ausarmos como capa"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="link"
                  placeholder="Coloque a URL de acesso a comunidade"
                  aria-label="Coloque a URL de acesso a comunidade"
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
          <ProfileRelationsBox title="Seguidores" array={followers} />
          <ProfileRelationsBox title="Seguindo" array={following} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({newCommunity.length})</h2>
            <ul>
              {newCommunity.slice(0, 6).map((item) => (
                <li key={item.id}>
                  <a href={item.linkUrl} target="_blank">
                    <img src={item.imageUrl} />
                    <span>{item.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>
          {/* <ProfileRelationsBox title="Comunidades" array={newCommunity} /> */}
        </div>
      </MainGrid>
    </>
  );
}

{
  /* <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Seguidores ({followers.length})</h2>

            <ul>
              {followers.map(
                (item, index) =>
                  index < 6 && (
                    <li key={item.id}>
                      <a href={`${item.html_url}`} target="_blank">
                        <img src={`${item.avatar_url}`} />
                        <span>{item.login}</span>
                      </a>
                    </li>
                  )
              )}
            </ul>
          </ProfileRelationsBoxWrapper> */
}
