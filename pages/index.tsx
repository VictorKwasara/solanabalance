import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import AddressForm from '../components/AddressForm'
import * as web3 from '@solana/web3.js'

const Home: NextPage = () => {
  const [balance, setBalance] = useState(0)
  const [address, setAddress] = useState('')
  const [executable, setExecutable] = useState('')

  const addressSubmittedHandler = (address: string) => {
    try {
        const key = new web3.PublicKey(address);
        setAddress(key.toBase58())    
        const connection = new web3.Connection(web3.clusterApiUrl('devnet'))
        connection.getAccountInfo(key).then((info)=> {
          if (info?.executable){
            setExecutable('True') ;
          }else {
            setExecutable('False')
          }
        })
        console.log()
        connection.getBalance(key).then(balance => {
          setBalance(balance / web3.LAMPORTS_PER_SOL)
        })    
    }catch(error){
      setAddress('')
      setBalance(0)
      alert(error)
    }
    
  }

  return (
		<div className={styles.App}>
			<header className={styles.AppHeader}>
				<p className={styles.Topic}>
					Check the balance of any account on solana
				</p>
				<AddressForm handler={addressSubmittedHandler} />

       {executable && <div className={styles.ResultBox}>
        <p className={styles.Result}>{`Address: ${address}`}</p>
				<p className={styles.Result}>{`Balance: ${balance} SOL`}</p>
				<p className={styles.Result}>{`Executable: ${executable}`}</p>
        </div>}

			</header>
		</div>
	);
}

export default Home
