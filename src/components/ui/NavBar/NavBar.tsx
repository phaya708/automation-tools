import { Flex, Text, Button, Link } from "@chakra-ui/react";

const NavBar = () => {
  return (
    <Flex bg="gray.100" w="100%" p={4} justify="space-between" align="center">
      <Text fontSize="lg" fontWeight="bold">
        TOOLs
      </Text>
      <Flex>
        <Link m={4} href="/passgenerator" fontWeight="bold">Password Generator</Link>
        <Link m={4} href="/automailer" fontWeight="bold">Auto Mailer</Link>
      </Flex>
    </Flex>
  );
};

export default NavBar;
