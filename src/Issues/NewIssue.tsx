import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useApolloClient, useMutation } from 'react-apollo-hooks';
import { Field } from '../Field';
import { Form, FormValues } from '../Form';
import { Panel } from '../Panel';
import { NewIssueSuccess } from './NewIssueSuccess';
import { GET_REPOSITORY } from '../queries/getRepository';
import {
  getRepository,
  getRepositoryVariables,
} from '../queries/types/getRepository';
import {
  createNewIssue,
  createNewIssueVariables,
  createNewIssue_createIssue_issue,
} from './types/createNewIssue';

export const NewIssue = () => {
  const [issue, setIssue] = useState<createNewIssue_createIssue_issue | null>();

  const [createIssue] = useMutation<createNewIssue, createNewIssueVariables>(
    CREATE_ISSUE
  );

  const client = useApolloClient();

  const onSubmit = async (values: FormValues) => {
    const [repo, title, body] = values.textbox;
    const [owner, name] = repo.split('/');
    const { data } = await client.query<getRepository, getRepositoryVariables>({
      query: GET_REPOSITORY,
      variables: {
        owner,
        name,
      },
    });

    if (!data || !data.repository) {
      return;
    }

    const result = await createIssue({
      variables: {
        title,
        body,
        repository: data.repository.id,
      },
    });

    setIssue(result.data?.createIssue?.issue);
  };

  if (issue) {
    return <NewIssueSuccess issue={issue} />;
  }

  return (
    <Panel top="25%" left="center" height={10}>
      <blessed-text left="center" bg="white" fg="black" content="New Issue" />
      <Form onSubmit={onSubmit}>
        {(triggerSubmit) => {
          return (
            <>
              <Field top={0} label="Repo: " onSubmit={triggerSubmit} />
              <Field top={1} label="Title: " onSubmit={triggerSubmit} />
              <Field top={2} label="Body: " onSubmit={triggerSubmit} />
            </>
          );
        }}
      </Form>
    </Panel>
  );
};

const CREATE_ISSUE = gql`
  mutation createNewIssue($title: String, $body: String, $repository: ID) {
    createIssue(
      input: { title: $title, body: $body, repositoryId: $repository }
    ) {
      issue {
        title
        url
      }
    }
  }
`;