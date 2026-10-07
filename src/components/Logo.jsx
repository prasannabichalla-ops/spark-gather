import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ size = 'md', className = '', showText = true }) {
  const iconSize = size === 'sm' ? 'w-7 h-7' : size === 'lg' ? 'w-11 h-11' : 'w-9 h-9';
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';

  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2.5 font-bold tracking-tight text-navy group transition-opacity hover:opacity-95 ${className}`}
      aria-label="Spark Gather Home"
    >
      <div className={`relative ${iconSize} shrink-0 flex items-center justify-center`}>
        {/* Original Geometric Emblem: Spark + Gathering + Event Nodes */}
        <svg
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
        >
          {/* Base Gathering Halo */}
          <circle cx="22" cy="22" r="20" className="fill-cream stroke-mauve/30" strokeWidth="1.5" />
          
          {/* 4 Gathering Nodes (People / Meeting Points) */}
          <circle cx="22" cy="9" r="4.5" fill="#123C69" />
          <circle cx="35" cy="22" r="4.5" fill="#AC3B61" />
          <circle cx="22" cy="35" r="4.5" fill="#123C69" />
          <circle cx="9" cy="22" r="4.5" fill="#AC3B61" />

          {/* Converging Sparks to Center */}
          <path
            d="M22 13.5V17M30.5 22H27M22 30.5V27M13.5 22H17"
            stroke="#BAB2B5"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Central Radiant Spark */}
          <path
            d="M22 17L23.8 20.2L27 22L23.8 23.8L22 27L20.2 23.8L17 22L20.2 20.2L22 17Z"
            fill="#AC3B61"
          />
          <circle cx="22" cy="22" r="2.2" fill="#EDC7B7" />
        </svg>
      </div>

      {showText && (
        <span className={`font-display font-extrabold ${textSize} tracking-tight text-navy leading-none`}>
          SPARK<span className="text-berry ml-1">GATHER</span>
        </span>
      )}
    </Link>
  );
}
