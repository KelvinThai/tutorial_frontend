import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import InvestView from '../src/views/invests'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <InvestView />
  )
}

export default Home
