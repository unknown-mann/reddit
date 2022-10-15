import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Flex, Icon, Spinner, Stack, Text } from '@chakra-ui/react'
import { Post, PostVote } from '../atoms/postsAtom'
import CreatePostLink from '../components/Community/CreatePostLink'
import PersonalHome from '../components/Community/PersonalHome'
import Recommendations from '../components/Community/Recommendations'
import PageContent from '../components/Layout/PageContent'
import PostItem from '../components/Posts/PostItem'
import { auth, firestore } from '../firebase/clientApp'
import useCommunityData from '../hooks/useCommunityData'
import usePosts from '../hooks/usePosts'
import { useRouter } from 'next/router'
import { defaultMenuItem } from '../atoms/directoryMenuAtom'
import useDirectory from '../hooks/useDirectory'
import { FaReddit } from 'react-icons/fa'

const Home: NextPage = () => {

  const router = useRouter()

  const [user, loadingUser] = useAuthState(auth)
  const [loading, setLoading] = useState(false)
  const { postStateValue, setPostStateValue, onSelectPost, onDeletePost, onVote } = usePosts()
  const { communityStateValue } = useCommunityData()
  const { onSelectMenuItem } = useDirectory()

  const buildUserHomeFeed = async () => {
    setLoading(true)
    //get posts from users' communities
    try {

      if (communityStateValue.mySnippets.length) {

        const myCommunityIds = communityStateValue.mySnippets.map(snippet => snippet.communityId)

        const postQuery = query(
          collection(firestore, 'posts'),
          where('communityId', 'in', myCommunityIds),
          limit(10)
        )

        const postDocs = await getDocs(postQuery)
        const posts = postDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }))

        setPostStateValue(prev => ({
          ...prev,
          posts: posts as Post[]
        }))

      } else {
        buildNoUserHomeFeed()
      }

    } catch (error: any) {
      console.log(error.message);
    }
    setLoading(false)
  }

  const buildNoUserHomeFeed = async () => {

    setLoading(true)
    try {

      const postQuery = query(
        collection(firestore, 'posts'),
        orderBy('voteStatus', 'desc'),
        limit(10)
      )

      const postDocs = await getDocs(postQuery)
      const posts = postDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setPostStateValue(prev => ({
        ...prev,
        posts: posts as Post[]
      }))

    } catch (error: any) {
      console.log(error.message);
    }
    setLoading(false)
  }

  const getUserPostVotes = async () => {

    try {
      const postIds = postStateValue.posts.map(post => post.id)

      const postVotesQuery = query(
        collection(firestore, `users/${user?.uid}/postVotes`),
        where('postId', 'in', postIds)
      )

      const postVoteDocs = await getDocs(postVotesQuery)
      const postVotes = postVoteDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setPostStateValue(prev => ({
        ...prev,
        postVotes: postVotes as PostVote[]
      }))

    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (communityStateValue.snippetsFetched) {
      buildUserHomeFeed()
    }
  }, [communityStateValue.snippetsFetched])

  useEffect(() => {
    if (!user && !loadingUser) {
      buildNoUserHomeFeed()
    }
  }, [user, loadingUser])

  useEffect(() => {
    if (user && postStateValue.posts.length) {
      getUserPostVotes()
    }
    return () => {
      setPostStateValue(prev => ({
        ...prev,
        postVotes: []
      }))
    }
  }, [user, postStateValue.posts])

  useEffect(() => {
    const { communityId } = router.query
    if (!communityId) {
      onSelectMenuItem(defaultMenuItem)
      return
    }
  }, [])

  const posts = postStateValue.posts.map(post => post)

  return (
    <PageContent>
      <>
        <CreatePostLink />
        {loading ? (
          <Flex justify='center' align='center' height='30%'>
            <Spinner size='xl' color='gray.500' />
          </Flex>
        ) : (
          <Stack>
            {!posts.length ? (
              <Flex direction='column' justify='flex-end' align='center' height='210px'>
                <Icon as={FaReddit} fontSize={100} color='gray.400' />
                <Text color='gray.400' fontSize={20}>
                  No posts yet
                </Text>
              </Flex>
            ) : (
              <>
                {posts.map(post => (
                  <PostItem
                    key={post.id}
                    post={post}
                    onSelectPost={onSelectPost}
                    onDeletePost={onDeletePost}
                    onVote={onVote}
                    userVoteValue={postStateValue.postVotes.find(item => item.postId === post.id)?.voteValue}
                    userIsCreator={user?.uid === post.creatorId}
                    homePage
                  />
                ))}
              </>
            )}
          </Stack>
        )}
      </>
      <Stack spacing={5}>
        <Recommendations />
        <PersonalHome />
      </Stack>
    </PageContent>
  )
}

export default Home
