export type RarityType = "Divine" | "Mythic" | "Legendary" | "Epic" | "Rare" | "Common";

export interface NFTAttribute {
  trait_type: string;
  value: string;
}

export interface NFTMetadata {
  id: number;
  name: string;
  tribe: string;
  outfit: string;
  island: string;
  rarity: RarityType;
  description: string;
  cultural_meta: string;
  image: string;
  attributes: NFTAttribute[];
}

export interface RarityStyle {
  color: string;
  glow: string;
  gradient: string;
  border: string;
  badge: string;
}
