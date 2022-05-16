import React, { useContext } from 'react'
import { CgMenuGridO } from 'react-icons/cg'
import logo from '../assets/amazon_logo_full.png'
import Image from 'next/image'
import { IoMdSearch } from 'react-icons/io'
import { ZamozaContext } from '../context/ZamozaContext'
import { FaCoins } from 'react-icons/fa'
import {
  ModalProvider,
  Modal,
  useModal,
  ModalTransition,
} from 'react-simple-hook-modal'
import 'react-simple-hook-modal/dist/styles.css'
// import BuyModal from './BuyModal'

const Header = () => {
    const {openModal,isModalOpen,closeModal} = useModal()
    const balance = "99"

    const styles = {
        container: `h-[60px] w-full flex items-center gap-5 px-16`,
        logo: `flex items-center ml-[20px] cursor-pointer flex-1`,
        search: `p-[25px] mr-[30px] w-[400px] h-[40px] bg-white rounded-full shadow-lg flex flex items-center border border-black`,
        searchInput: `bg-transparent focus:outline-none border-none flex-1 items-center flex`,
        menu: `flex items-center gap-6`,
        menuItem: `flex items-center text-md font-bold cursor-pointer`,
        coins: `ml-[10px]`,
    }
    return (
    <div className={styles.container}>
        <div className={styles.logo}>
            <Image 
            src={logo}
            alt='zamoza'
            height={100}
            width={100}
            className='object-cover'
            />
        </div>
        <div className={styles.search}>
            <input type="text" 
            placeholder='Search Your Assets....'
            className={styles.searchInput}
            />
            <IoMdSearch fontSize={20} />
        </div>
        <div className={styles.menu}>
            <div className={styles.menuItem}>New Release</div>
            <div className={styles.menuItem}>Featured</div>
            {balance ? (
                <div className={styles.balance, styles.menuItem}
                onClick={openModal}
                >
                {balance}
                <FaCoins className={styles.coins} />
                <Modal isOpen={isModalOpen} transition={ModalTransition.SCALE}>
                    {/* <BuyModal close={closeModal} buyTokens={buyTokens} /> */}
                </Modal>
                </div>
            ) : (
                <div className={styles.balance, styles.menuItem} onClick={openModal}>
                    0 ZC <FaCoins className={styles.coins} />
                    <Modal isOpen={isModalOpen} transition={ModalTransition.SCALE}>
                        {/* <BuyModal close={closeModal} buyTokens={buyTokens} /> */}
                    </Modal>
                </div>
            )}
            <CgMenuGridO fontSize={30} className={styles.menuItem} />
        </div>
    </div>
  )
}

export default Header