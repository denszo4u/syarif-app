import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { ref, onValue, set } from "firebase/database";

export function HealthPage() {
  const [metrics, setMetrics] = useState({
    user1: {
      name: "Syarif",
      heartRate: 72,
      calories: 480,
      water: 8,
      sleep: 7.5,
    },
    user2: {
      name: "Partner",
      heartRate: 68,
      calories: 520,
      water: 6,
      sleep: 8.0,
    },
  });

  const ROOM_ID = "shared_pair_01"; // Shared room ID between two users

  // Listen for real-time changes from either user
  useEffect(() => {
    const healthRef = ref(db, `rooms/${ROOM_ID}/health`);
    const unsubscribe = onValue(healthRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMetrics(data);
      }
    });

    return () => unsubscribe();
  }, []);

  // Update metrics for current user
  const updateMyMetrics = (field: string, value: number) => {
    const currentUserKey = "user1"; // Set dynamically per logged-in user
    const updated = {
      ...metrics,
      [currentUserKey]: {
        ...metrics[currentUserKey],
        [field]: value,
      },
    };
    setMetrics(updated);
    set(ref(db, `rooms/${ROOM_ID}/health`), updated);
  };

  return (
    <div className="flex flex-col gap-6 p-6 rounded-[2rem] bg-card/80 border border-border">
      <h2 className="text-xl font-bold">Connected Partner Dashboard</h2>

      <div className="grid grid-cols-2 gap-4">
        {/* User 1 View */}
        <div className="p-4 rounded-xl bg-secondary/50 border border-border">
          <h3 className="font-bold text-primary">{metrics.user1.name} (You)</h3>
          <p className="text-sm">Heart Rate: {metrics.user1.heartRate} bpm</p>
          <p className="text-sm">Water: {metrics.user1.water} cups</p>
        </div>

        {/* User 2 View (Live Partner Data) */}
        <div className="p-4 rounded-xl bg-secondary/50 border border-border">
          <h3 className="font-bold text-purple-400">
            {metrics.user2.name} (Partner)
          </h3>
          <p className="text-sm">Heart Rate: {metrics.user2.heartRate} bpm</p>
          <p className="text-sm">Water: {metrics.user2.water} cups</p>
        </div>
      </div>
    </div>
  );
}
