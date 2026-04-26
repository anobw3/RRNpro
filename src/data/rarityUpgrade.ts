import { NFTMetadata, RarityType } from "../types";

export const DIVINE_TRIBES = ["Aceh", "Nias", "Baduy Dalam", "Bali Aga", "Dani"];
export const MYTHIC_TRIBES = ["Mentawai", "Sumba", "Toraja", "Asmat"];

export function getFinalRarity(nft: NFTMetadata): RarityType {
  if (DIVINE_TRIBES.includes(nft.tribe)) {
    return "Divine";
  }
  if (MYTHIC_TRIBES.includes(nft.tribe)) {
    return "Mythic";
  }
  return nft.rarity;
}
