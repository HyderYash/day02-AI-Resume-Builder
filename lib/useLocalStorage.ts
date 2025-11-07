"use client";

import { useState, useEffect, useCallback } from "react";
import { ResumeData } from "./types";

const STORAGE_KEY = "ai-resume-builder-draft";

export function useLocalStorage() {
  const [data, setData] = useState<ResumeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setData(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveData = useCallback((newData: ResumeData) => {
    try {
      const dataString = JSON.stringify(newData);
      const currentData = localStorage.getItem(STORAGE_KEY);
      
      // Only update if data actually changed
      if (currentData !== dataString) {
        localStorage.setItem(STORAGE_KEY, dataString);
        // Don't update state to prevent re-renders and loops
        // The state will be updated on next mount/refresh
      }
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, []);

  const clearData = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setData(null);
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  }, []);

  return { data, saveData, clearData, isLoading };
}

