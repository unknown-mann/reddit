import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Flex, Icon, Spinner, Stack, Text } from '@chakra-ui/react';
import { FaReddit } from 'react-icons/fa';
import { Community } from '../../atoms/communitiesAtom';
import { Post } from '../../atoms/postsAtom';
import { auth, firestore } from '../../firebase/clientApp';
import usePosts from '../../hooks/usePosts';
import PostItem from './PostItem';

interface PostsProps {
    communityData: Community
}

const Posts: React.FC<PostsProps> = ({ communityData }) => {

    const [user] = useAuthState(auth)

    const [loading, setLoading] = useState(false)

    const { postStateValue, setPostStateValue, onVote, onDeletePost, onSelectPost } = usePosts()

    const getPosts = async () => {
        setLoading(true)
        try {
            const postsQuery = query(
                collection(firestore, 'posts'),
                where('communityId', '==', communityData.id),
                orderBy('createdAt', 'desc')
            )
            const postDocs = await getDocs(postsQuery)

            const posts = postDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setPostStateValue(prev => ({ ...prev, posts: posts as Post[] }))

        } catch (error: any) {
            console.log(error.message);
        }
        setLoading(false)
    }

    useEffect(() => {
        getPosts()
    }, [communityData])

    return (
        <>
            {loading ? (
                <Flex justify='center' align='center' height='50%'>
                    <Spinner size='xl' color='gray.500' />
                </Flex>
            ) : (
                <Stack>
                    {postStateValue.posts.length ? (
                        <>
                            {postStateValue.posts.map(item => (
                                <PostItem
                                    key={item.id}
                                    post={item}
                                    userIsCreator={user?.uid === item.creatorId}
                                    userVoteValue={postStateValue.postVotes.find(vote => vote.postId === item.id)?.voteValue}
                                    onVote={onVote}
                                    onDeletePost={onDeletePost}
                                    onSelectPost={onSelectPost}
                                />
                            ))}
                        </>
                    ) : (
                        <Flex direction='column' justify='flex-end' align='center' height='210px'>
                            <Icon as={FaReddit} fontSize={130} color='gray.400' />
                            <Text color='gray.400' fontSize={20}>
                                No posts yet
                            </Text>
                        </Flex>
                    )}
                </Stack>
            )}
        </>
    );
};

export default Posts;