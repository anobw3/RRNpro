import { useState, useEffect, useCallback } from 'react';
import { CONTRACT_ADDRESS } from '../constants';

export interface AlchemyNFT {
  contract: {
    address: string;
    name?: string;
    symbol?: string;
  };
  tokenId: string;
  name?: string;
  description?: string;
  image: {
    cachedUrl?: string;
    thumbnailUrl?: string;
    originalUrl?: string;
  };
  collection?: {
    name?: string;
    slug?: string;
  };
}

interface UseUserNFTsReturn {
  nfts: AlchemyNFT[];
  loading: boolean;
  error: string | null;
  retry: () => void;
}

const ALCHEMY_API_KEY = import.meta.env.VITE_ALCHEMY_API_KEY || "demo"; // Fallback to demo if not set
const BASE_URL = `https://eth-mainnet.g.alchemy.com/nft/v3/${ALCHEMY_API_KEY}/getNFTsForOwner`;

export const useUserNFTs = (address: string | null | undefined, contractAddress: string = CONTRACT_ADDRESS): UseUserNFTsReturn => {
  const [nfts, setNfts] = useState<AlchemyNFT[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNFTs = useCallback(async () => {
    if (!address) {
      setNfts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = new URL(BASE_URL);
      url.searchParams.append("owner", address);
      url.searchParams.append("withMetadata", "true");
      url.searchParams.append("pageSize", "100");
      
      if (contractAddress && contractAddress !== "0x5678...4321") {
        url.searchParams.append("contractAddresses[]", contractAddress);
      }

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: { accept: 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch NFTs: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Transform Alchemy response to our interface
      const ownedNfts = data.ownedNfts.map((nft: any) => ({
        contract: {
          address: nft.contract.address,
          name: nft.contract.name,
          symbol: nft.contract.symbol,
        },
        tokenId: nft.tokenId,
        name: nft.name || nft.contract.name || "Unnamed NFT",
        description: nft.description,
        image: {
          cachedUrl: nft.image?.cachedUrl,
          thumbnailUrl: nft.image?.thumbnailUrl,
          originalUrl: nft.image?.originalUrl,
        },
        collection: {
          name: nft.collection?.name || nft.contract.name,
          slug: nft.collection?.slug,
        }
      }));

      setNfts(ownedNfts);
    } catch (err: any) {
      console.error("Alchemy API Error:", err);
      setError(err.message || "An error occurred while fetching your NFTs.");
    } finally {
      setLoading(false);
    }
  }, [address, contractAddress]);

  useEffect(() => {
    fetchNFTs();
  }, [fetchNFTs]);

  return { nfts, loading, error, retry: fetchNFTs };
};
