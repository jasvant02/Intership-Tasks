'use client'

import React from 'react'

export default function Error({ error, reset }) {
  return (
    <div className="p-10 text-center text-white">
      <h2 className="text-2xl font-semibold mb-4">Something went wrong!</h2>
      <p className="mb-6">{error.message}</p>
      <button
        className="px-5 py-2 bg-blue-700 rounded-md"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  )
}
