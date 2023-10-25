'use client'

export default function Home() {

  return (
    <div className="flex">
      <div className="shrink-0 hidden sticky w-[200px] top-0 left-0 h-screen bg-gray-100 sm:flex sm:flex-col">
        <div className="grow">
          <h2 className="text-xl font-bold tracking-tight">
            Sidebar
          </h2>
        </div>
        <span className="text-sm">
          Bottom of sidebar
        </span>
      </div>

      <div className="grow flex flex-col">
        <div className="grow">
          <h2 className="text-xl font-bold tracking-tight">
            Main content
          </h2>
        </div>

        <div className="sticky w-content bottom-0 py-4 bg-indigo-800">
          <h2 className="text-xl tracking-tight text-white text-center">
            Sticky panel
          </h2>
        </div>

      </div>
    </div>
  )
}
