export default function ProblemStats() {
  const stats = [
    { number: '76%', label: 'of professionals say they miss important messages daily' },
    { number: '2.5h', label: 'per day spent searching for information across apps' },
    { number: '5+', label: 'communication tools the average team uses' },
    { number: '$12K', label: 'lost per employee annually to communication inefficiency' },
  ]

  return (
    <section className="py-20 px-6 border-y border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {stats.map((stat, i) => (
            <div key={i}>
              <div className="text-5xl font-extrabold tracking-tight gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
