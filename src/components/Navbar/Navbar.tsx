import { useAuthState } from "react-firebase-hooks/auth";
import { Flex, Image } from "@chakra-ui/react";
import { auth } from "../../firebase/clientApp";
import RightContent from "./RightContent/RightContent";
import Directory from './Directory/Directory'
import { useRouter } from "next/router";

const Navbar = () => {

    const [user] = useAuthState(auth)

    const router = useRouter()

    return (
        <Flex
            bg='white'
            height='44px'
            padding='6px 12px'
            justify='space-between'
        >
            <Flex
                align='center'
                mr={{ base: 0, md: 2 }}
                cursor='pointer'
                onClick={() => router.push('/')}
            >
                <Image src="/images/redditFace.svg" height='30px' />
                <Image
                    src="/images/redditText.svg"
                    height='46px'
                />
            </Flex>
            {user && <Directory />}
            <RightContent user={user} />
        </Flex>
    );
};

export default Navbar;