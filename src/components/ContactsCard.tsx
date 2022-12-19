import { isMobile } from "react-device-detect";
import styled from "styled-components";
import { ContactObject, Contacts } from "../types/contacts";
import { breakPoint1 } from "../ViewConfigurations"

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 20px;
  background-color: var(--celadon);
  padding: 20px;
  border-radius: 20px;
  width: 160px;
  ${isMobile && `
    order: 1;
    width: auto;
    margin: auto 0 0;
    background-color: transparent;
    padding: 5px 0 20px;
  `}
  @media only screen and (min-width: ${breakPoint1}) {
    order: 5;
    width: auto;
  }
  @media print {
    margin: 10px auto;
    width: 350px;
    position: absolute;
    bottom: -200px;
    right: -50px;
  }
`;

const Title = styled.p`
  all: unset;
  font-size: 16px;
  font-weight: bold;
  color: black;
`;

const ContactContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  font-size: 14px;
`;

const ContactTitle = styled.p`
  font-weight: bold;
  margin: 10px;
  margin-left: 0px;
  margin-bottom: 5px;
  color: black;
  @media print {
    margin: 2px;
  }
`;

const ContactValue = styled.p`
  margin: 10px;
  margin-left: 10px;
`;

const Link = styled.a`
  color: var(--links-color);
  font-weight: bold;
  text-decoration: none;
  font-size: 14px;
`;


const contactsResolver = ({ contact, type, title }: ContactObject) => {

  const resolvers = {
    link: () => isMobile ?
      <Link href={contact} target="_blank">{title}</Link>
      :
      <ContactContainer>
        <ContactTitle>{title}: </ContactTitle>
        <Link href={contact} target="_blank">{contact}</Link>
      </ContactContainer>,
    "phone number": () => isMobile ?
      <Link href={"tel:" + contact}>{contact}</Link>
      :
      <ContactContainer>
        <ContactTitle>{title}: </ContactTitle>
        <Link href={"tel:" + contact}>{contact}</Link>
      </ContactContainer>,
    "e-mail": () => isMobile ?
      <Link href={"mailto:" + contact}>{contact}</Link>
      :
      <ContactContainer>
        <ContactTitle>{title}: </ContactTitle>
        <Link href={"mailto:" + contact}>{contact}</Link>
      </ContactContainer>,
    default: () => <ContactContainer>
      <ContactTitle>{title}</ContactTitle>
      <ContactValue>{contact}</ContactValue>
    </ContactContainer>
  };

  return resolvers[type] ? resolvers[type]() : resolvers.default();
}

export default ({ title = "Contacts", contacts }: Contacts) => {


  return <Container>
    <Title>{title}</Title>
    {contacts && contacts.map((contact) => contactsResolver(contact))}
  </Container>
}
    // {contacts && contacts.map(({ title, contact, type }) => <ContactContainer>
    //   <ContactTitle>{title}</ContactTitle>
    //   <ContactValue>{contact}</ContactValue>
    // </ContactContainer>)}