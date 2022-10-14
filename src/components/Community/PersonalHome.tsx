import { Button, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { FaReddit } from "react-icons/fa";
import { authModalState } from "../../atoms/authModalAtom";
import { auth } from "../../firebase/clientApp";
import useDirectory from "../../hooks/useDirectory";

const PersonalHome: React.FC = () => {

    const { toggleMenuOpen } = useDirectory()

    const [user] = useAuthState(auth)

    const setAuthModalState = useSetRecoilState(authModalState)

    const handleClick = () => {
        if (!user) {
            setAuthModalState({ open: true, view: 'login' })
        }
        toggleMenuOpen()
    }

    return (
        <Flex
            direction="column"
            bg="white"
            borderRadius={4}
            border="1px solid"
            borderColor="gray.300"
            position="sticky"
        >
            <Flex
                align="flex-end"
                color="white"
                p="6px 10px"
                bg="blue.500"
                height="70px"
                borderRadius="4px 4px 0px 0px"
                fontWeight={600}
                bgImage="url(/images/redditPersonalHome.png)"
                backgroundSize="cover"
            ></Flex>
            <Flex direction="column" p="12px">
                <Flex align="center" mb={2}>
                    <Icon as={FaReddit} fontSize={50} color="brand.100" mr={2} />
                    <Text fontWeight={600} color='gray.800'>Home</Text>
                </Flex>
                <Stack spacing={3}>
                    <Text fontSize="10pt" color='gray.800'>
                        Your personal Reddit frontpage, built for you.
                    </Text>
                    <Button height="30px" onClick={handleClick}>
                        Create Post
                    </Button>
                    <Button
                        variant="outline"
                        height="30px"
                        _hover={{ opacity: 0.8 }}
                        onClick={handleClick}
                    >
                        Create Community
                    </Button>
                </Stack>
            </Flex>
        </Flex>
    );
};
export default PersonalHome;