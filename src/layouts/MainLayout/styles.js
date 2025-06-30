import styled from 'styled-components'

export const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;

  font-family: 'Poppins', sans-serif;

  width: 100%;
`

export const ProfilePicture = styled.img`
  width: 60px;
  height: 60px;

  border-radius: 999px;
  border: 2px solid ${(props) => props.theme.white};
`

export const Greetings = styled.div`
  display: flex;
  flex-direction: column;
`

export const GreetingsText = styled.h2`
  font-size: 24px;
  font-weight: 500;
  color: ${(props) => props.theme.white};

  opacity: 0.7;
  margin: 0;

  white-space: nowrap;
`

export const ProfileName = styled.h1`
  display: block;

  font-size: 28px;
  font-weight: bold;
  color: ${(props) => props.theme.white};

  margin: 0;

  white-space: nowrap;
`

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 120px;
`

export const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Poppins', sans-serif;

  height: 80px;
  width: 100%;

  border-radius: 8px;

  cursor: pointer;

  transition: background 0.1s;

  &:hover {
    background: ${(props) => props.theme['red-600']};
  }
`

export const NavigationTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: ${(props) => props.theme.white};
`

export const HeaderTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  font-family: 'Oleo Script Swash Caps', system-ui;
  color: ${(props) => props.theme.white};
`
