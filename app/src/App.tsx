import React, { useState } from "react";
import "./App.css";
import { UsernameSearch } from "./components/username-input";
import { GistListing } from "./components/gist-listing";
import { UserInfo } from "./components/user-info";

function App() {
  const [username, setUsername] = useState("");
  const [globalUser, setGlobalUser] = useState();

  return (
    <>
      <UsernameSearch
        username={username}
        setUsername={setUsername}
      ></UsernameSearch>
      <UserInfo username={username} setGlobalUser={setGlobalUser}></UserInfo>
      <GistListing username={username} globalUser={globalUser}></GistListing>
      {/*<SyntaxHighlighter*/}
      {/*  language="jsx"*/}
      {/*  showLineNumbers={true}*/}
      {/*  codeBlock={codeBlock}*/}
      {/*></SyntaxHighlighter>*/}
    </>
  );
}

export default App;
