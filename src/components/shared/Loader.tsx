"use client";
import React from "react";

const Loader = () => {
  return (
    <div className="min-h-[250px] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
};

export default Loader;