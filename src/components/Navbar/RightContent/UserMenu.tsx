import { signOut, User } from 'firebase/auth';
import { useSetRecoilState } from 'recoil';
import { Menu, MenuButton, MenuList, MenuItem, Icon, Flex, MenuDivider, Text } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FaRedditSquare } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { IoSparkles } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";
import { auth } from '../../../firebase/clientApp';
import { authModalState } from '../../../atoms/authModalAtom';

interface UserMenuProps {
    user?: User | null
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {

    const setAuthModalState = useSetRecoilState(authModalState)

    const logout = async () => {
        await signOut(auth)
    }

    return (
        <Menu>
            <MenuButton
                cursor='pointer'
                padding='0px 6px'
                borderRadius={4}
                _hover={{ outline: '1px solid', outlineColor: 'gray.200' }}
            >
                <Flex align='center'>
                    <Flex align='center'>
                        {user ? (
                            <>
                                <Icon as={FaRedditSquare} fontSize={24} mr={2} color='gray.300' />
                                <Flex
                                    display={{ base: "none", lg: "flex" }}
                                    flexDirection="column"
                                    fontSize="8pt"
                                    align="flex-start"
                                    mr={8}
                                >
                                    <Text fontSize='10pt' fontWeight={700} color='gray.800'>
                                        {user?.displayName || user?.email?.split("@")[0]}
                                    </Text>
                                </Flex>
                            </>

                        ) : (
                            <Icon as={VscAccount} fontSize={24} color='gray.400' />
                        )}
                    </Flex>
                    <ChevronDownIcon color='gray.500' fontWeight={20} />
                </Flex>
            </MenuButton>
            <MenuList bg='white'>
                {user ? (
                    <>
                        <MenuItem
                            color='gray.800'
                            fontSize='10pt'
                            fontWeight={700}
                            _hover={{ bg: 'gray.100' }}
                        >
                            <Flex align='center'>
                                <Icon as={CgProfile} fontSize={20} mr={2} />
                                Profile
                            </Flex>
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem
                            color='gray.800'
                            fontSize='10pt'
                            fontWeight={700}
                            _hover={{ bg: 'gray.100' }}
                            onClick={logout}
                        >
                            <Flex align='center'>
                                <Icon as={MdOutlineLogin} fontSize={20} mr={2} />
                                Log Out
                            </Flex>
                        </MenuItem>
                    </>
                ) : (
                    <MenuItem
                        fontSize='10pt'
                        fontWeight={700} 
                        color='gray.800'
                        _hover={{ bg: 'gray.100' }}
                        onClick={() => setAuthModalState({ open: true, view: 'login' })}
                    >
                        <Flex align='center'>
                            <Icon as={MdOutlineLogin} fontSize={20} mr={2} />
                            Log In / Sign Up
                        </Flex>
                    </MenuItem>
                )}
            </MenuList>
        </Menu>
    );
};

export default UserMenu;