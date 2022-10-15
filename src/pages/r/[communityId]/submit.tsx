import { useAuthState } from 'react-firebase-hooks/auth';
import { Box, Flex, Text } from '@chakra-ui/react';
import About from '../../../components/Community/About';
import PageContent from '../../../components/Layout/PageContent';
import NewPostForm from '../../../components/Posts/PostForm/NewPostForm';
import { auth } from '../../../firebase/clientApp';
import useCommunityData from '../../../hooks/useCommunityData';
import AuthButtons from '../../../components/Navbar/RightContent/AuthButtons';

const SubmitPostPage = () => {

    const [user] = useAuthState(auth)

    const { communityStateValue } = useCommunityData()

    return (
        <PageContent>
            <>
                <Box p='14px 0' borderBottom='1px solid' borderColor='white'>
                    <Text color='gray.800' fontWeight={600}>
                        Create a post
                    </Text>
                </Box>
                {user ? (
                    <NewPostForm user={user} communityImageURL={communityStateValue.currentCommunity?.imageURL} />
                ) : (
                    <Flex
                        align="center"
                        justify="space-between"
                        borderRadius={2}
                        bg='white'
                        p={4}
                        px={8}
                    >
                        <Text fontWeight={600} color='gray.800' mr={5}>
                            Log in or sign up to create a post
                        </Text>
                        <AuthButtons />
                    </Flex>
                )}
            </>
            <>
                {communityStateValue.currentCommunity && (
                    <About communityData={communityStateValue.currentCommunity} />
                )}
            </>
        </PageContent>
    );
};

export default SubmitPostPage;