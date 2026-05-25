import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart, Star, ChevronDown, Check, Shield,
  Zap, Droplets, Battery, Timer, Sparkles, Package, Truck,
  RotateCcw, X, Menu,
} from 'lucide-react';

const CHECKOUT_URL = 'https://shop.vortexscrub.store/cart/50577915773148:1';
const PRODUCT_URL = 'https://shop.vortexscrub.store/products/vortexscrub%E2%84%A2-pro-max-8-in-1-cordless-electric-spin-scrubber';

const PRODUCT = {
  name: 'VortexScrub Pro Max',
  tagline: 'Effortless Clean. Every Corner.',
  price: 59.99,
  comparePrice: 119.99,
  rating: 4.9,
  reviewCount: 10847,
  images: [
    'https://sc02.alicdn.com/kf/A223b11eca04245d6a818c942b944151dw.png',
    'https://sc02.alicdn.com/kf/A82706b3532084f74bd8bf9c481cb2c4bb.png',
  ],
};

const BRUSH_HEADS = [
  { name: 'Flat Brush', use: 'Floors & Walls', color: 'from-blue-400 to-blue-600' },
  { name: 'Round Brush', use: 'Tubs & Sinks', color: 'from-cyan-400 to-cyan-600' },
  { name: 'Corner Brush', use: 'Grout & Tight Spaces', color: 'from-indigo-400 to-indigo-600' },
  { name: 'Dome Brush', use: 'Stovetops & Counters', color: 'from-sky-400 to-sky-600' },
  { name: 'Cone Brush', use: 'Faucets & Fixtures', color: 'from-teal-400 to-teal-600' },
  { name: 'Scouring Pad', use: 'Heavy-Duty Stains', color: 'from-orange-400 to-orange-600' },
  { name: 'Soft Brush', use: 'Delicate Surfaces', color: 'from-emerald-400 to-emerald-600' },
  { name: 'Extended Handle', use: 'Floor to Ceiling', color: 'from-violet-400 to-violet-600' },
];

const REVIEWS = [
  {
    name: 'Sarah M.',
    location: 'Austin, TX',
    rating: 5,
    text: "My shower hasn't looked this clean since the day we moved in. I spent 10 minutes doing what used to take me over an hour on my hands and knees. My husband ordered one for his workshop the same day.",
    date: '3 days ago',
  },
  {
    name: 'James K.',
    location: 'London, UK',
    rating: 5,
    text: "I was skeptical — another 'as seen on TikTok' gadget, right? Wrong. This thing is an absolute beast. The corner brush got into grout lines I'd given up on years ago. Battery lasted my entire flat.",
    date: '1 week ago',
  },
  {
    name: 'Maria L.',
    location: 'Toronto, CA',
    rating: 5,
    text: "I have chronic back pain and cleaning the bathtub was my worst nightmare. The VortexScrub with the extendable handle means I don't have to bend at all. This isn't a want, it's a need.",
    date: '2 weeks ago',
  },
];

const FAQS = [
  {
    q: 'How long does the battery last?',
    a: 'The VortexScrub Pro Max delivers up to 90 minutes of continuous cleaning on a single charge — enough to deep clean your entire home.',
  },
  {
    q: 'Is it really waterproof?',
    a: "Absolutely. It's IPX7 rated, meaning it can be fully submerged in water. Use it freely in showers, bathtubs, sinks, and even outdoors.",
  },
  {
    q: 'What surfaces can I clean with it?',
    a: 'Tile, glass, porcelain, stainless steel, stone, car wheels, stovetops, and more. The 8 interchangeable heads are designed for virtually every surface in your home.',
  },
  {
    q: "What's included in the box?",
    a: 'You get the VortexScrub Pro Max unit, all 8 brush heads, a USB-C charging cable, the extendable handle attachment, and a quick-start guide.',
  },
  {
    q: 'How long does shipping take?',
    a: 'We offer free worldwide shipping. Orders typically arrive within 7-12 business days depending on your location.',
  },
  {
    q: "What if I don't like it?",
    a: "We offer a 30-day money-back guarantee, no questions asked. If you're not completely satisfied, we'll refund your full purchase price.",
  },
];

// ─── Utility Components ────────────────────────────────────────

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StarRating({ rating, size = 'w-4 h-4' }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${size} ${
            i < Math.floor(rating)
              ? 'fill-amber-400 text-amber-400'
              : 'fill-gray-200 text-gray-200'
          }`}
        />
      ))}
    </div>
  );
}

function CountdownTimer() {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const getTimeLeft = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      const diff = end - now;
      return {
        hours: Math.floor(diff / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      };
    };
    setTime(getTimeLeft());
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="flex gap-2 items-center">
      {[
        { val: time.hours, label: 'HRS' },
        { val: time.minutes, label: 'MIN' },
        { val: time.seconds, label: 'SEC' },
      ].map((unit, i) => (
        <React.Fragment key={unit.label}>
          {i > 0 && <span className="text-white/40 font-bold text-lg">:</span>}
          <div className="bg-white/10 backdrop-blur rounded-lg px-3 py-1.5 text-center min-w-[52px]">
            <div className="text-white font-bold text-xl tabular-nums">{pad(unit.val)}</div>
            <div className="text-white/40 text-[10px] font-semibold tracking-wider">{unit.label}</div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── Sections ──────────────────────────────────────────────────

function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-[#0a1628] via-[#0c2d5e] to-[#0a1628] text-white py-2.5 text-center text-sm font-medium tracking-wide">
      <div className="flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-cyan-400" />
        <span>
          SUMMER SALE: <strong>50% OFF</strong> + FREE WORLDWIDE SHIPPING
        </span>
        <Sparkles className="w-4 h-4 text-cyan-400" />
      </div>
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['Features', 'How It Works', 'Reviews', 'FAQ'];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-sm'
          : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#0066ff] to-[#00d4ff] rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-sm">V</span>
          </div>
          <span className="text-xl font-bold tracking-tight">VortexScrub</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/\s+/g, '-')}`}
              className="hover:text-slate-900 transition"
            >
              {l}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-[#0066ff] to-[#00b4ff] text-white px-5 py-2 rounded-full text-sm font-bold hover:shadow-lg hover:shadow-blue-500/25 transition-all active:scale-95"
          >
            Shop Now
          </a>
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t overflow-hidden"
          >
            <div className="px-6 py-4 space-y-3">
              {links.map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block text-slate-700 font-medium py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {l}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Hero() {
  return (
    <section className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6"
            >
              <Zap className="w-3.5 h-3.5" />
              #1 Best-Selling Power Scrubber
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-[1.1]"
            >
              Throw Away
              <br />
              Your Sponge.
              <br />
              <span className="bg-gradient-to-r from-[#0066ff] to-[#00d4ff] bg-clip-text text-transparent">
                Clean Smarter.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-500 mb-8 max-w-lg mx-auto lg:mx-0"
            >
              The ultimate 8-in-1 cordless power cleaning system. No bending. No
              effort. Just sparkling results in minutes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 mb-8"
            >
              <a
                href={CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-gradient-to-r from-[#0066ff] to-[#00b4ff] text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-xl hover:shadow-blue-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Get 50% Off Today
              </a>
              <div className="flex items-center gap-2 text-slate-500">
                <span className="line-through text-lg">${PRODUCT.comparePrice}</span>
                <span className="text-2xl font-black text-slate-900">${PRODUCT.price}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-slate-500"
            >
              {[
                { icon: <Truck className="w-4 h-4" />, text: 'Free Shipping' },
                { icon: <Shield className="w-4 h-4" />, text: '30-Day Guarantee' },
                { icon: <RotateCcw className="w-4 h-4" />, text: 'Easy Returns' },
              ].map((b) => (
                <div key={b.text} className="flex items-center gap-1.5">
                  <span className="text-emerald-500">{b.icon}</span>
                  <span>{b.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12">
              <img
                src={PRODUCT.images[0]}
                alt="VortexScrub Pro Max"
                className="w-full max-w-md mx-auto drop-shadow-2xl"
              />
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg animate-pulse">
                50% OFF
              </div>
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-white/90 backdrop-blur px-3 py-2 rounded-xl shadow-lg flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-slate-700">47 people viewing now</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SocialProofStrip() {
  return (
    <section className="border-y border-slate-100 bg-slate-50/50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap justify-center gap-6 sm:gap-12 items-center text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <StarRating rating={5} />
            <span className="font-semibold">{PRODUCT.rating}</span>
            <span className="text-slate-300">|</span>
            <span>{PRODUCT.reviewCount.toLocaleString()} Reviews</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-black rounded-sm flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">T</span>
            </div>
            <span className="font-medium">Trending on TikTok</span>
          </div>
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-emerald-500" />
            <span>
              <strong>2,341</strong> sold this week
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  const problems = [
    { emoji: '😩', title: 'Back-Breaking Work', desc: 'Hours on your knees scrubbing tiles and grout lines' },
    { emoji: '🧽', title: 'Endless Sponges', desc: 'Constantly replacing worn-out brushes that barely work' },
    { emoji: '⏰', title: 'Wasted Weekends', desc: 'Spending precious time on tedious, repetitive cleaning' },
    { emoji: '😤', title: 'Stubborn Stains', desc: "Grime, soap scum, and hard water that just won't budge" },
  ];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <span className="text-red-500 font-bold text-sm uppercase tracking-wider">
            Sound Familiar?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mt-3 mb-6">
            Still Scrubbing on Your
            <br className="hidden sm:block" /> Hands and Knees?
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Traditional cleaning is painful, time-consuming, and outdated. Your back deserves better.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {problems.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.1}>
              <div className="bg-red-50/60 border border-red-100 rounded-2xl p-6 text-center hover:bg-red-50 transition">
                <div className="text-4xl mb-4">{p.emoji}</div>
                <h3 className="font-bold text-lg mb-2">{p.title}</h3>
                <p className="text-slate-500 text-sm">{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="text-center">
          <div className="inline-flex items-center gap-2 text-lg font-bold text-emerald-600 bg-emerald-50 px-6 py-3 rounded-full">
            <Sparkles className="w-5 h-5" />
            There's a smarter way...
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ProductReveal() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <FadeIn>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12">
            <img
              src={PRODUCT.images[1]}
              alt="VortexScrub Pro Max close-up"
              className="w-full rounded-2xl shadow-lg"
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">
            Meet VortexScrub Pro Max
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mt-3 mb-6">
            The Future of
            <br />
            Home Cleaning
          </h2>
          <p className="text-lg text-slate-500 mb-8 leading-relaxed">
            Stop breaking your back scrubbing bathroom tiles and kitchen grease.
            The VortexScrub is the ultimate handheld power-scrubber that does all the
            hard work for you. With 8 interchangeable heads and a high-torque motor,
            it blasts through grime, soap scum, and hard water stains in seconds.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { val: '300', unit: 'RPM', label: 'Motor speed' },
              { val: '90', unit: 'MIN', label: 'Battery life' },
              { val: '8', unit: 'HEADS', label: 'Included' },
              { val: 'IPX7', unit: '', label: 'Waterproof' },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
                <div className="text-2xl font-black text-slate-900">
                  {s.val}
                  <span className="text-sm font-bold text-blue-500 ml-1">{s.unit}</span>
                </div>
                <div className="text-slate-400 text-xs font-medium mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function BrushHeadShowcase() {
  return (
    <section id="features" className="py-20 sm:py-28 px-4 sm:px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">
            8-in-1 System
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mt-3 mb-6">
            One Tool. Every Surface.
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            8 specialized brush heads designed to tackle any cleaning challenge.
            Just click, twist, and clean.
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {BRUSH_HEADS.map((head, i) => (
            <FadeIn key={head.name} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${head.color} flex items-center justify-center mb-4`}
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-sm sm:text-base mb-1">{head.name}</h3>
                <p className="text-slate-400 text-xs sm:text-sm">{head.use}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { num: '01', title: 'Attach', desc: 'Click on your preferred brush head with a simple twist.', icon: <Package className="w-6 h-6" /> },
    { num: '02', title: 'Apply', desc: 'Spray your favorite cleaning solution on the surface.', icon: <Droplets className="w-6 h-6" /> },
    { num: '03', title: 'Glide', desc: 'Turn on and let the 300 RPM motor do the heavy lifting.', icon: <Zap className="w-6 h-6" /> },
    { num: '04', title: 'Enjoy', desc: 'Rinse and admire your sparkling clean surfaces.', icon: <Sparkles className="w-6 h-6" /> },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">
            Dead Simple
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mt-3 mb-6">
            4 Steps to Sparkling Clean
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <FadeIn key={step.num} delay={i * 0.1}>
              <div className="relative text-center lg:text-left">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(100%_-_16px)] w-[calc(100%_-_32px)] h-[2px] bg-gradient-to-r from-blue-200 to-cyan-200" />
                )}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-5 mx-auto lg:mx-0 text-blue-600">
                  {step.icon}
                </div>
                <div className="text-xs font-bold text-blue-400 mb-2">{step.num}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-slate-500">{step.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpecsSection() {
  const specs = [
    { icon: <Zap className="w-5 h-5" />, label: 'High-Torque 300 RPM Motor' },
    { icon: <Battery className="w-5 h-5" />, label: '90 Minutes of Battery Life' },
    { icon: <Droplets className="w-5 h-5" />, label: 'IPX7 Fully Waterproof' },
    { icon: <Timer className="w-5 h-5" />, label: '3-Hour USB-C Fast Charge' },
    { icon: <Sparkles className="w-5 h-5" />, label: 'LED Digital Display' },
    { icon: <Package className="w-5 h-5" />, label: '8 Brush Heads Included' },
  ];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 bg-[#0a1628] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <FadeIn>
          <span className="text-cyan-400 font-bold text-sm uppercase tracking-wider">
            Engineered Excellence
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mt-3 mb-8 text-white leading-tight">
            Power That Lasts.
            <br />
            Speed That Matters.
          </h2>
          <div className="space-y-4">
            {specs.map((spec, i) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 text-white/80 text-lg"
              >
                <div className="bg-gradient-to-br from-[#0066ff] to-[#00d4ff] p-2.5 rounded-xl text-white flex-shrink-0">
                  {spec.icon}
                </div>
                <span>{spec.label}</span>
              </motion.div>
            ))}
          </div>
          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition active:scale-[0.98]"
          >
            <ShoppingCart className="w-4 h-4" />
            Order Now — 50% Off
          </a>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="relative">
            <div className="absolute -inset-8 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-[3rem] blur-2xl" />
            <div className="relative bg-gradient-to-br from-[#0f2440] to-[#0a1628] rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 border border-white/10">
              <img
                src={PRODUCT.images[1]}
                alt="VortexScrub Pro Max Detail"
                className="w-full rounded-2xl"
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ComparisonSection() {
  const rows = [
    { feature: 'Time to clean bathroom', old: '60+ minutes', vs: '10 minutes' },
    { feature: 'Physical effort required', old: 'Extreme', vs: 'Zero' },
    { feature: 'Reaches corners & grout', old: 'Barely', vs: 'Every inch' },
    { feature: 'Multiple surfaces', old: 'Need different tools', vs: '8-in-1 system' },
    { feature: 'Annual cost', old: '$200+ in supplies', vs: 'One-time $59.99' },
    { feature: 'Back & knee pain', old: 'Guaranteed', vs: 'Never again' },
  ];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            VortexScrub vs. The Old Way
          </h2>
          <p className="text-slate-500 text-lg">The choice is obvious.</p>
        </FadeIn>

        <FadeIn>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200">
              <div className="p-4 text-sm font-bold text-slate-400" />
              <div className="p-4 text-center text-sm font-bold text-slate-400">
                Manual Scrubbing
              </div>
              <div className="p-4 text-center text-sm font-bold text-blue-600 bg-blue-50/50">
                VortexScrub
              </div>
            </div>
            {rows.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3 text-sm ${
                  i < rows.length - 1 ? 'border-b border-slate-100' : ''
                }`}
              >
                <div className="p-4 font-medium text-slate-700">{row.feature}</div>
                <div className="p-4 text-center text-slate-400">{row.old}</div>
                <div className="p-4 text-center font-semibold text-emerald-600 bg-emerald-50/30">
                  {row.vs}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="reviews" className="py-20 sm:py-28 px-4 sm:px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-12">
          <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">
            Real Results
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mt-3 mb-4">
            Loved by {PRODUCT.reviewCount.toLocaleString()}+ Customers
          </h2>
          <div className="flex items-center justify-center gap-2">
            <StarRating rating={5} size="w-5 h-5" />
            <span className="font-bold text-lg">{PRODUCT.rating}</span>
            <span className="text-slate-400">average rating</span>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <FadeIn key={review.name} delay={i * 0.1}>
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 h-full flex flex-col">
                <StarRating rating={review.rating} />
                <p className="text-slate-700 mt-4 mb-6 flex-1 leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <div className="font-bold text-sm">{review.name}</div>
                    <div className="text-slate-400 text-xs">{review.location}</div>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600 text-xs font-medium bg-emerald-50 px-2.5 py-1 rounded-full">
                    <Check className="w-3 h-3" />
                    Verified
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-lg">
            Everything you need to know before you order.
          </p>
        </FadeIn>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <FadeIn key={faq.q} delay={i * 0.05}>
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left font-semibold hover:bg-slate-50 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ml-4 ${
                      open === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-slate-500 leading-relaxed">{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="buy" className="py-20 sm:py-28 px-4 sm:px-6 bg-[#0a1628] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />

      <div className="max-w-4xl mx-auto text-center relative">
        <FadeIn>
          <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-full text-sm font-bold mb-8">
            <Timer className="w-4 h-4" />
            Sale Ends Tonight
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black tracking-tight text-white mb-6">
            Transform Your Home Today
          </h2>

          <p className="text-lg sm:text-xl text-white/50 mb-8 max-w-2xl mx-auto">
            Join 10,000+ happy customers who threw away their sponges and upgraded
            to VortexScrub.
          </p>

          <div className="flex justify-center mb-10">
            <CountdownTimer />
          </div>

          <div className="bg-white/[0.04] backdrop-blur border border-white/10 rounded-3xl p-8 sm:p-10 max-w-lg mx-auto">
            <div className="text-sm text-white/40 font-medium mb-2">
              VortexScrub Pro Max — Complete Bundle
            </div>
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-white/30 line-through text-2xl">
                ${PRODUCT.comparePrice}
              </span>
              <span className="text-white font-black text-5xl">${PRODUCT.price}</span>
            </div>
            <div className="text-emerald-400 font-bold text-sm mb-8">
              You save ${(PRODUCT.comparePrice - PRODUCT.price).toFixed(2)} (50% OFF)
            </div>

            <div className="space-y-2.5 text-left text-white/60 text-sm mb-8">
              {[
                'VortexScrub Pro Max Unit',
                'All 8 Brush Heads Included',
                'Extendable Handle Attachment',
                'USB-C Charging Cable',
                'FREE Worldwide Shipping',
                '30-Day Money-Back Guarantee',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-[#0066ff] to-[#00d4ff] text-white py-4 rounded-full text-lg font-black hover:shadow-xl hover:shadow-blue-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart — ${PRODUCT.price}
            </a>

            <div className="flex items-center justify-center gap-4 mt-5 text-white/30 text-xs">
              {[
                { icon: <Shield className="w-3 h-3" />, text: 'Secure Checkout' },
                { icon: <Truck className="w-3 h-3" />, text: 'Free Shipping' },
                { icon: <RotateCcw className="w-3 h-3" />, text: '30-Day Returns' },
              ].map((b) => (
                <div key={b.text} className="flex items-center gap-1">
                  {b.icon}
                  <span>{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#060d18] text-white/30 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-[#0066ff] to-[#00d4ff] rounded-md flex items-center justify-center">
            <span className="text-white font-black text-[10px]">V</span>
          </div>
          <span className="font-bold text-white/50">VortexScrub</span>
        </div>
        <div className="flex gap-6 text-xs">
          {['Privacy', 'Terms', 'Contact', 'Track Order'].map((l) => (
            <a key={l} href="#" className="hover:text-white/50 transition">
              {l}
            </a>
          ))}
        </div>
        <div className="text-xs">&copy; 2026 VortexScrub&trade;. All rights reserved.</div>
      </div>
    </footer>
  );
}

// ─── Main Page ─────────────────────────────────────────────────

export default function VortexScrubPage() {
  return (
    <div className="bg-white text-slate-900 font-sans antialiased selection:bg-blue-100">
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <SocialProofStrip />
      <ProblemSection />
      <ProductReveal />
      <BrushHeadShowcase />
      <HowItWorks />
      <SpecsSection />
      <ComparisonSection />
      <Testimonials />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}
