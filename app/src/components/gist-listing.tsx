import React, { useCallback, useEffect, useState } from "react";

import Button from "@atlaskit/button/standard-button";

import TableTree, { Cell, Row, Rows } from "@atlaskit/table-tree";
import Avatar, { AvatarItem } from "@atlaskit/avatar";
import { getUserGists, getGist } from "../helpers/github-gist-helper";
import moment from "moment";
import { SyntaxHighlighter } from "./syntax-highlighter";
import Spinner from "@atlaskit/spinner";

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
  const [isUpdating, setIsUpdating] = useState(false);

  const updateListingItems = () => {
    getUserGists(username, 20, 1)
      .then((response) => {
        // @ts-ignore
        setListingItems(response);
        setIsUpdating(false);
      })
      .catch((err) => {
        setIsUpdating(false);
        setListingItems([]);
      });
  };

  function renderFileButton(username: string, title: string, gistId: string) {
    return (
      <>
        <span>{username} / </span>
        <Button appearance="link" spacing="none">
          {title}
        </Button>
      </>
    );
  }

  function renderForks(forks: Array<any>) {
    const forkList = forks.map((fork) => (
      <li>
        <Button appearance="link">
          <a href={fork.user.repos_url}>{fork.user.login}</a>
        </Button>
      </li>
    ));

    return (
      <>
        <p>Forked by: </p>
        <ul className="horizontal-list">{forkList}</ul>
      </>
    );
  }

  useEffect(() => {
    if (username.length > 0) {
      setListingItems([]);
      setIsUpdating(true);
      updateListingItems();
    }

    return () => {};
  }, [username]);

  console.log(listingItems);
  return (
    <>
      {username.length === 0 ? (
        ""
      ) : (
        <>
          <div className="centered-listing">
            {isUpdating ? (
              <Spinner size="xlarge" />
            ) : (
              <TableTree>
                <Rows
                  items={listingItems}
                  render={({
                    id,
                    programmingLanguage,
                    forks,
                    files,
                    // @ts-ignore
                    created_at,
                  }: GistItem) => (
                    <Row itemId={id} hasChildren={false}>
                      <Cell width="100vh">
                        <AvatarItem
                          avatar={<Avatar src={globalUser?.avatar_url} />}
                          primaryText={renderFileButton(
                            username,
                            Object.values(files)[0].filename,
                            id
                          )}
                          secondaryText={moment(created_at).fromNow()}
                        />
                        {forks?.length > 0 ? renderForks(forks) : ""}
                      </Cell>
                      <Cell>
                        {Object.values(files)[0].language ? (
                          <Button appearance="primary" spacing="compact">
                            {Object.values(files)[0].language}
                          </Button>
                        ) : (
                          ""
                        )}
                      </Cell>
                    </Row>
                  )}
                />
              </TableTree>
            )}
          </div>
        </>
      )}
    </>
  );
};
