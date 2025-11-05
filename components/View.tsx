"use client";
import React, { useEffect, useState } from "react";
import Ping from "@/components/Ping";

const View = ({ id }: { id: string }) => {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const incrementView = async () => {
      try {
        const res = await fetch(`/api/views/${id}`, { method: "POST" });
        const data = await res.json();
        if (data.view) setViews(data.view);
      } catch (err) {
        console.error("Error incrementing view:", err);
      }
    };
    incrementView();
  }, [id]);

  return (
    <>
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black">{views ?? "Loading..."} Views</span>
      </p>
    </>
  );
};

export default View;
