'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function TrophyHero() {
  return (
    <div className="relative flex justify-center items-end">
      {/* floating glow shadow */}
      <motion.div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 w-64 h-6 bg-[#F59E0B]/25 rounded-full blur-2xl"
        animate={{ opacity: [0.3, 0.7, 0.3], scaleX: [0.85, 1.1, 0.85] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        <Image
          src="/mccanncup.JPEG"
          alt="The McCann Cup"
          width={480}
          height={480}
          className="rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md"
          priority
        />
      </motion.div>
    </div>
  );
}
