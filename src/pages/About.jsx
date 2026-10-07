import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Compass,
  Heart,
  Target,
  Users2,
  Award,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import Logo from '../components/Logo';

export default function About() {
  const values = [
    {
      title: 'Human-First Connection',
      desc: 'In an era of hyper-virtual noise, physical and intentional gatherings anchor us. We design every interaction to facilitate authentic face-to-face moments.',
      icon: Users2,
    },
    {
      title: 'Curation over Chaos',
      desc: 'We decline low-quality scraped events. Every listing adheres to a high aesthetic standard, transparent itineraries, and verified organizer credentials.',
      icon: Award,
    },
    {
      title: 'Empowered Organizers',
      desc: 'Independent creators, university societies, and grassroots meetups deserve the same polished tools as multi-million dollar stadium operations.',
      icon: Target,
    },
    {
      title: 'Inclusive Discovery',
      desc: 'From free open-source coding hackathons to premier rooftop jazz and cultural expos, experiences should welcome diverse attendees.',
      icon: Heart,
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Storytelling Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-berry/10 text-berry text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Our Story & Origin
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-navy tracking-tight leading-tight">
            Making meaningful experiences easier to <span className="text-berry">discover</span>,{' '}
            <span className="text-navy">create</span> and <span className="text-peach">share</span>.
          </h1>

          <p className="text-base sm:text-lg text-navy/80 leading-relaxed font-normal">
            Spark Gather was born out of a simple observation: modern event platforms felt either like chaotic corporate ticket sales engines or dry spreadsheets. We wanted something that felt like a vibrant cultural publication.
          </p>
        </div>

        {/* Mission & Vision Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-mauve/25 shadow-card relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-berry/10 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="w-12 h-12 rounded-2xl bg-berry text-white flex items-center justify-center mb-6 shadow-sm">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-berry block mb-1">
                Our Mission
              </span>
              <h2 className="font-display font-bold text-2xl text-navy mb-4">
                Empower Communities to Convene Effortlessly
              </h2>
              <p className="text-sm text-navy/75 leading-relaxed">
                To build the world’s most intuitive and elegant home for gatherings—where finding your next memory takes seconds, ticketing is instantaneous, and organizers feel proud of every link they share.
              </p>
            </div>
            <div className="pt-6 border-t border-cream-surface mt-6 text-xs text-mauve-dark font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Over 10,000 community gatherings facilitated
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-mauve/25 shadow-card relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-navy/10 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="w-12 h-12 rounded-2xl bg-navy text-white flex items-center justify-center mb-6 shadow-sm">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-navy block mb-1">
                Our Vision
              </span>
              <h2 className="font-display font-bold text-2xl text-navy mb-4">
                A Connected Society Driven by Real Encounters
              </h2>
              <p className="text-sm text-navy/75 leading-relaxed">
                We believe that the best ideas, enduring friendships, and creative breakthroughs happen when passionate people occupy the same room. We exist to catalyze that connection across 100+ cities.
              </p>
            </div>
            <div className="pt-6 border-t border-cream-surface mt-6 text-xs text-mauve-dark font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Global footprint spanning 10 diverse categories
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-cream-surface/60 rounded-3xl p-8 sm:p-12 border border-mauve/20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-berry bg-berry/10 px-3 py-1 rounded-full">
              Guiding Principles
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-navy mt-3">
              The Principles That Guide Spark Gather
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className="bg-white rounded-2xl p-6 border border-mauve/20 shadow-soft">
                  <div className="w-10 h-10 rounded-xl bg-cream-surface text-berry flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-navy mb-2">{v.title}</h3>
                  <p className="text-xs text-navy/75 leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA banner */}
        <div className="bg-navy rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden">
          <div className="max-w-xl mx-auto space-y-5 relative z-10">
            <h2 className="font-display font-bold text-2xl sm:text-3xl">
              Be Part of the Gathering Movement
            </h2>
            <p className="text-xs sm:text-sm text-cream/80 leading-relaxed">
              Find an upcoming summit in your area, or publish your own event in less than three minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link to="/events" className="spark-btn-primary text-xs py-3 px-6">
                Explore Events
              </Link>
              <Link to="/create-event" className="spark-btn-secondary text-xs py-3 px-6">
                Create an Event
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
