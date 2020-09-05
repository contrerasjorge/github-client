import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import { IssuesMain } from './IssuesMain';

const NewIssues = () => <>New Issues</>;
const ListIssues = () => <>List Issues</>;

export const Issues = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={match.path} component={IssuesMain} />
      <Route path={`${match.path}/new`} component={NewIssues} />
      <Route path={`${match.path}/list`} component={ListIssues} />
    </Switch>
  );
};
