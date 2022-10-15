import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';
import { Text, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { authModalState } from '../../../atoms/authModalAtom';
import { auth } from '../../../firebase/clientApp';
import AuthInputs from './AuthInputs';
import OAuthButtons from './OAuthButtons';
import ResetPassword from './ResetPassword';

const AuthModal: React.FC = () => {

    const [modalState, setModalState] = useRecoilState(authModalState)

    const [user] = useAuthState(auth)

    const handleClose = () => {
        setModalState(prev => ({
            ...prev,
            open: false
        }))
    }

    useEffect(() => {
        if (user) handleClose()
    }, [user])

    return (
        <>
            <Modal isOpen={modalState.open} onClose={handleClose} size={{ base: 'sm', md: 'md' }}>
                <ModalOverlay />
                <ModalContent bg='white' color='gray.800'>
                    <ModalHeader textAlign='center'>
                        {modalState.view === 'login' && 'Login'}
                        {modalState.view === 'signup' && 'Sign Up'}
                        {modalState.view === 'resetPassword' && 'Reset Password'}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display='flex' flexDirection='column' alignItems='center' justifyContent='center' pb={6}>
                        <Flex direction='column' justify='center' align='center' width='70%'>
                            {(modalState.view === 'login' || modalState.view === 'signup') ? (
                                <>
                                    <OAuthButtons />
                                    <Text color='gray.500' fontWeight={700}>
                                        OR
                                    </Text>
                                    <AuthInputs />
                                </>
                            ) : (
                                <ResetPassword />
                            )}
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>

        </>
    );
};

export default AuthModal;