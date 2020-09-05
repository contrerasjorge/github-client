import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import { IssuesMain } from './IssuesMain';
import { ListIssues } from './ListIssues';

const NewIssues = () => <>New Issues</>;

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
