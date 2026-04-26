import { nftDatabase } from "./data/nftDatabase";
import { getFinalRarity } from "./data/rarityUpgrade";

export interface NFTItem {
  id: string;
  name: string;
  region: string;
  outfit: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary" | "Mythic" | "Divine";
  image: string;
  lore: string;
  ability: string;
  rarityReason: string;
  price: string;
  supply: string;
  culturalMeaning: string;
  spirit: string;
  element: "Earth" | "Water" | "Fire" | "Air" | "Void" | "Light";
  island: "Sumatra" | "Java" | "Kalimantan" | "Sulawesi" | "Papua" | "Nusa Tenggara" | "Maluku";
  openseaUrl: string;
}

export const OPENSEA_BASE_URL = "https://opensea.io/assets/ethereum";
export const CONTRACT_ADDRESS = "0x5678...4321"; // Placeholder contract
export const COLLECTION_SLUG = "nusantara-eterna-genesis";

export const getOpenSeaUrl = (id: string) => `${OPENSEA_BASE_URL}/${CONTRACT_ADDRESS}/${id}`;
export const getCollectionUrl = () => `https://opensea.io/collection/${COLLECTION_SLUG}`;

// Mapping new metadata to old NFTItem for compatibility
export const NFT_COLLECTION: NFTItem[] = Object.values(nftDatabase).flat().map(nft => {
  const finalRarity = getFinalRarity(nft);
  return {
    id: nft.id.toString(),
    name: nft.name.split('—')[0].trim(),
    region: nft.tribe,
    outfit: nft.outfit,
    rarity: finalRarity as any,
    image: nft.image,
    lore: nft.description,
    ability: "Traditional Strength: High cultural resonance.",
    rarityReason: `Exquisite ${finalRarity} heritage piece.`,
    price: finalRarity === "Divine" ? "25.0" : finalRarity === "Mythic" ? "12.5" : finalRarity === "Legendary" ? "8.5" : finalRarity === "Epic" ? "4.2" : finalRarity === "Rare" ? "1.8" : "0.5",
    supply: "50/50",
    culturalMeaning: nft.cultural_meta,
    spirit: nft.tribe + " Guardian",
    element: "Earth",
    island: nft.island as any,
    openseaUrl: getOpenSeaUrl(nft.id.toString())
  };
});


export const RARITIES = [
  { name: "Common", color: "text-gray-400", glow: "shadow-gray-900/20", aura: "from-gray-500/10 to-transparent", desc: "The balanced guardians of the realm." },
  { name: "Rare", color: "text-blue-400", glow: "shadow-blue-500/20", aura: "from-blue-500/20 to-transparent", desc: "Awakened spirits with ancient wisdom." },
  { name: "Epic", color: "text-purple-400", glow: "shadow-purple-500/20", aura: "from-purple-500/20 to-transparent", desc: "Masters of the hidden elements." },
  { name: "Legendary", color: "text-yellow-400", glow: "shadow-yellow-500/30", aura: "from-yellow-400/20 to-transparent", desc: "Mythical kings of a forgotten era." },
  { name: "Mythic", color: "text-red-500", glow: "shadow-red-500/30", aura: "from-red-500/20 to-transparent", desc: "Transcendent beings beyond time." },
  { name: "Divine", color: "text-white", glow: "shadow-white/40", aura: "from-white/20 to-transparent", desc: "The supreme architects of Nusantara." }
];

export const ROADMAP = [
  { phase: "01", title: "The Awakening", date: "Q2 2026", items: ["Launch 10 Origin NFTs", "Website V1 release", "Community building"] },
  { phase: "02", title: "Cultural Expansion", date: "Q3 2026", items: ["Expand to 100 Unique NFTs", "Lore storytelling V1", "Staking launch"] },
  { phase: "03", title: "Nusantara Lore", date: "Q4 2026", items: ["Story expansions", "Exclusive member events", "Airdrop for holders"] },
  { phase: "04", title: "The Metaverse", date: "2027", items: ["Metaverse integration", "Royal Beast 3D avatars", "The Kingdom RPG"] }
];
