export default function SocialProof() {
  const testimonials = [
    {
      quote: "I used to spend hours digging through Slack threads. Now I just ask DriftBox and get the answer instantly.",
      author: "Sarah Chen",
      role: "Product Manager",
      avatar: "SC",
    },
    {
      quote: "Game changer for remote teams. Nothing gets lost in translation anymore.",
      author: "Marcus Rodriguez",
      role: "Engineering Lead",
      avatar: "MR",
    },
    {
      quote: "The AI actually understands context. It's like having a personal assistant who reads everything for you.",
      author: "Emily Park",
      role: "Startup Founder",
      avatar: "EP",
    },
  ]

  return (
    <section className="py-24 bg-gray-900/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Loved by <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Early Users</span>
          </h2>
          <p className="text-xl text-gray-400">
            Join hundreds of professionals who never miss a beat
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-indigo-500/30 transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div className="ml-4">
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>
              <p className="text-gray-300 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
