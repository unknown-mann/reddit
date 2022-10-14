import { useRecoilValue } from 'recoil';
import { Flex } from '@chakra-ui/react';
import { authModalState } from '../../../atoms/authModalAtom';
import Login from './Login';
import SignUp from './SignUp';

const AuthInputs: React.FC = () => {

    const modalState = useRecoilValue(authModalState)

    return (
        <Flex flexDirection='column' align='center' width='100%' mt={4}>
            {modalState.view === 'login' && <Login />}
            {modalState.view === 'signup' && <SignUp />}
        </Flex>
    );
};

export default AuthInputs;