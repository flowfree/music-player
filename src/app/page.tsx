'use client'

export default function Home() {

  return (
    <>
      <div className="grow">
        <h2 className="text-xl font-bold tracking-tight">
          Main content
        </h2>
      </div>

      <div className="sticky w-content bottom-0 py-4 bg-gray-100">
        <h2 className="text-xl font-bold tracking-tight text-center">
          Sticky panel
        </h2>
      </div>
    </>
  )
}
