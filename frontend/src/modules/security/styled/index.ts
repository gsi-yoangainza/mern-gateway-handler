import styled from 'styled-components';

export const FormContainerPublic = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 20px;

  & .heading {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 5px;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & h1 {
      font-size: 2rem;
    }

    & p {
      color: #828282;
      font-size: 1.5rem;
    }
  }
`;

export const StyledSignUpDiv = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  color: rgba(0, 0, 0, 0.45);

  & span {
    margin-right: 5px;
  }
`;
