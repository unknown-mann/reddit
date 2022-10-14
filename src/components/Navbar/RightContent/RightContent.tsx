import { Flex } from "@chakra-ui/react";
import { User } from "firebase/auth";
import AuthModal from "../../Modals/Auth/AuthModal";
import AuthButtons from "./AuthButtons";
import UserMenu from "./UserMenu";

interface RightContentProps {
    user?: User | null
}

const RightContent: React.FC<RightContentProps> = ({ user }) => {
    return (
        <>
            <AuthModal />
            <Flex justify='center' align='center' >
                {!user && <AuthButtons />}
                <UserMenu user={user} />
            </Flex>
        </>
    );
};

export default RightContent;