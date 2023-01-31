import React, { useState } from "react";
import "./App.css";
import { UsernameSearch } from "./components/username-input";
import { GistListing } from "./components/gist-listing";
import { UserInfo } from "./components/user-info";

import {
  Content,
  Main,
  PageLayout,
  TopNavigation,
} from "@atlaskit/page-layout";

function App() {
  const [username, setUsername] = useState("");
  const [globalUser, setGlobalUser] = useState();

  return (
    <PageLayout>
      <TopNavigation
        isFixed={true}
        id="confluence-navigation"
        skipLinkTitle="Confluence Navigation"
      >
        <UsernameSearch
          username={username}
          setUsername={setUsername}
        ></UsernameSearch>
      </TopNavigation>
      <Content testId="content">
        <Main id="main-content" skipLinkTitle="Main Content">
          <UserInfo
            username={username}
            setGlobalUser={setGlobalUser}
          ></UserInfo>
          <GistListing
            username={username}
            globalUser={globalUser}
          ></GistListing>
        </Main>
      </Content>
    </PageLayout>
  );
}

export default App;
