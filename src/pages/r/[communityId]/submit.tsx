import { useAuthState } from 'react-firebase-hooks/auth';
import { Box, Text } from '@chakra-ui/react';
import About from '../../../components/Community/About';
import PageContent from '../../../components/Layout/PageContent';
import NewPostForm from '../../../components/Posts/PostForm/NewPostForm';
import { auth } from '../../../firebase/clientApp';
import useCommunityData from '../../../hooks/useCommunityData';

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
                {user && <NewPostForm user={user} communityImageURL={communityStateValue.currentCommunity?.imageURL} />}
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