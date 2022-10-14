import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Post } from '../../../../atoms/postsAtom';
import About from '../../../../components/Community/About';
import PageContent from '../../../../components/Layout/PageContent';
import Comments from '../../../../components/Posts/Comments/Comments';
import PostItem from '../../../../components/Posts/PostItem';
import { auth, firestore } from '../../../../firebase/clientApp';
import useCommunityData from '../../../../hooks/useCommunityData';
import usePosts from '../../../../hooks/usePosts';

const PostPage = () => {

    const router = useRouter()

    const [user] = useAuthState(auth)

    const { postStateValue, setPostStateValue, onDeletePost, onVote } = usePosts()

    const { communityStateValue } = useCommunityData()

    const fetchPost = async (postId: string) => {

        try {

            const postDocRef = doc(firestore, 'posts', postId)
            const postDoc = await getDoc(postDocRef)
            setPostStateValue(prev => ({
                ...prev,
                selectedPost: { id: postDoc.id, ...postDoc.data() } as Post
            }))

        } catch (error: any) {
            console.log(error.message);

        }
    }

    useEffect(() => {

        const { pid } = router.query

        if (pid && !postStateValue.selectedPost) {
            fetchPost(pid as string)
        }
    }, [router.query, postStateValue.selectedPost])

    return (
        <PageContent>
            <>
                {postStateValue.selectedPost && (
                    <PostItem
                        post={postStateValue.selectedPost}
                        onVote={onVote}
                        onDeletePost={onDeletePost}
                        userVoteValue={postStateValue.postVotes.find(item => item.postId === postStateValue.selectedPost?.id)?.voteValue}
                        userIsCreator={user?.uid === postStateValue.selectedPost?.creatorId}
                    />
                )}
                <Comments user={user as User} selectedPost={postStateValue.selectedPost} communityId={postStateValue.selectedPost?.communityId as string} />
            </>
            <>
                {communityStateValue.currentCommunity && <About communityData={communityStateValue.currentCommunity} />}
            </>
        </PageContent>
    );
};

export default PostPage;