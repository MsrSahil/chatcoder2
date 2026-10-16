import { useEffect, useState } from "react";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Custom hook for Google Authentication using OAuth2 Token Client
// Uses google.accounts.oauth2 which opens a proper popup on direct user click.
export const useGoogleAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) {
      setError("Google Client ID not configured");
      setIsLoading(false);
      return;
    }

    const loadGSI = () => {
      return new Promise((resolve, reject) => {
        if (typeof window === "undefined") {
          reject(new Error("Google Auth only works in the browser."));
          return;
        }

        // Already loaded
        if (window.google?.accounts?.oauth2) {
          setIsInitialized(true);
          setIsLoading(false);
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;

        script.onload = () => {
          console.log("Google Identity Services script loaded");
          setIsInitialized(true);
          setIsLoading(false);
          resolve();
        };

        script.onerror = (err) => {
          console.error("Failed to load Google Identity Services script:", err);
          setError("Failed to load Google Auth");
          setIsLoading(false);
          reject(err);
        };

        document.head.appendChild(script);
      });
    };

    loadGSI().catch((err) => {
      console.error("Google Auth setup failed:", err);
      setError("Google Auth setup failed");
      setIsLoading(false);
    });
  }, []);

  /**
   * Opens a Google OAuth2 popup directly on user click.
   * Must be called synchronously inside a click handler for the popup to not be blocked.
   */
  const signInWithGoogle = (onSuccess, onFailure) => {
    if (!window.google?.accounts?.oauth2) {
      const msg = "Google Auth not ready. Please refresh and try again.";
      console.error(msg);
      onFailure?.({ message: msg });
      return;
    }

    try {
      setError(null);

      const tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: "openid email profile",
        callback: async (tokenResponse) => {
          if (tokenResponse.error) {
            console.error("Google OAuth error:", tokenResponse);
            onFailure?.(tokenResponse);
            return;
          }

          try {
            // Fetch user info from Google using the access token
            const userInfoRes = await fetch(
              "https://www.googleapis.com/oauth2/v3/userinfo",
              {
                headers: {
                  Authorization: `Bearer ${tokenResponse.access_token}`,
                },
              }
            );

            if (!userInfoRes.ok) {
              throw new Error("Failed to fetch user info from Google");
            }

            const profile = await userInfoRes.json();

            const userData = {
              id: profile.sub,
              name: profile.name,
              email: profile.email,
              imageUrl: profile.picture,
              idToken: tokenResponse.access_token,
            };

            console.log("Google sign-in successful:", userData);
            onSuccess?.(userData);
          } catch (err) {
            console.error("Error fetching Google user info:", err);
            onFailure?.(err);
          }
        },
        error_callback: (err) => {
          if (err.type !== "popup_closed") {
            console.error("Google sign-in error:", err);
            onFailure?.(err);
          }
        },
      });

      // Request access token — opens a popup directly tied to this user click
      tokenClient.requestAccessToken({ prompt: "select_account" });
    } catch (err) {
      console.error("Google sign-in error:", err);
      setError("Google sign-in failed");
      onFailure?.(err);
    }
  };

  return {
    isLoading,
    error,
    isInitialized,
    signInWithGoogle,
  };
};