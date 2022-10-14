import { GetServerSidePropsContext } from "next";
import { doc, getDoc } from "firebase/firestore";
import safeJsonStringify from 'safe-json-stringify'
import { Community, communityState } from "../../../atoms/communitiesAtom";
import { firestore } from "../../../firebase/clientApp";
import NotFound from "../../../components/Community/NotFound";
import Header from "../../../components/Community/Header";
import PageContent from "../../../components/Layout/PageContent";
import CreatePostLink from "../../../components/Community/CreatePostLink";
import Posts from "../../../components/Posts/Posts";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import About from "../../../components/Community/About";

interface CommunityPageProps {
    communityData: Community
}

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {

    const setCommunityState = useSetRecoilState(communityState)

    useEffect(() => {
        setCommunityState(prev => ({
            ...prev,
            currentCommunity: communityData
        }))
    }, [communityData])

    if (!communityData) {
        return <NotFound />
    }

    return (
        <>
            <Header communityData={communityData} />
            <PageContent>
                <>
                    <CreatePostLink />
                    <Posts communityData={communityData} />
                </>
                <>
                    <About communityData={communityData} />
                </>
            </PageContent>
        </>
    );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {

        const communityDocRef = doc(firestore, 'communities', context.query.communityId as string)
        const communityDoc = await getDoc(communityDocRef)

        return {
            props: {
                communityData: communityDoc.exists()
                    ? JSON.parse(safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() }))
                    : ''
            }
        }
    } catch (error) {
        console.log(error);

    }
}

export default CommunityPage;