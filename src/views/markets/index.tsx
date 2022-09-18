import { SuccessModal } from '@/components';
import ProcessingModal from '@/components/ProcessingModal';
import MarketContract from '@/contracts/MarketContract';
import NftContract from '@/contracts/NftContract';
import { useAppSelector } from '@/reduxs/hooks';
import { ActionType, INftItem } from '@/_types_';
import { Flex, Tabs, TabList, Tab, TabPanels, TabPanel, SimpleGrid, useBoolean, useDisclosure } from '@chakra-ui/react';
import React from 'react'
import Nft from './components/Nft';
import ListModal from './components/ListModal'

export default function MarketView() {
  const { web3Provider, wallet } = useAppSelector((state) => state.account);
  const [nfts, setNfts] = React.useState<INftItem[]>([]);
  const [nftsListed, setNftsListed] = React.useState<INftItem[]>([]);
  const [nft, setNft] = React.useState<INftItem>();
  const [action, setAction] = React.useState<ActionType>();

  const [isListing, setIsListing] = useBoolean();
  const [isOpen, setIsOpen] = useBoolean();
  const [txHash, setTxHash] = React.useState<string>();
  const [isUnlist, setIsUnList] = useBoolean();

  const {
    isOpen: isSuccess,
    onClose: onCloseSuccess,
    onOpen: onOpenSuccess,
  } = useDisclosure();


  const getListNft = React.useCallback(async () => {
    if (!web3Provider || !wallet) return;
    const nftContract = new NftContract(web3Provider);
    const nfts = await nftContract.getListNFT(wallet.address);
    setNfts(nfts.filter((p) => p.name));
    const marketContract = new MarketContract(web3Provider);
    const ids = await marketContract.getNFTListedOnMarketplace();
    const listedNfts = await nftContract.getNftInfo(ids);
    setNftsListed(listedNfts);
  }, [web3Provider, wallet]);

  React.useEffect(() => {
    getListNft();
  }, [getListNft]);

  const selectAction = async (ac: ActionType, item: INftItem) => {
    if ((ac !== "LIST" && ac !== "UNLIST") || !web3Provider) return;
    setNft(item);
    setAction(ac);
    setIsListing.off();
    switch (ac) {
      case "LIST": {
        setIsOpen.on();
        break;
      }
      case "UNLIST": {
        setIsUnList.on();
        const marketContract = new MarketContract(web3Provider);
        const tx = await marketContract.unListNft(item.id);
        setTxHash(tx);       
        setAction(undefined);
        setNft(undefined);
        setIsUnList.off();
        onOpenSuccess();
        await getListNft();
        break;
      }
      default:
        break;
    }
  };

  const handleListNft = async (price: number) => {
    if (!price || !web3Provider || !wallet || !nft) return;
    setIsListing.on();
    try {
      const nftContract = new NftContract(web3Provider);
      const marketContract = new MarketContract(web3Provider);
      await nftContract.approve(marketContract._contractAddress, nft.id);
      const tx = await marketContract.listNft(nft.id, price);
      setTxHash(tx);
      onOpenSuccess();
      setAction(undefined);
      setNft(undefined);
      setIsOpen.off();
      await getListNft();
    } catch (er: any) {
      console.log(er);
    }
  };



  return (   
    <Flex w="full">
    <Tabs>
      <TabList borderBottomColor="#5A5A5A" borderBottomRadius={2} mx="15px">
        <Tab
          textTransform="uppercase"
          color="#5A5A5A"
          _selected={{ borderBottomColor: "white", color: "white" }}
        >
          ALL ITEMS
        </Tab>
        <Tab
          textTransform="uppercase"
          color="#5A5A5A"
          _selected={{ borderBottomColor: "white", color: "white" }}
        >
          active listings
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <SimpleGrid w="full" columns={4} spacing={10}>
            {nfts.map((nft, index) => (
              <Nft
                item={nft}
                key={index}
                index={index}
                isAuction
                isList
                isTransfer
                onAction={(a) => selectAction(a, nft)}
              />
            ))}
          </SimpleGrid>
        </TabPanel>

        <TabPanel>
          <SimpleGrid w="full" columns={4} spacing={10}>
            {nftsListed.map((nft, index) => (
              <Nft
                item={nft}
                key={index}
                index={index}
                isUnList
               onAction={(a) => selectAction(a, nft)}               
              />
            ))}
          </SimpleGrid>
        </TabPanel>
      </TabPanels>
    </Tabs>

    <ProcessingModal isOpen={isUnlist} onClose={() => {}} />
    <ListModal
      isOpen={isOpen}
      nft={nft}
      isListing={isListing}
      onClose={() => setIsOpen.off()}
      onList={(amount) => handleListNft(amount)}
    />
    <SuccessModal
      hash={txHash}
      title="LIST - UNLIST NFT"
      isOpen={isSuccess}
      onClose={onCloseSuccess}
    />
  </Flex>
  )
}
