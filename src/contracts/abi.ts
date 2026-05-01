export const NFT_CONTRACT_ABI = [
  "function mint(uint256 quantity) external payable",
  "function totalSupply() external view returns (uint256)",
  "function maxSupply() external view returns (uint256)",
  "function balanceOf(address owner) external view returns (uint256)",
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
];
