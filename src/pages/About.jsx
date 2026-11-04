import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Target, 
  Eye, 
  Heart, 
  ShieldCheck, 
  Zap, 
  ArrowRight
} from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Target,
      title: 'Curated Excellence',
      desc: 'We filter out noise to spotlight gatherings that inspire, educate, and provoke transformative thought.'
    },
    {
      icon: Zap,
      title: 'Effortless Accessibility',
      desc: 'No friction, no bloated registrations. Experience instant pass generation directly in your browser.'
    },
    {
      icon: ShieldCheck,
      title: 'Privacy By Default',
      desc: 'Your data lives in your browser with LocalStorage architecture. We respect attendee privacy.'
    },
    {
      icon: Heart,
      title: 'Passionate Communities',
      desc: 'From underground ambient synth jams to frontier robotics labs, we celebrate the human desire to gather.'
    }
  ];

  const team = [
    {
      name: 'Elena Rostova',
      role: 'Chief Experience Officer',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      bio: 'Former festival director with 12 years curating international art and cultural celebrations.'
    },
    {
      name: 'Marcus Brody',
      role: 'Head of Event Technology',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      bio: 'Frontend architect obsessed with real-time UI, spatial audio, and seamless attendee check-in systems.'
    },
    {
      name: 'Aria Chen',
      role: 'Director of Community & Partnerships',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
      bio: 'Community builder connecting developers, artists, and athletes across North America and Europe.'
    },
    {
      name: 'Julian Vance',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      bio: 'Visual designer crafting cinematic glassmorphic aesthetics and memorable attendee brand journeys.'
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-[#8055FF] dark:text-purple-300 text-xs font-semibold">
          <Sparkles className="w-4 h-4" />
          <span>Our Story & Purpose</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] tracking-tight leading-tight">
          Where Remarkable Gatherings <br />
          <span className="bg-gradient-to-r from-[#8055FF] via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Find Their People.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
          Kanvas Events was founded on a simple conviction: every transformative moment in history began when passionate people gathered in the same room. We exist to make finding and participating in those moments seamless, beautiful, and accessible.
        </p>
      </section>

      {/* Mission & Vision Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-purple-100/70 via-white to-purple-50/50 dark:from-purple-900/20 dark:via-purple-900/10 dark:to-[#1a1b24] border border-purple-200 dark:border-purple-500/30 shadow-xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#8055FF]/10 dark:bg-[#8055FF]/20 text-[#8055FF] flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-['Outfit']">
            Our Mission
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            To provide an ultra-responsive, zero-friction event discovery and ticketing platform that connects attendees with exceptional experiences across tech, music, culture, sports, and education.
          </p>
        </div>

        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-indigo-100/70 via-white to-indigo-50/50 dark:from-indigo-900/20 dark:via-indigo-900/10 dark:to-[#1a1b24] border border-indigo-200 dark:border-indigo-500/30 shadow-xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-['Outfit']">
            Our Vision
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            A world where discovering meaningful community gatherings is as seamless as a single click, powered by client-first technology, instant QR verification, and timeless digital craftsmanship.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8055FF]">
            What We Stand For
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
            Core Values & Commitments
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val) => (
            <div
              key={val.title}
              className="p-6 rounded-3xl bg-white dark:bg-[#20212A] border border-slate-200 dark:border-white/10 shadow-lg space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#8055FF]/10 text-[#8055FF] flex items-center justify-center">
                <val.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                {val.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership Team */}
      <section className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8055FF]">
            The People Behind Kanvas
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
            Meet the Curators & Builders
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div
              key={member.name}
              className="group rounded-3xl bg-white dark:bg-[#20212A] border border-slate-200 dark:border-white/10 overflow-hidden shadow-lg hover:border-[#8055FF]/50 transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden bg-slate-900">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-1.5">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-[#8055FF]">
                  {member.role}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#8055FF] to-purple-800 text-white text-center space-y-6 shadow-2xl">
        <h2 className="text-2xl sm:text-4xl font-extrabold font-['Outfit']">
          Ready to Explore What’s Next?
        </h2>
        <p className="text-purple-100 max-w-xl mx-auto text-sm sm:text-base">
          Join thousands of attendees discovering cutting-edge conferences, intimate workshops, and electrifying live events.
        </p>
        <div>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-purple-900 hover:bg-slate-100 font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all"
          >
            <span>Explore Events Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
