import ConsumerMatch from '@/components/ConsumerMatch'

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">AdvisorNow</h1>
            <div className="flex gap-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Insurance</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Investment</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Retirement</span>
              <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">Education</span>
              <button className="ml-4 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm">
                Agent Login
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Talk to a Licensed
            <br />
            <span className="text-blue-600">Financial Advisor</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            No Pressure, No Hard Selling, Just Advice
          </p>
        </div>
      </section>

      {/* Consumer Match Component */}
      <section className="pb-20">
        <ConsumerMatch />
      </section>
    </div>
  )
}