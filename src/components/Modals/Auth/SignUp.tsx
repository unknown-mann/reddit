import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Input, Button, Flex, Text } from '@chakra-ui/react';
import { authModalState } from '../../../atoms/authModalAtom';
import { auth } from '../../../firebase/clientApp';
import { FIREBASE_ERRORS } from '../../../firebase/errors';

const SignUp: React.FC = () => {

    const setAuthModalState = useSetRecoilState(authModalState)

    const [signUpForm, setSignUpForm] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [error, setError] = useState('')

    const [createUserWithEmailAndPassword, _, loading, userError] = useCreateUserWithEmailAndPassword(auth)

    const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpForm(prev => ({
            ...prev,
            [evt.target.name]: evt.target.value
        }))
    }

    const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        if (error) setError('')
        evt.preventDefault()
        if (signUpForm.password !== signUpForm.confirmPassword) {
            setError('Passwords do not match')
            return
        }

        createUserWithEmailAndPassword(signUpForm.email, signUpForm.password)
    }

    return (
        <form onSubmit={onSubmit}>
            <Input
                required
                name='email'
                placeholder='Email'
                type='email'
                onChange={onChange}
                mb={2}
                fontSize='10pt'
                color='gray.500'
                _placeholder={{ color: 'gray.500' }}
                _hover={{ bg: 'white', border: '1px solid', borderColor: 'blue.500' }}
                _focus={{ outline: 'none', bg: 'white', border: '1px solid', borderColor: 'blue.500' }}
                bg='gray.50'
            />
            <Input
                required
                name='password'
                placeholder='Password'
                type='password'
                onChange={onChange}
                mb={2}
                fontSize='10pt'
                color='gray.500'
                _placeholder={{ color: 'gray.500' }}
                _hover={{ bg: 'white', border: '1px solid', borderColor: 'blue.500' }}
                _focus={{ outline: 'none', bg: 'white', border: '1px solid', borderColor: 'blue.500' }}
                bg='gray.50'
            />
            <Input
                required
                name='confirmPassword'
                placeholder='Confirm Password'
                type='password'
                onChange={onChange}
                mb={2}
                fontSize='10pt'
                color='gray.500'
                _placeholder={{ color: 'gray.500' }}
                _hover={{ bg: 'white', border: '1px solid', borderColor: 'blue.500' }}
                _focus={{ outline: 'none', bg: 'white', border: '1px solid', borderColor: 'blue.500' }}
                bg='gray.50'
            />
            <Text textAlign='center' color='red' fontSize='10pt'>
                {error || FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
            </Text>
            <Button
                type='submit'
                isLoading={loading}
                width='100%'
                height='36px'
                my={2}
            >
                Sign Up
            </Button>
            <Flex justifyContent='center' fontSize='10pt'>
                <Text mr={1}>
                    Already a redditor?
                </Text>
                <Text
                    color='blue.500'
                    cursor='pointer'
                    fontWeight={700}
                    _hover={{ opacity: 0.8 }}
                    _active={{ opacity: 1 }}
                    onClick={() => setAuthModalState(prev => ({ ...prev, view: 'login' }))}
                >
                    LOG IN
                </Text>
            </Flex>
        </form>
    );
};

export default SignUp;