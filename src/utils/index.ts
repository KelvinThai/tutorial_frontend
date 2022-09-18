export const numberFormat = (number: number | string) => new Intl.NumberFormat().format(Number(number));

export const showSortAddress = (address?: string): string => {
  return `${address?.substring(0, 4)}...${address?.substring(
      address.length - 4,
      address.length - 1
  )}`
}

export const showTransactionHash = (tranHash: string) => {
  return  `${tranHash?.substring(0, 10)}${"".padStart(5, '*')}${tranHash?.substring(tranHash.length -10, tranHash.length)}`    
}