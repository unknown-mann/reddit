import { useEffect, useState } from 'react';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilValue } from 'recoil';
import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Box, Avatar, Flex, Text, Center, Stack } from '@chakra-ui/react';
import moment from 'moment';
import { communityState } from '../../../atoms/communitiesAtom';
import { auth, firestore } from '../../../firebase/clientApp';
import { Comment } from '../../Posts/Comments/CommentItem';

interface ProfileMenuProps {
    isOpen: boolean
    onClose: () => void
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ isOpen, onClose }) => {

    const [user] = useAuthState(auth)

    const communityStateValue = useRecoilValue(communityState)

    const { mySnippets } = communityStateValue

    const [userComments, setUserComments] = useState<Comment[]>([])

    const getUserComments = async () => {

        try {
            const commentsQuery = query(
                collection(firestore, 'comments'),
                where('creatorId', '==', user?.uid)
            )
            const commentDocs = await getDocs(commentsQuery)
            const comments = commentDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setUserComments(comments as Comment[])
        } catch (error: any) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        if (!user) return
        getUserComments()
    }, [user])

    return (
        <Drawer onClose={onClose} isOpen={isOpen} size='full'>
            <DrawerOverlay />
            <DrawerContent backdropFilter='blur(8px)' bgColor='blackAlpha.400' p={{ base: '20px', md: '100px 300px' }}>
                <DrawerCloseButton />
                <DrawerHeader fontSize='3xl'>
                    Profile
                </DrawerHeader>
                <DrawerBody>
                    <Stack spacing={3}>
                        <Flex align='center' gap='10px' marginBottom={5}>
                            <Avatar name={`${user?.displayName || user?.email?.split("@")[0]}`} src={`${user?.photoURL}`} />
                            <Box>
                                <Text fontWeight={700}>
                                    {user?.displayName || user?.email?.split("@")[0]}
                                </Text>
                                <Text>{user?.email}</Text>
                            </Box>
                        </Flex>
                        <Flex>
                            <Box marginRight={20}>
                                <Text
                                    display='inline-block'
                                    fontSize='xl'
                                    fontWeight={600}
                                    borderBottom='1px solid white'
                                    marginBottom={3}
                                >
                                    My comments
                                </Text>
                                {userComments.length ? (
                                    <>
                                        {userComments.map(comment => (
                                            <Box key={comment.id} marginBottom={5}>
                                                <Text fontWeight={600}>
                                                    {comment.postTitle}
                                                </Text>
                                                <Text fontSize='sm'>
                                                    {comment.text}
                                                </Text>
                                                <Text fontSize='2xs'>
                                                    {moment(new Date(comment.createdAt.seconds * 1000)).fromNow()}
                                                </Text>
                                            </Box>
                                        ))}
                                    </>
                                ) : (
                                    <Text>No comments</Text>
                                )}
                            </Box>
                            <Box>
                                <Text
                                    display='inline-block'
                                    fontSize='xl'
                                    fontWeight={600}
                                    borderBottom='1px solid white'
                                    marginBottom={3}
                                >
                                    My communities
                                </Text>
                                <Box>
                                    {mySnippets.length ? (
                                        <>
                                            {mySnippets.map(snippet => (
                                                <Text
                                                    key={snippet.communityId}
                                                    display='inline'
                                                    marginRight='10px'
                                                    paddingRight='10px'
                                                    _notLast={{ borderRight: '1px solid white' }}
                                                >
                                                    {snippet.communityId}
                                                </Text>
                                            ))}
                                        </>
                                    ) : (
                                        <Text>No communities</Text>
                                    )}
                                </Box>
                            </Box>
                        </Flex>
                    </Stack>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default ProfileMenu;