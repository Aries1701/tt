import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";

interface UserProfile {
    avatar?: string;
    favorites?: string[];
}

export function useUserProfile() {
    const [profile, setProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        let unsubProfile: (() => void) | undefined;

        const unsubAuth = onAuthStateChanged(auth, (user) => {
            if (!user) {
                setProfile(null);
                return;
            }

            const ref = doc(db, "users", user.uid);

            unsubProfile = onSnapshot(ref, (snap) => {
                if (snap.exists()) {
                    setProfile(snap.data() as UserProfile);
                }
            });
        });

        return () => {
            unsubAuth();
            unsubProfile?.();
        };
    }, []);

    return profile;
}
