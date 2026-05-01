import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react';

export enum HypeEventType {
  MINT = 'MINT',
  RARITY_DROP = 'RARITY_DROP',
  MILESTONE = 'MILESTONE',
  URGENCY = 'URGENCY'
}

export interface HypeEvent {
  id: string;
  type: HypeEventType;
  user: string;
  rarity?: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Divine';
  item?: string;
  timestamp: number;
  message?: string;
}

const RARITIES: ('Common' | 'Rare' | 'Epic' | 'Legendary' | 'Divine')[] = [
  'Common', 'Rare', 'Epic', 'Legendary', 'Divine'
];

const NAMES = [
  '0x7A2...F91', '0x21c...A2E', '0x88d...11c', 'crypto_king', 'nft_whale', 
  'bali_archivist', 'nusantara_dev', '0x551...B22', '0x992...C11', 'eth_void'
];

const ISLANDS = ['Eterna', 'Mythos', 'Sovereign', 'Archipelago', 'Celestial'];

interface HypeContextType {
  events: HypeEvent[];
  milestones: string | null;
  currentSupply: number;
}

const HypeContext = createContext<HypeContextType | undefined>(undefined);

export const HypeProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<HypeEvent[]>([]);
  const [milestones, setMilestones] = useState<string | null>(null);
  const [currentSupply, setCurrentSupply] = useState(3842);

  const addEvent = useCallback((event: HypeEvent) => {
    setEvents(prev => [event, ...prev].slice(0, 10));
    setCurrentSupply(prev => Math.min(prev + 1, 8888));
  }, []);

  const triggerHype = useCallback(() => {
    const type = Math.random() > 0.8 ? HypeEventType.RARITY_DROP : HypeEventType.MINT;
    const rarity = type === HypeEventType.RARITY_DROP 
      ? RARITIES[Math.floor(Math.random() * 3) + 2] 
      : RARITIES[Math.floor(Math.random() * 2)];
    
    const newEvent: HypeEvent = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      user: NAMES[Math.floor(Math.random() * NAMES.length)],
      rarity,
      item: `${rarity} Raccoon — ${ISLANDS[Math.floor(Math.random() * ISLANDS.length)]}`,
      timestamp: Date.now()
    };

    addEvent(newEvent);

    if (Math.random() > 0.9) {
      const ms = Math.random() > 0.5 
        ? "🔥 12 NFTs minted in last minute" 
        : "🚀 ARCHIVING SPEED INCREASING";
      setMilestones(ms);
      setTimeout(() => setMilestones(null), 5000);
    }
  }, [addEvent]);

  useEffect(() => {
    // Initial events
    for(let i = 0; i < 2; i++) {
        setTimeout(triggerHype, i * 2000);
    }

    const interval = setInterval(() => {
      triggerHype();
    }, Math.random() * 10000 + 10000);

    return () => clearInterval(interval);
  }, [triggerHype]);

  return (
    <HypeContext.Provider value={{ events, milestones, currentSupply }}>
      {children}
    </HypeContext.Provider>
  );
};

export const useHypeEngine = () => {
  const context = useContext(HypeContext);
  if (context === undefined) {
    throw new Error('useHypeEngine must be used within a HypeProvider');
  }
  return context;
};
