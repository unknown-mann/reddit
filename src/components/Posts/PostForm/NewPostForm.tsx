import { useState } from 'react';
import { useRouter } from 'next/router';
import { addDoc, collection, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { User } from 'firebase/auth';
import { Flex, Icon } from '@chakra-ui/react';
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import TabItem from '../TabItem'
import TextInputs from './TextInputs';
import ImageUpload from './ImageUpload';
import { Post } from '../../../atoms/postsAtom';
import { firestore, storage } from '../../../firebase/clientApp';
import useSelectFile from '../../../hooks/useSelectFile';

const formTabs: TabItem[] = [
    {
        title: "Post",
        icon: IoDocumentText,
    },
    {
        title: "Images & Video",
        icon: IoImageOutline,
    }
];

export type TabItem = {
    title: string;
    icon: typeof Icon.arguments;
};

interface NewPostFormProps {
    user: User
    communityImageURL?: string
}

const NewPostForm: React.FC<NewPostFormProps> = ({ user, communityImageURL }) => {

    const router = useRouter()

    const [selectedTab, setSelectedTab] = useState(formTabs[0].title)
    const [textInputs, setTextInputs] = useState({ title: '', body: '' })
    const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const handleCreatePost = async () => {

        const { communityId } = router.query

        const newPost: Post = {
            communityId: communityId as string,
            communityImageURL: communityImageURL || '',
            creatorId: user?.uid,
            creatorDisplayName: user.email!.split('@')[0],
            title: textInputs.title,
            body: textInputs.body,
            numberOfComments: 0,
            voteStatus: 0,
            createdAt: serverTimestamp() as Timestamp
        }

        setLoading(true)
        try {
            //store the post in db
            const postDocRef = await addDoc(collection(firestore, 'posts'), newPost)

            //check for selected file
            if (selectedFile) {
                //store in storage
                const imageRef = ref(storage, `posts/${postDocRef.id}/image`)
                await uploadString(imageRef, selectedFile, 'data_url')
                const downloadURL = await getDownloadURL(imageRef)

                //update post doc by adding imageURL
                await updateDoc(postDocRef, {
                    imageURL: downloadURL
                })
            }
            router.back()
        } catch (error: any) {
            console.log(error.message);
            setError(true)
        }
        setLoading(false)
    }

    const onTextChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { target: {
            name,
            value
        } } = evt

        setTextInputs(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <Flex direction='column' bg='white' borderRadius={4} mt={2} >
            <Flex width='100%'>
                {formTabs.map(item => (
                    <TabItem key={item.title} item={item} selected={item.title === selectedTab} setSelectedTab={setSelectedTab} />
                ))}
            </Flex>
            <Flex p={4}>
                {selectedTab === 'Post' && (
                    <TextInputs
                        textInputs={textInputs}
                        handleCreatePost={handleCreatePost}
                        onChange={onTextChange}
                        loading={loading}
                    />
                )}
                {selectedTab === 'Images & Video' && (
                    <ImageUpload
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                        onSelectImage={onSelectFile}
                        setSelectedTab={setSelectedTab}
                    />
                )}
            </Flex>
        </Flex>
    );
};

export default NewPostForm;