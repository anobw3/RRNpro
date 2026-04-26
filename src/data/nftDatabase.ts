import { NFTMetadata } from "../types";

const IPFS_BASE = "https://gateway.pinata.cloud/ipfs/bafybeihv5m2qnx77r6z5v5f7u5f7u5f7u5f7u5f7u5f7u5f7u5f7u5f7u5"; // Placeholder base

export const nftDatabase: Record<string, NFTMetadata[]> = {
  SUMATRA: [
    {
      id: 1,
      name: "Sovereign of Aceh — Ulee Balang",
      island: "Sumatra",
      tribe: "Aceh",
      outfit: "Ulee Balang",
      rarity: "Legendary",
      description: "The royal presence of the Northern tip. Traditionally worn by nobility, it radiates authority with deep black and gold accents.",
      cultural_meta: "Sultanate Authority, Peureulak Gold",
      image: "https://gateway.pinata.cloud/ipfs/bafkreih4gyec3lyqr53hrbkw4p3nz4dovmaxvj7azh2rnwncqwchxe6nye",
      attributes: [
        { trait_type: "Character", value: "Raccoon" },
        { trait_type: "Island", value: "Sumatra" },
        { trait_type: "Tribe", value: "Aceh" },
        { trait_type: "Status", value: "Noble" }
      ]
    },
    {
       id: 2,
       name: "Starlight of Gayo — Kerawang Gayo",
       island: "Sumatra",
       tribe: "Gayo",
       outfit: "Kerawang Gayo",
       rarity: "Epic",
       description: "Intricate philosophical motifs embroidered into the soul of mountain life.",
       cultural_meta: "Highland Wisdom, Highland Weave",
       image: "https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafybeidgii35hrfumi5xi2cdi5p3lhlmmzjbsizkpr2vpugy35j35k6m7q",
       attributes: [
         { trait_type: "Character", value: "Raccoon" },
         { trait_type: "Island", value: "Sumatra" },
         { trait_type: "Tribe", value: "Gayo" }
       ]
    },
    {
      id: 5,
      name: "Guardian of Nias — Baru Oholu",
      island: "Sumatra",
      tribe: "Nias",
      outfit: "Baru Oholu",
      rarity: "Legendary",
      description: "The warrior's armor of the stone-jumping knights. Forged for tradition and battle, it is as heavy as history but agile as a hunter.",
      cultural_meta: "Fahombo, Stone Jumping Heritage",
      image: "https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafybeiei2cdmqss5mpo3qpbr7e6viugbvgllw3pum2xzsxfspe4u76lpnu",
      attributes: [
        { trait_type: "Character", value: "Raccoon" },
        { trait_type: "Island", value: "Sumatra" },
        { trait_type: "Tribe", value: "Nias" },
        { trait_type: "Status", value: "Warrior" }
      ]
    },
    {
      id: 7,
      name: "Shaman of Mentawai — Kabit",
      island: "Sumatra",
      tribe: "Mentawai",
      outfit: "Kabit",
      rarity: "Epic",
      description: "A minimalist connection to the natural world. Far more than a garment, it is a canvas for sacred tattoos and an extension of the forest floor.",
      cultural_meta: "Arat Sabulungan, Tattoo Art",
      image: "https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafybeiaa67wzgxsah7idr5ll3ap2svamrmtcdpc4w3qfgyaol3hm3ividu",
      attributes: [
        { trait_type: "Character", value: "Raccoon" },
        { trait_type: "Island", value: "Sumatra" },
        { trait_type: "Tribe", value: "Mentawai" },
        { trait_type: "Status", value: "Shaman" }
      ]
    },
    {
      id: 8,
      name: "Messenger of Riau — Teluk Belanga",
      island: "Sumatra",
      tribe: "Melayu Riau",
      outfit: "Teluk Belanga",
      rarity: "Common",
      description: "Elegant and practical, the standard of the coastal Malay community.",
      cultural_meta: "Maritime Manners, Coastal Silk",
      image: "https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafybeicrnv5qc2f5v2ldve43hrxjsspke6vhf5l7lt5wtggbcn5jl6r7im",
      attributes: [
        { trait_type: "Character", value: "Raccoon" },
        { trait_type: "Island", value: "Sumatra" },
        { trait_type: "Tribe", value: "Melayu" }
      ]
    }
  ],
  JAVA: [
    {
       id: 11,
       name: "Sage of Baduy — Pakaian Putih",
       island: "Java",
       tribe: "Baduy Dalam",
       outfit: "Pakaian Putih",
       rarity: "Legendary",
       description: "The ultimate vow of simplicity. Pure white, woven by hand, it is the armor of a soul that has rejected the chaos of the modern world.",
       cultural_meta: "Pikukuh Baduy, Ancestral Purity",
       image: "https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafybeigffyjshvdcghps7xfg7p45fu3a62ulij7b35bvxgupgdap7ecgeu",
       attributes: [
         { trait_type: "Character", value: "Raccoon" },
         { trait_type: "Island", value: "Java" },
         { trait_type: "Tribe", value: "Baduy" },
         { trait_type: "Status", value: "Sage" }
       ]
    },
    {
      id: 13,
      name: "Urbanite of Betawi — Kebaya Encim",
      island: "Java",
      tribe: "Betawi",
      outfit: "Kebaya Encim",
      rarity: "Rare",
      description: "A vibrant fusion of cultures in the heart of the archipelago's capital.",
      cultural_meta: "Batavia Fusion, Peranakan Style",
      image: "https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafybeighynsme4q6ck2jjk67pmonbuumrt3j6hgemakpea6ugy4y6kapby",
      attributes: [
        { trait_type: "Character", value: "Raccoon" },
        { trait_type: "Island", value: "Java" },
        { trait_type: "Tribe", value: "Betawi" }
      ]
    },
    {
      id: 15,
      name: "Sovereign of Central Java — Jawi Jangkep",
      island: "Java",
      tribe: "Jawa Tengah",
      outfit: "Jawi Jangkep",
      rarity: "Legendary",
      description: "The formal standard of the courts. Every fold of the cloth and placement of the Kris is a lesson in balance and self-restraint.",
      cultural_meta: "Keraton Solo, Royal Etiquette",
      image: "https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafybeiar7mv7kxcae4eieywr3r4x6e4tprmjvkyoqnqm3m63yutij4uptm",
      attributes: [
        { trait_type: "Character", value: "Raccoon" },
        { trait_type: "Island", value: "Java" },
        { trait_type: "Tribe", value: "Java" },
        { trait_type: "Status", value: "Noble" }
      ]
    }
  ],
  BALI_NUSA_TENGGARA: [
    {
      id: 19,
      name: "Celestial of Bali — Payas Agung",
      island: "Bali",
      tribe: "Bali Aga",
      outfit: "Payas Agung",
      rarity: "Legendary",
      description: "A complex architectural marvel made of gold and silk. It is the peak of Balinese ceremonial aesthetics, reserved for the highest gods.",
      cultural_meta: "Tri Hita Karana, Divine Aesthetics",
      image: "https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafybeiaq6mncgisey4remtmlgo4cw3dhqzq2xilbptan32e7nit3w5kp6e",
      attributes: [
        { trait_type: "Character", value: "Raccoon" },
        { trait_type: "Island", value: "Bali" },
        { trait_type: "Tribe", value: "Bali" },
        { trait_type: "Status", value: "Celestial" }
      ]
    },
    {
      id: 22,
      name: "Spirit-Rider of Sumba — Tenun Ikat",
      island: "Nusa Tenggara",
      tribe: "Sumba",
      outfit: "Tenun Ikat Sumba",
      rarity: "Epic",
      description: "Woven with motifs of legendary horses and ancient spirits. Each ikat is a spiritual contract between the weaver and the ancestors.",
      cultural_meta: "Marapu, Ancestral Contract",
      image: "https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafybeidw2ee733c4htljawzqwpz2ps6iw4zu5olm7czqpeodyayh3fajxi",
      attributes: [
        { trait_type: "Character", value: "Raccoon" },
        { trait_type: "Island", value: "Nusa Tenggara" },
        { trait_type: "Tribe", value: "Sumba" },
        { trait_type: "Status", value: "Spirit Rider" }
      ]
    },
    {
      id: 23,
      name: "Mariner of Rote — Ti'i Langga",
      island: "Nusa Tenggara",
      tribe: "Rote",
      outfit: "Ti'i Langga",
      rarity: "Rare",
      description: "The iconic antlered hat of the southern mariners, capturing whispers from the ocean.",
      cultural_meta: "Southern Sailors, Lontar Leaf Art",
      image: "https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafybeiape2pd6noybzyogeuiguva4bfkzlwyhltysgbbr27zl3zzjyxg74",
      attributes: [
        { trait_type: "Character", value: "Raccoon" },
        { trait_type: "Island", value: "Nusa Tenggara" },
        { trait_type: "Tribe", value: "Rote" }
      ]
    }
  ],
  KALIMANTAN: [
    {
      id: 25,
      name: "Monarch of the Sky — King Baba",
      island: "Kalimantan",
      tribe: "Dayak Iban",
      outfit: "King Baba",
      rarity: "Legendary",
      description: "Made from the sacred Hornbill and the soul of the ancient forest.",
      cultural_meta: "Hornbill Spirit, Dayak Valor",
      image: "https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafybeibuj2u55fapgupt6aswug3lgd2ep5ri3k4oci5flc3ptq4tozgnqu",
      attributes: [
        { trait_type: "Character", value: "Raccoon" },
        { trait_type: "Island", value: "Kalimantan" },
        { trait_type: "Tribe", value: "Dayak" },
        { trait_type: "Status", value: "Warrior" }
      ]
    }
  ],
  SULAWESI: [
    {
      id: 33,
      name: "Guide of Toraja — Seppa Tallung Buku",
      island: "Sulawesi",
      tribe: "Toraja",
      outfit: "Seppa Tallung Buku",
      rarity: "Epic",
      description: "Reserved for the grandest funerals of the mists. It is the armor for a transition between worlds, where the soul meets the ancestors.",
      cultural_meta: "Rambu Solo, Death Rites",
      image: "https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafybeid6korfogpkm662qn6wa74nzqxw3sojomcfxwugatopcw64m2bitq",
      attributes: [
        { trait_type: "Character", value: "Raccoon" },
        { trait_type: "Island", value: "Sulawesi" },
        { trait_type: "Tribe", value: "Toraja" },
        { trait_type: "Status", value: "Spirit Guide" }
      ]
    },
    {
      id: 31,
      name: "Seafarer of Bugis — Baju Bodo",
      island: "Sulawesi",
      tribe: "Bugis",
      outfit: "Baju Bodo",
      rarity: "Epic",
      description: "A symbol of pride and maritime bravery, one of the oldest fashions in the archipelago.",
      cultural_meta: "Phinisi Spirit, Coastal Pride",
      image: "https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafybeig3hmjj2ecixvpalqrr7l6v34oa7h4sryvn6p2ovrmdnxgfrn6kc4",
      attributes: [
        { trait_type: "Character", value: "Raccoon" },
        { trait_type: "Island", value: "Sulawesi" },
        { trait_type: "Tribe", value: "Bugis" }
      ]
    }
  ],
  PAPUA: [
    {
      id: 39,
      name: "Sovereign of Baliem — Koteka",
      island: "Papua",
      tribe: "Dani",
      outfit: "Koteka",
      rarity: "Legendary",
      description: "The ultimate cultural icon. Stripped of all unnecessary weight, it is the purest expression of freedom and identity in the misty Baliem valley.",
      cultural_meta: "Baliem Valley, Primal Identity",
      image: "https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafybeidy7dmqhsepslok7zih5qednvtk764ngei25b545loci5av6odhla",
      attributes: [
        { trait_type: "Character", value: "Raccoon" },
        { trait_type: "Island", value: "Papua" },
        { trait_type: "Tribe", value: "Dani" },
        { trait_type: "Status", value: "Valley King" }
      ]
    },
    {
      id: 40,
      name: "Ghost of the Swamps — Rok Rumbai",
      island: "Papua",
      tribe: "Asmat",
      outfit: "Rok Rumbai",
      rarity: "Epic",
      description: "Woven for rituals where man becomes wood and wood becomes ghost.",
      cultural_meta: "Bisj Pole, Swamp Carver",
      image: "https://ivory-magnificent-caterpillar-957.mypinata.cloud/ipfs/bafybeiac5v6mi7bxzizgv36fulo2alpqdlpiehdhckeiyim4x4b2kz5cgy",
      attributes: [
        { trait_type: "Character", value: "Raccoon" },
        { trait_type: "Island", value: "Papua" },
        { trait_type: "Tribe", value: "Asmat" }
      ]
    }
  ]
};
