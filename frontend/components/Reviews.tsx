import { Star, Quote, CheckCircle2, Building2, Sparkles } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  category: string;
  initials: string;
  avatarBg: string;
  rating: number;
  date: string;
  comment: string;
  highlight: string;
}

const reviews: Review[] = [
  {
    id: '1',
    name: 'Rajesh Sharma',
    role: 'General Manager - Operations',
    company: 'Vanguard Logistics & Infra',
    location: 'Indore, MP',
    category: 'Facility Management',
    initials: 'RS',
    avatarBg: 'from-amber-500 to-amber-700',
    rating: 5,
    date: '2 weeks ago',
    comment:
      'Hand to Hand Private Limited has been instrumental in managing our multi-site facilities. Their team is exceptionally disciplined, punctual, and proactive. The level of operational control they bring is unmatched.',
    highlight: 'Flawless Operations & High Punctuality',
  },
  {
    id: '2',
    name: 'Ananya Verma',
    role: 'Head of Human Resources',
    company: 'Apex Healthcare Solutions',
    location: 'Bhopal, MP',
    category: 'Workforce Staffing',
    initials: 'AV',
    avatarBg: 'from-[#0d1b3e] to-blue-900',
    rating: 5,
    date: '1 month ago',
    comment:
      'Finding skilled and background-verified support staff used to be a major challenge for us. Hand to Hand stepped in with a tailored staffing model that seamlessly fulfilled all our requirements within 48 hours.',
    highlight: 'Rapid 48hr Deployment & Vetted Staff',
  },
  {
    id: '3',
    name: 'Vikramaditya Singh',
    role: 'Managing Director',
    company: 'Heritage Hotels & Resorts',
    location: 'Ujjain, MP',
    category: 'Security & Housekeeping',
    initials: 'VS',
    avatarBg: 'from-amber-600 to-amber-800',
    rating: 5,
    date: '3 weeks ago',
    comment:
      'We engaged Hand to Hand for comprehensive housekeeping and security services. Their staff adheres strictly to hospitality standards and safety protocols. Their executive oversight is truly commendable.',
    highlight: 'Premium Hospitality Standards',
  },
  {
    id: '4',
    name: 'Meenakshi Patel',
    role: 'VP - Administration',
    company: 'Zenith Tech Parks',
    location: 'Indore, MP',
    category: 'Corporate Services',
    initials: 'MP',
    avatarBg: 'from-[#0d1b3e] to-slate-800',
    rating: 5,
    date: '2 months ago',
    comment:
      'Zero compliance hiccups and total transparency in billing. The team leadership at Hand to Hand is always accessible and addresses feedback instantly. We are thoroughly impressed with their partnership.',
    highlight: '100% Compliance & Transparent Billing',
  },
  {
    id: '5',
    name: 'Siddharth Kaplan',
    role: 'Plant Head',
    company: 'Nexus Manufacturing Corp',
    location: 'Pithampur, MP',
    category: 'Industrial Support',
    initials: 'SK',
    avatarBg: 'from-amber-500 to-yellow-600',
    rating: 5,
    date: '1 month ago',
    comment:
      'Their industrial support crew and logistics personnel handled our heavy-duty operations smoothly. Safety protocols were enforced impeccably. We have renewed our annual contract for the 3rd year.',
    highlight: 'Strict Safety & 3-Year Partnership',
  },
  {
    id: '6',
    name: 'Pooja Deshmukh',
    role: 'Senior Property Manager',
    company: 'Urban Living Commercials',
    location: 'Bhopal, MP',
    category: 'Facility Management',
    initials: 'PD',
    avatarBg: 'from-slate-700 to-[#0d1b3e]',
    rating: 5,
    date: '3 weeks ago',
    comment:
      'Highly professional, courteous, and dedicated team. They transformed our commercial complex upkeep within a month. Their 24/7 support line gives us total peace of mind.',
    highlight: '24/7 Dedicated Support Channel',
  },
];

export default function Reviews() {
  return (
    <section
      id="reviews"
      className="pt-10 lg:pt-14 pb-16 lg:pb-24 bg-gradient-to-b from-slate-50 via-white to-amber-50/30 relative overflow-hidden"
    >
      {/* Subtle decorative background elements */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0d1b3e 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-80 h-80 bg-[#0d1b3e]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* ── Section Heading ── */}
        <div className="text-center mb-10 lg:mb-12">
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-amber-600 mb-3">
            <span className="w-8 h-px bg-amber-500" />
            Client Reviews
            <span className="w-8 h-px bg-amber-500" />
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0d1b3e] leading-tight">
            What Our Clients Say
          </h2>
        </div>

        {/* ── Reviews Grid ── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 lg:p-7 border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative group"
            >
              {/* Quote icon accent */}
              <div className="absolute top-6 right-6 text-gray-100 group-hover:text-amber-100 transition-colors pointer-events-none">
                <Quote size={42} className="rotate-180" />
              </div>

              <div className="relative">
                {/* Rating & Date */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-medium text-gray-400">{rev.date}</span>
                </div>

                {/* Service Category Tag */}
                <span className="inline-block text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md mb-3 border border-amber-200/50">
                  {rev.category}
                </span>

                {/* Highlight banner */}
                <div className="flex items-start gap-1.5 mb-3 text-xs font-semibold text-[#0d1b3e]">
                  <Sparkles size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>{rev.highlight}</span>
                </div>

                {/* Main Comment */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                  &quot;{rev.comment}&quot;
                </p>
              </div>

              {/* Client Info Block */}
              <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                {/* Styled Initials Avatar */}
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${rev.avatarBg} text-white font-bold text-sm flex items-center justify-center shadow-md flex-shrink-0 tracking-wider`}
                >
                  {rev.initials}
                </div>

                {/* Client Details */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-[#0d1b3e] text-sm truncate">{rev.name}</h4>
                    <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-gray-500 truncate">{rev.role}</p>
                  <p className="text-[11px] font-semibold text-amber-600 truncate flex items-center gap-1 mt-0.5">
                    <Building2 size={11} className="flex-shrink-0" />
                    {rev.company} ({rev.location})
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
