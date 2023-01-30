import React, { useEffect, useState } from "react";

import Button from "@atlaskit/button/standard-button";

import TableTree, { Cell, Row, Rows } from "@atlaskit/table-tree";
import Avatar, { AvatarItem } from "@atlaskit/avatar";
import { getUserGists } from "../helpers/github-gist-helper";
import moment from "moment";

type Props = {
  username: string;
  globalUser: any;
};

interface GistItem {
  id: string;
  title: string;
  created_at: string;
  programmingLanguage: string;
  forks: [];
  files: Object;
}

export const GistListing = ({ username, globalUser }: Props) => {
  const [listingItems, setListingItems] = useState([]);

  function remapGistItem(item: GistItem) {
    return {
      id: item.id,
      title: Object.values(item.files)[0].filename,
      createdAt: item.created_at,
      programmingLanguage: Object.values(item.files)[0].language,
      forks: item.forks,
      children: [],
    };
  }

  function renderFileButton(username: string, title: string) {
    return (
      <>
        <span>{username} / </span>
        <Button appearance="link" spacing="none">
          {title}
        </Button>
      </>
    );
  }

  useEffect(() => {
    getUserGists(username, 20, 1).then((response) => {
      setListingItems(response.map(remapGistItem));
    });
  }, [username]);

  return (
    <>
      {username.length === 0 ? (
        ""
      ) : (
        <div className="centered-listing">
          <TableTree>
            <Rows
              items={listingItems}
              render={({
                id,
                title,
                createdAt,
                programmingLanguage,
                forks,
                children = [],
              }) => (
                <Row
                  itemId={id}
                  items={children}
                  hasChildren={children ? children.length > 0 : false}
                  isDefaultExpanded
                >
                  <Cell width="90vh">
                    <AvatarItem
                      avatar={<Avatar src={globalUser.avatar_url} />}
                      primaryText={renderFileButton(username, title)}
                      secondaryText={moment(createdAt).fromNow()}
                    />
                  </Cell>
                  <Cell width="10vh">
                    <Button appearance="primary" spacing="compact">
                      {programmingLanguage}
                    </Button>
                  </Cell>
                </Row>
              )}
            />
          </TableTree>
        </div>
      )}
    </>
  );
};
