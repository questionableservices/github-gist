import React, { useEffect, useState } from "react";

import EmptyState from "@atlaskit/empty-state";
import { getUserInfo } from "../helpers/github-gist-helper";

type Props = {
  username: string;
  setGlobalUser: Function;
};

interface userInformation {
  avatar_url: string | undefined;
  name: string | null;
  bio: string | null;
  login: string | null;
}

export const UserInfo = ({ username, setGlobalUser }: Props) => {
  const [user, setUser] = useState<userInformation>({
    avatar_url: undefined,
    name: null,
    bio: null,
    login: null,
  });

  useEffect(() => {
    if (!username) return () => {};

    getUserInfo(username)
      .then((response) => {
        setUser({
          avatar_url: response.avatar_url,
          name: response.name,
          bio: response.bio,
          login: response.login,
        });

        setGlobalUser({
          avatar_url: response.avatar_url,
          name: response.name,
          bio: response.bio,
          login: response.login,
        });
      })
      .catch((err) => {
        setUser({
          avatar_url: undefined,
          name: null,
          bio: null,
          login: null,
        });
      });
  }, [username, username]);

  return (
    <>
      {!user.name || username.length === 0 ? (
        <EmptyState
          header="No valid user entered"
          description="There is no valid username given at the moment"
        />
      ) : (
        <div className="card-container centered-listing">
          <img className="round" src={user.avatar_url} alt="user" />
          <h3>{user.name}</h3>
          <p>{user.bio}</p>
        </div>
      )}
    </>
  );
};
