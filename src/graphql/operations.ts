import { gql } from "@apollo/client";

export const CREATE_SESSION = gql`
  mutation CreateSession {
    createSession {
      id
      code
      state
    }
  }
`;

export const GET_SESSION = gql`
  query GetSession($code: String!) {
    session(code: $code) {
      id
      code
      state
      polls {
        id
        question
        options
        isActive
        results {
          option
          count
        }
      }
      questions {
        id
        participantName
        text
        upvotes
        isAnswered
        isPinned
        createdAt
      }
    }
  }
`;

export const CREATE_POLL = gql`
  mutation CreatePoll($sessionId: ID!, $question: String!, $options: [String!]!) {
    createPoll(sessionId: $sessionId, question: $question, options: $options) {
      id
      question
      options
      isActive
    }
  }
`;

export const SET_SESSION_STATE = gql`
  mutation SetSessionState($sessionId: ID!, $state: SessionState!) {
    setSessionState(sessionId: $sessionId, state: $state) {
      id
      state
    }
  }
`;

export const END_SESSION = gql`
  mutation EndSession($sessionId: ID!) {
    endSession(sessionId: $sessionId) {
      id
      state
    }
  }
`;

export const PIN_QUESTION = gql`
  mutation PinQuestion($questionId: ID!) {
    pinQuestion(questionId: $questionId) {
      id
      isPinned
    }
  }
`;

export const MARK_ANSWERED = gql`
  mutation MarkAnswered($questionId: ID!) {
    markAnswered(questionId: $questionId) {
      id
      isAnswered
    }
  }
`;