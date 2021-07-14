import { useEffect, useState } from "react";

import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { ProfileRelationsBox } from "../src/components/ProfileRelations";
import ProfileSideBar from "../src/components/ProfileSideBar";

export default function Home() {
  const [newCommunity, setNewCommunity] = useState([
    {
      id: "2021-07-13T17:56:46.719Z",
      login: "Curso em vídeo",
      avatar_url:
        "https://scontent.fgyn10-1.fna.fbcdn.net/v/t1.18169-9/12928280_1065564560172685_9040922445644039196_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=8631f5&_nc_ohc=u1vMEoDaZZoAX-2kcnw&_nc_ht=scontent.fgyn10-1.fna&oh=340f8d78732f5680a471ac6c5b0353f5&oe=60F43A6B",
      html_url: "https://www.facebook.com/groups/1520234831617060/",
    },
    {
      id: "2021-07-14T21:05:16.731Z",
      login: "Javascript Brasil",
      avatar_url:
        "https://scontent.fgyn10-1.fna.fbcdn.net/v/t1.6435-0/p180x540/53820983_2122399627836705_7891470569189670912_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=8631f5&_nc_ohc=hwEQpWBI8YEAX-W8nCr&_nc_ht=scontent.fgyn10-1.fna&oh=e215794f8db97383fad6d6b730b91070&oe=60F45F7B",
      html_url: "https://www.facebook.com/groups/814655205536873",
    },
    {
      id: "2021-07-14T21:04:53.610Z",
      login: "Alura Cursos Online",
      avatar_url:
        "https://scontent.fgyn10-1.fna.fbcdn.net/v/t1.6435-9/185351223_3945684018879479_5576296850537193271_n.png?_nc_cat=105&ccb=1-3&_nc_sid=e3f864&_nc_ohc=1Sqm5scon-8AX8kdDvh&_nc_ht=scontent.fgyn10-1.fna&oh=a296e9af15d70987c9e6a1832c00fe75&oe=60F44A83",
      html_url: "https://www.facebook.com/AluraCursosOnline",
    },
    {
      id: "2021-07-14T21:04:34.995Z",
      login: "ReactJS Brasil",
      avatar_url:
        "https://scontent.fgyn10-1.fna.fbcdn.net/v/t1.6435-9/61427848_2704334539608012_8400023945763356672_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=8631f5&_nc_ohc=QxpbCxBtFD8AX9kM9wB&_nc_ht=scontent.fgyn10-1.fna&oh=ace201f103791416b7734db4f638e5f2&oe=60F46984",
      html_url: "https://www.facebook.com/groups/reactjsbrasil",
    },
    {
      id: "2021-07-14T21:07:26.059Z",
      login: "Grupo FCamara",
      avatar_url:
        "https://media-exp3.licdn.com/dms/image/C4E0BAQHGs6KiEjprnw/company-logo_200_200/0/1625519055911?e=1634169600&v=beta&t=D08aPwZoCCKtbStmh8beqFoaAjHRXTbb9TgFaNgcsgM",
      html_url: "https://www.linkedin.com/company/grupofcamara/",
    },
    {
      id: "2021-07-14T21:10:19.500Z",
      login: "Rainbow Six | Brasil *Oficial*",
      avatar_url:
        "https://scontent.fgyn10-1.fna.fbcdn.net/v/t1.6435-9/89658855_10221706342146212_6774057599328321536_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=8631f5&_nc_ohc=H6jvTb9xyp8AX-LyK2d&_nc_ht=scontent.fgyn10-1.fna&oh=a403f24ec61320c6cbf4bc1082b04f87&oe=60F4456F",
      html_url: "https://www.facebook.com/groups/rainbow6brasil/",
    },
  ]);

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [githubUser, setGithubUser] = useState({
    login: "",
    avatar_url: "",
    name: "",
  });
  // const githubUser = "eemr3";
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

  useEffect(() => {
    const baseURL = "https://api.github.com/users/eemr3/followers";
    fetch(baseURL)
      .then((responseServer) => {
        return responseServer.json();
      })
      .then((response) => {
        setFollowers(response);
      });
  }, []);

  useEffect(() => {
    const baseURL = "https://api.github.com/users/eemr3/following";
    fetch(baseURL)
      .then((responseServer) => {
        return responseServer.json();
      })
      .then((response) => {
        setFollowing(response);
      });
  }, []);

  useEffect(() => {
    const baseURL = "https://api.github.com/users/eemr3";
    fetch(baseURL).then(async (responseServer) => {
      const dataUser = await responseServer.json();
      setGithubUser({
        login: dataUser.login,
        avatar_url: dataUser.avatar_url,
        name: dataUser.name,
      });
    });
  }, []);

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
          <ProfileRelationsBox title="Seguidores" array={followers} />
          <ProfileRelationsBox title="Seguindo" array={following} />
          <ProfileRelationsBox title="Comunidades" array={newCommunity} />
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
