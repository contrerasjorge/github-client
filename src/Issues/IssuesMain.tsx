import React, { useEffect, useRef } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { Panel } from '../Panel';

export const IssuesMain = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const ref = useRef<any>();

  useEffect(() => {
    ref.current.key('c', () => history.push(`${match.url}/new`));
    ref.current.key('l', () => history.push(`${match.url}/list`));
  }, []);

  return (
    <Panel ref={ref} height={10} top="25%" left="center">
      <blessed-text left="center" bg="white" fg="black" content="Issues" />
      <blessed-button
        left="center"
        top={3}
        bg="white"
        fg="black"
        content="l: List Issues"
      />
      <blessed-button
        left="center"
        top={5}
        bg="white"
        fg="black"
        content="c: Create New Issue"
      />
    </Panel>
  );
};
