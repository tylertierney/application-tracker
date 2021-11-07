import { Text } from "@chakra-ui/react";
import { ReactChild } from "react";
import { ReactNode } from "react";

type Props = {
  link: string;
};

const ConditionalLink: React.FC<Props> = ({ children, link }) => {
  if (children === null) {
    return null;
  }

  if (link) {
    return (
      <a href={link} target="_blank">
        <Text fontSize="0.8rem">
          via{" "}
          <Text color="blue.400" textDecoration="underline" as="span">
            {children}
          </Text>
        </Text>
      </a>
    );
  }
  return <Text fontSize="0.8rem">via {children}</Text>;
};

export default ConditionalLink;
