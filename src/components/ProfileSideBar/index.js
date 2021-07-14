import Box from "../Box";
import { AlurakutProfileSidebarMenuDefault } from "../../lib/AlurakutCommons";
function ProfileSideBar({ githubUser, userAvatar }) {
  return (
    <Box as="aside">
      <img src={userAvatar} style={{ borderRadius: "8px" }} />
      <hr />
      <p>
        <a
          className="boxLink"
          href={`https://github.com/${githubUser}`}
          target="_blank"
        >
          @{githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

export default ProfileSideBar;
