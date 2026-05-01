import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { initializeApp, cert, getApp, getApps } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Initialize Firebase Admin
// Note: In a real app, you would pass the service account JSON from an env var
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT 
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT) 
  : null;

if (serviceAccount) {
  if (!getApps().length) {
    initializeApp({
      credential: cert(serviceAccount)
    });
  }
}

const db = serviceAccount ? getFirestore() : null;

// Global Config initialization
app.post("/api/admin/init-system", async (req, res) => {
  if (!db) return res.status(500).json({ error: "DB not initialized" });
  try {
    const globalRef = db.collection("config").doc("global");
    const doc = await globalRef.get();
    if (!doc.exists) {
      await globalRef.set({
        emissionDecay: 0.999, // 0.1% decrease per interval
        totalBurned: 0,
        treasuryBalance: 5000,
        liquidityLockedUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        currentSellTax: 0.05,
        isActive: true
      });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Daily Check-in / Streak Protocol
app.post("/api/economy/check-in", async (req, res) => {
  if (!db) return res.status(500).json({ error: "DB not initialized" });
  const { userId } = req.body;
  const userRef = db.collection("users").doc(userId);

  try {
    const result = await db.runTransaction(async (t) => {
      const userDoc = await t.get(userRef);
      if (!userDoc.exists) throw "User not found";
      const data = userDoc.data();
      
      const lastCheckIn = data?.lastCheckIn ? data.lastCheckIn.toDate().getTime() : 0;
      const now = Date.now();
      const diff = now - lastCheckIn;
      
      if (diff < 24 * 60 * 60 * 1000) throw "Check-in only available once every 24h";

      let streak = data?.streak || 0;
      if (diff < 48 * 60 * 60 * 1000) {
        streak += 1;
      } else {
        streak = 1; // Reset
      }

      const reward = 10 * streak; // Incentive for retention
      t.update(userRef, {
        balance: FieldValue.increment(reward),
        streak: streak,
        lastCheckIn: FieldValue.serverTimestamp(),
        xp: FieldValue.increment(50)
      });

      return { success: true, reward, streak };
    });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// Mining Protocol
app.post("/api/mining/start", async (req, res) => {
  if (!db) return res.status(500).json({ error: "DB not initialized" });
  const { userId } = req.body;
  const userRef = db.collection("users").doc(userId);
  try {
    await userRef.update({ 
      isMining: true, 
      lastMiningTime: FieldValue.serverTimestamp() 
    });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// Mining Claim Protocol
app.post("/api/mining/claim", async (req, res) => {
  if (!db) return res.status(500).json({ error: "DB not initialized" });
  const { userId } = req.body;
  const userRef = db.collection("users").doc(userId);

  try {
    const result = await db.runTransaction(async (t) => {
      const userDoc = await t.get(userRef);
      if (!userDoc.exists) throw "User not found";
      const data = userDoc.data();
      
      if (!data?.isMining) throw "No active mining session";
      
      const lastMining = data.lastMiningTime.toDate().getTime();
      const elapsed = Date.now() - lastMining;
      const hours = Math.floor(elapsed / (60 * 60 * 1000));
      
      if (hours < 1) throw "Minimum 1h mining required for claim";

      const rewardPerHr = 5;
      const totalReward = hours * rewardPerHr;

      t.update(userRef, {
        balance: FieldValue.increment(totalReward),
        isMining: false,
        totalMined: FieldValue.increment(totalReward),
        xp: FieldValue.increment(hours * 10)
      });

      return { amount: totalReward, isJackpot: false, nftDrop: null };
    });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// Anti-Dump Sell Protocol
app.post("/api/economy/sell", async (req, res) => {
  if (!db) return res.status(500).json({ error: "DB not initialized" });
  
  const { userId, amount } = req.body;
  const userRef = db.collection("users").doc(userId);
  const globalRef = db.collection("config").doc("global");

  try {
    await db.runTransaction(async (t) => {
      const userDoc = await t.get(userRef);
      const globalDoc = await t.get(globalRef);
      
      if (!userDoc.exists) throw "User not found";
      const userData = userDoc.data();
      const globalData = globalDoc.data();

      // Anti-Dump Logic
      const tax = globalData?.currentSellTax || 0.05; // Default 5%
      const sellable = userData?.balance || 0;
      
      if (amount > sellable) throw "Insufficient balance";
      if (amount > 1000) throw "Max sell limit exceeded"; // Hard limit

      const netAmount = amount * (1 - tax);
      const taxAmount = amount * tax;

      t.update(userRef, {
        balance: FieldValue.increment(-amount),
        lastSellTime: FieldValue.serverTimestamp()
      });

      t.update(globalRef, {
        treasuryBalance: FieldValue.increment(taxAmount)
      });
    });

    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// NFT Upgrade Protocol (Burn mechanism)
app.post("/api/nft/upgrade", async (req, res) => {
  if (!db) return res.status(500).json({ error: "DB not initialized" });
  
  const { nftId, userId } = req.body;
  const nftRef = db.collection("nfts").doc(nftId);
  const userRef = db.collection("users").doc(userId);

  try {
    await db.runTransaction(async (t) => {
       const nftDoc = await t.get(nftRef);
       const userDoc = await t.get(userRef);
       
       if (!nftDoc.exists) throw "NFT not found";
       const nftData = nftDoc.data();
       
       if (nftData?.ownerId !== userId) throw "Unauthorized";

       // Upgrade cost: 200 RYL
       const cost = 200;
       if ((userDoc.data()?.balance || 0) < cost) throw "Insufficient funds";

       t.update(userRef, { balance: FieldValue.increment(-cost) });
       t.update(db.collection("config").doc("global"), { totalBurned: FieldValue.increment(cost) });
       
       t.update(nftRef, {
         level: FieldValue.increment(1),
         boostValue: FieldValue.increment(0.5)
       });
    });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// Trade NFT Protocol (P2P Marketplace Core)
app.post("/api/economy/trade-nft", async (req, res) => {
  if (!db) return res.status(500).json({ error: "DB not initialized" });
  const { listingId, buyerId } = req.body;
  
  const listingRef = db.collection("marketplace").doc(listingId);
  const buyerRef = db.collection("users").doc(buyerId);

  try {
    const result = await db.runTransaction(async (t) => {
      const listingDoc = await t.get(listingRef);
      if (!listingDoc.exists) throw "Listing not found or active";
      
      const listing = listingDoc.data();
      const sellerId = listing?.sellerId;
      const nftId = listing?.nftId;
      const price = listing?.price;

      if (sellerId === buyerId) throw "Cannot buy own module";

      const buyerDoc = await t.get(buyerRef);
      if (!buyerDoc.exists) throw "Buyer profile not found";
      
      const buyerData = buyerDoc.data();
      if ((buyerData?.balance || 0) < price) throw "Insufficient RYL liquidity";

      const sellerRef = db.collection("users").doc(sellerId);
      const nftRef = db.collection("nfts").doc(nftId);

      // Perform Transfers
      t.update(buyerRef, { balance: FieldValue.increment(-price) });
      t.update(sellerRef, { balance: FieldValue.increment(price) });
      
      // Update NFT Ownership
      t.update(nftRef, { ownerId: buyerId });
      
      // Remove listing
      t.delete(listingRef);

      return { success: true };
    });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// Season Reset Protocol
app.post("/api/admin/reset-season", async (req, res) => {
  if (!db) return res.status(500).json({ error: "DB not initialized" });
  
  // In real app, check for admin token
  try {
    const seasonRef = db.collection("seasons").doc();
    const rankings = await db.collection("users").orderBy("balance", "desc").limit(10).get();
    
    await db.runTransaction(async (t) => {
      t.set(seasonRef, {
        number: FieldValue.increment(1),
        startTime: FieldValue.serverTimestamp(),
        endTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      });

      rankings.docs.forEach(doc => {
        const rankingRef = seasonRef.collection("rankings").doc(doc.id);
        t.set(rankingRef, {
          userId: doc.id,
          username: doc.data().username,
          score: doc.data().balance,
          rewardClaimed: false
        });
      });
    });

    res.json({ success: true, message: "Season reset complete. Leaderboard snapshotted." });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Vesting Claim Protocol
app.post("/api/economy/claim-vesting", async (req, res) => {
  if (!db) return res.status(500).json({ error: "DB not initialized" });
  const { userId } = req.body;
  const userRef = db.collection("users").doc(userId);

  try {
    await db.runTransaction(async (t) => {
      const userDoc = await t.get(userRef);
      if (!userDoc.exists) throw "User not found";
      const data = userDoc.data();
      
      if (!data?.vesting) throw "No vesting schedule found";
      
      const { totalLocked, unlocked, startAt, duration } = data.vesting;
      const startTime = startAt.toDate().getTime();
      const now = Date.now();
      
      const elapsed = Math.min(now - startTime, duration);
      const claimableTotal = (elapsed / duration) * totalLocked;
      const amountToClaim = claimableTotal - unlocked;

      if (amountToClaim <= 0) throw "Nothing to claim at this interval";

      t.update(userRef, {
        balance: FieldValue.increment(amountToClaim),
        "vesting.unlocked": FieldValue.increment(amountToClaim)
      });
    });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// Vite middleware for development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  const PORT = 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
