import React, { useState } from "react";

import { AtlassianNavigation, Search } from "@atlaskit/atlassian-navigation";
import Button from "@atlaskit/button";

type Props = {
  username: string;
  setUsername: Function;
};

export const UsernameSearch = ({ username, setUsername }: Props) => {
  const DefaultSearch = () => {
    const [value, setValue] = useState(username);

    const onChange = (event: any) => {
      setValue(event.target.value);
    };

    const enterUsername = () => {
      setUsername(value);
    };

    return (
      <>
        <Search
          onClick={onChange}
          placeholder="Enter Github username..."
          tooltip="Search"
          label="Search"
          value={value}
        />
        <Button appearance="primary" onClick={enterUsername}>
          Get user gists
        </Button>
      </>
    );
  };

  return (
    <AtlassianNavigation
      label="site"
      renderProductHome={() => null}
      renderSearch={DefaultSearch}
      primaryItems={[]}
    />
  );
};
