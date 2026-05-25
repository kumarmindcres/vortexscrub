import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart, Star, ChevronDown, Check, Shield,
  Zap, Droplets, Battery, Timer, Sparkles, Package, Truck,
  RotateCcw, X, Menu, ChevronLeft, ChevronRight, Lock,
} from 'lucide-react';

const CHECKOUT_URL = 'https://shop.vortexscrub.store/cart/50577915773148:1';

const IMAGES = [
  'https://cdn.shopify.com/s/files/1/0834/4538/3388/files/fbb9531b-6ad8-43a2-8cef-25f1c07e462c.jpg?v=1779700693',
  'https://cdn.shopify.com/s/files/1/0834/4538/3388/files/8c710e0b-fd64-42e9-8d40-fe0f26eb8de1_trans.jpg?v=1779700693',
  'https://cdn.shopify.com/s/files/1/0834/4538/3388/files/ebc8c172-9a00-45b9-9cd0-6b12d1c1d8f0_trans.jpg?v=1779700693',
  'https://cdn.shopify.com/s/files/1/0834/4538/3388/files/7b4e32a3-b2bd-4cda-b59a-1b675649eb0d_trans.jpg?v=1779700693',
  'https://cdn.shopify.com/s/files/1/0834/4538/3388/files/a7a8ed35-4bbb-4cbc-8025-5feeadf14e84_trans.jpg?v=1779700693',
  'https://cdn.shopify.com/s/files/1/0834/4538/3388/files/14346186-9217-43de-a773-e7b5b0c1d483_trans.jpg?v=1779700693',
];

const PRODUCT = {
  price: 89.99,
  comparePrice: 179.99,
  rating: 4.9,
  reviewCount: 10847,
};

const BRUSH_HEADS = [
  { name: 'Flat Brush', use: 'Floors & Walls', color: 'from-blue-400 to-blue-600' },
  { name: 'Round Brush', use: 'Tubs & Sinks', color: 'from-cyan-400 to-cyan-600' },
  { name: 'Corner Brush', use: 'Grout Lines', color: 'from-indigo-400 to-indigo-600' },
  { name: 'Dome Brush', use: 'Stovetops', color: 'from-sky-400 to-sky-600' },
  { name: 'Cone Brush', use: 'Faucets', color: 'from-teal-400 to-teal-600' },
  { name: 'Scouring Pad', use: 'Heavy Stains', color: 'from-orange-400 to-orange-600' },
  { name: 'Soft Brush', use: 'Delicate', color: 'from-emerald-400 to-emerald-600' },
  { name: 'Extension Rod', use: 'Floor to Ceiling', color: 'from-violet-400 to-violet-600' },
];

const REVIEWS = [
  { name: 'Sarah M.', location: 'Austin, TX', rating: 5, text: "My shower hasn't looked this clean since the day we moved in. I spent 10 minutes doing what used to take me over an hour on my hands and knees. My husband ordered one the same day.", date: '3 days ago' },
  { name: 'James K.', location: 'London, UK', rating: 5, text: "I was skeptical — another TikTok gadget, right? Wrong. This thing is a beast. The corner brush got into grout lines I'd given up on years ago. Battery lasted my entire flat.", date: '1 week ago' },
  { name: 'Maria L.', location: 'Toronto, CA', rating: 5, text: "I have chronic back pain and cleaning the bathtub was my worst nightmare. The extendable handle means I don't have to bend at all. This isn't a want — it's a need. Buy it.", date: '2 weeks ago' },
];

const FAQS = [
  { q: 'How long does the battery last?', a: 'Up to 90 minutes of continuous cleaning on a single charge — enough to deep clean your entire home.' },
  { q: 'Is it really waterproof?', a: "Yes! It's IPX7 rated — fully submersible. Use it freely in showers, bathtubs, sinks, and outdoors." },
  { q: 'What surfaces can I use it on?', a: 'Tile, glass, porcelain, stainless steel, stone, car wheels, stovetops, and more. The 8 heads cover virtually every surface.' },
  { q: "What's in the box?", a: 'The VortexScrub Pro Max unit, all 8 brush heads, USB-C charging cable, extendable handle, and quick-start guide.' },
  { q: 'How long does shipping take?', a: 'Free worldwide shipping. Orders arrive within 7-12 business days depending on your location.' },
  { q: "What if I don't like it?", a: "30-day money-back guarantee, no questions asked. If you're not satisfied, we'll refund your full purchase price." },
];

const TOAST_MESSAGES = [
  { name: 'Sarah', location: 'Austin, TX', time: '2 min ago' },
  { name: 'David', location: 'Sydney, AU', time: '5 min ago' },
  { name: 'Emma', location: 'London, UK', time: '8 min ago' },
  { name: 'Carlos', location: 'Miami, FL', time: '11 min ago' },
  { name: 'Priya', location: 'Mumbai, IN', time: '14 min ago' },
  { name: 'Li Wei', location: 'Toronto, CA', time: '18 min ago' },
];

// ─── Utilities ─────────────────────────────────────────────────

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Stars({ rating, size = 'w-4 h-4' }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`${size} ${i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`} />
      ))}
    </div>
  );
}

function BuyButton({ children, className = '', small = false }) {
  return (
    <a
      href={CHECKOUT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        bg-gradient-to-r from-[#0066ff] to-[#00b4ff] text-white font-bold
        rounded-full flex items-center justify-center gap-2
        hover:shadow-xl hover:shadow-blue-500/25 transition-all active:scale-[0.97]
        ${small ? 'px-5 py-2.5 text-sm' : 'px-8 py-4 text-base sm:text-lg'}
        ${className}
      `}
    >
      {children}
    </a>
  );
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    const offset = 80;
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

// ─── Purchase Toast Notifications ──────────────────────────────

function PurchaseToasts() {
  const [toast, setToast] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const showToast = () => {
      setToast(TOAST_MESSAGES[index % TOAST_MESSAGES.length]);
      setIndex((i) => i + 1);
      setTimeout(() => setToast(null), 4000);
    };
    const delay = setTimeout(showToast, 8000);
    const interval = setInterval(showToast, 25000);
    return () => { clearTimeout(delay); clearInterval(interval); };
  }, [index]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          className="fixed bottom-20 sm:bottom-6 left-4 z-50 bg-white rounded-xl shadow-2xl border border-slate-100 px-4 py-3 flex items-center gap-3 max-w-[320px]"
        >
          <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
            <img src={IMAGES[0]} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-800 truncate">
              {toast.name} from {toast.location}
            </p>
            <p className="text-[11px] text-slate-400">
              just purchased &bull; {toast.time}
            </p>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Countdown Timer ───────────────────────────────────────────

function CountdownTimer({ dark = true }) {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      const d = end - now;
      return { hours: Math.floor(d / 3600000), minutes: Math.floor((d % 3600000) / 60000), seconds: Math.floor((d % 60000) / 1000) };
    };
    setTime(calc());
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');
  const bg = dark ? 'bg-white/10' : 'bg-red-50';
  const text = dark ? 'text-white' : 'text-red-600';
  const sub = dark ? 'text-white/40' : 'text-red-400';

  return (
    <div className="flex gap-1.5 items-center">
      {[
        { v: time.hours, l: 'HRS' },
        { v: time.minutes, l: 'MIN' },
        { v: time.seconds, l: 'SEC' },
      ].map((u, i) => (
        <React.Fragment key={u.l}>
          {i > 0 && <span className={`${sub} font-bold text-sm`}>:</span>}
          <div className={`${bg} rounded-lg px-2.5 py-1.5 text-center min-w-[44px]`}>
            <div className={`${text} font-bold text-lg tabular-nums leading-tight`}>{pad(u.v)}</div>
            <div className={`${sub} text-[9px] font-bold tracking-wider`}>{u.l}</div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── Image Gallery ─────────────────────────────────────────────

function ImageGallery() {
  const [active, setActive] = useState(0);
  const [touchStart, setTouchStart] = useState(0);

  const next = () => setActive((a) => (a + 1) % IMAGES.length);
  const prev = () => setActive((a) => (a - 1 + IMAGES.length) % IMAGES.length);

  const onTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const onTouchEnd = (e) => {
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
  };

  return (
    <div className="relative">
      <div
        className="aspect-square bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl sm:rounded-3xl overflow-hidden relative"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={IMAGES[active]}
            alt={`VortexScrub Pro Max - Image ${active + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-contain p-4"
          />
        </AnimatePresence>

        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur rounded-full p-1.5 shadow-md hover:bg-white transition hidden sm:block">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur rounded-full p-1.5 shadow-md hover:bg-white transition hidden sm:block">
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
          50% OFF
        </div>
      </div>

      <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
        {IMAGES.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition ${
              active === i ? 'border-blue-500 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-1.5 mt-3 sm:hidden">
        {IMAGES.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-full transition ${active === i ? 'bg-blue-500 w-5' : 'bg-slate-300'}`} />
        ))}
      </div>
    </div>
  );
}

// ─── Sections ──────────────────────────────────────────────────

function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-[#0a1628] via-[#0c2d5e] to-[#0a1628] text-white py-2 text-center text-xs sm:text-sm font-medium overflow-hidden">
      <motion.div
        animate={{ x: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="flex items-center justify-center gap-2"
      >
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span>FLASH SALE: <strong>50% OFF</strong> + FREE WORLDWIDE SHIPPING</span>
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
      </motion.div>
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const links = [
    { label: 'Features', id: 'features' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Reviews', id: 'reviews' },
    { label: 'FAQ', id: 'faq' },
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-lg shadow-sm' : 'bg-white/80 backdrop-blur-md'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-[#0066ff] to-[#00d4ff] rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-xs sm:text-sm">V</span>
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight">VortexScrub</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            {links.map((l) => (
              <button key={l.id} onClick={() => scrollToSection(l.id)} className="hover:text-slate-900 transition cursor-pointer">
                {l.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <BuyButton small>
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Shop Now</span>
            </BuyButton>
            <button className="md:hidden p-2 -mr-2" onClick={() => setOpen(!open)}>
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-white"
          >
            <div className="pt-20 px-6 space-y-1">
              {links.map((l, i) => (
                <motion.button
                  key={l.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => { setOpen(false); setTimeout(() => scrollToSection(l.id), 100); }}
                  className="block w-full text-left text-2xl font-bold text-slate-800 py-4 border-b border-slate-100"
                >
                  {l.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="pt-6"
              >
                <BuyButton className="w-full text-lg">
                  <ShoppingCart className="w-5 h-5" />
                  Shop Now — 50% Off
                </BuyButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Hero() {
  return (
    <section className="pt-16 sm:pt-20 pb-8 sm:pb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-20"
          >
            <ImageGallery />
          </motion.div>

          <div className="pt-2 sm:pt-4">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="flex items-center gap-2 mb-3">
                <Stars rating={5} size="w-4 h-4" />
                <span className="text-sm font-semibold text-slate-600">{PRODUCT.rating} ({PRODUCT.reviewCount.toLocaleString()} reviews)</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 mb-3 leading-[1.1]"
            >
              VortexScrub™ Pro Max
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-base sm:text-lg text-slate-500 mb-5 leading-relaxed"
            >
              The ultimate <strong className="text-slate-700">8-in-1 cordless power cleaning system</strong>. No bending. No scrubbing. Just sparkling results in minutes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-xl p-4 mb-5"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 line-through text-lg">${PRODUCT.comparePrice}</span>
                  <span className="text-3xl font-black text-slate-900">${PRODUCT.price}</span>
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">-50%</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1 text-red-600 font-semibold">
                  <Timer className="w-3.5 h-3.5" />
                  <span>Sale ends tonight</span>
                </div>
                <CountdownTimer dark={false} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="space-y-2 mb-5"
            >
              {[
                'VortexScrub Pro Max Unit + All 8 Brush Heads',
                'Extendable Handle (reaches 4 feet)',
                'USB-C Charging Cable + Quick-Start Guide',
                'FREE Worldwide Shipping',
                '30-Day Money-Back Guarantee',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm text-slate-600">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="space-y-3 mb-5"
            >
              <BuyButton className="w-full relative overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-[shimmer_2s_infinite]" />
                <ShoppingCart className="w-5 h-5" />
                Add to Cart — ${PRODUCT.price}
              </BuyButton>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                <Lock className="w-3 h-3" />
                <span>Secure checkout powered by Shopify</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-wrap gap-x-4 gap-y-2 text-xs sm:text-sm text-slate-500"
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="mt-4 flex items-center gap-2 text-xs text-orange-600 bg-orange-50 rounded-lg px-3 py-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
              </span>
              <span><strong>Only 23 left</strong> in stock — 47 people viewing this right now</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  return (
    <section className="border-y border-slate-100 bg-slate-50/50 py-4 sm:py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-10 items-center text-xs sm:text-sm text-slate-600">
          <div className="flex items-center gap-1.5">
            <Stars rating={5} size="w-3.5 h-3.5" />
            <span className="font-semibold">{PRODUCT.rating}</span>
            <span className="text-slate-300">|</span>
            <span>{PRODUCT.reviewCount.toLocaleString()} Reviews</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <span className="text-lg">🔥</span>
            <span>Trending on TikTok</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Package className="w-3.5 h-3.5 text-emerald-500" />
            <span><strong>2,341</strong> sold this week</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  const problems = [
    { emoji: '😩', title: 'Back Pain', desc: 'Hours on your knees scrubbing' },
    { emoji: '🧽', title: 'Worn-Out Brushes', desc: 'Constantly replacing tools' },
    { emoji: '⏰', title: 'Wasted Time', desc: 'Entire weekends lost to cleaning' },
    { emoji: '😤', title: 'Stubborn Grime', desc: "Stains that won't budge" },
  ];

  return (
    <section className="py-14 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-10 sm:mb-14">
          <span className="text-red-500 font-bold text-xs sm:text-sm uppercase tracking-wider">Sound Familiar?</span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight mt-2 mb-4">
            Still Scrubbing the Hard Way?
          </h2>
          <p className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto">
            Traditional cleaning is painful, slow, and outdated.
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-10 sm:mb-14">
          {problems.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.08}>
              <div className="bg-red-50/60 border border-red-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center">
                <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{p.emoji}</div>
                <h3 className="font-bold text-sm sm:text-base mb-1">{p.title}</h3>
                <p className="text-slate-500 text-xs sm:text-sm">{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="text-center">
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-2 text-base sm:text-lg font-bold text-emerald-600 bg-emerald-50 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full"
          >
            <Sparkles className="w-5 h-5" />
            There's a smarter way...
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}

function ProductShowcase() {
  return (
    <section className="py-14 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <FadeIn>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {IMAGES.slice(1, 5).map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 shadow-sm"
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <span className="text-blue-600 font-bold text-xs sm:text-sm uppercase tracking-wider">Meet VortexScrub Pro Max</span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight mt-2 mb-5">
            The Future of Home Cleaning
          </h2>
          <p className="text-base sm:text-lg text-slate-500 mb-6 leading-relaxed">
            Stop breaking your back. The VortexScrub blasts through grime, soap scum, and hard water stains in seconds with its high-torque motor and 8 interchangeable heads.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
            {[
              { val: '300', unit: 'RPM', label: 'Motor speed' },
              { val: '90', unit: 'MIN', label: 'Battery life' },
              { val: '8', unit: 'HEADS', label: 'Included' },
              { val: 'IPX7', unit: '', label: 'Waterproof' },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl p-3 sm:p-4 border border-slate-100 shadow-sm">
                <div className="text-xl sm:text-2xl font-black text-slate-900">
                  {s.val}
                  {s.unit && <span className="text-xs sm:text-sm font-bold text-blue-500 ml-1">{s.unit}</span>}
                </div>
                <div className="text-slate-400 text-[11px] sm:text-xs font-medium mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
          <BuyButton className="w-full sm:w-auto">
            <ShoppingCart className="w-5 h-5" />
            Get Yours Now — 50% Off
          </BuyButton>
        </FadeIn>
      </div>
    </section>
  );
}

function BrushHeads() {
  return (
    <section id="features" className="py-14 sm:py-24 px-4 sm:px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-10 sm:mb-14">
          <span className="text-blue-600 font-bold text-xs sm:text-sm uppercase tracking-wider">8-in-1 System</span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight mt-2 mb-4">
            One Tool. Every Surface.
          </h2>
          <p className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto">
            8 specialized heads for any cleaning challenge. Click, twist, clean.
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {BRUSH_HEADS.map((h, i) => (
            <FadeIn key={h.name} delay={i * 0.04}>
              <motion.div
                whileHover={{ y: -3 }}
                className="bg-white border border-slate-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-xl sm:rounded-2xl bg-gradient-to-br ${h.color} flex items-center justify-center mb-3`}>
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="font-bold text-xs sm:text-sm mb-0.5">{h.name}</h3>
                <p className="text-slate-400 text-[11px] sm:text-xs">{h.use}</p>
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
    { num: '01', title: 'Attach', desc: 'Click on your preferred brush head.', icon: <Package className="w-5 h-5 sm:w-6 sm:h-6" /> },
    { num: '02', title: 'Spray', desc: 'Apply your favorite cleaning solution.', icon: <Droplets className="w-5 h-5 sm:w-6 sm:h-6" /> },
    { num: '03', title: 'Glide', desc: 'Let the 300 RPM motor do the work.', icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6" /> },
    { num: '04', title: 'Done', desc: 'Rinse and enjoy the sparkle.', icon: <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" /> },
  ];

  return (
    <section id="how-it-works" className="py-14 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-10 sm:mb-14">
          <span className="text-blue-600 font-bold text-xs sm:text-sm uppercase tracking-wider">Dead Simple</span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight mt-2 mb-4">
            4 Steps to Sparkling Clean
          </h2>
        </FadeIn>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {steps.map((s, i) => (
            <FadeIn key={s.num} delay={i * 0.08}>
              <div className="text-center">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 mx-auto text-blue-600">
                  {s.icon}
                </div>
                <div className="text-[10px] sm:text-xs font-bold text-blue-400 mb-1">{s.num}</div>
                <h3 className="text-base sm:text-lg font-bold mb-1">{s.title}</h3>
                <p className="text-slate-500 text-xs sm:text-sm">{s.desc}</p>
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
    { icon: <Battery className="w-5 h-5" />, label: '90 Minutes Battery Life' },
    { icon: <Droplets className="w-5 h-5" />, label: 'IPX7 Fully Waterproof' },
    { icon: <Timer className="w-5 h-5" />, label: '3-Hour USB-C Charging' },
    { icon: <Sparkles className="w-5 h-5" />, label: 'LED Digital Display' },
    { icon: <Package className="w-5 h-5" />, label: '8 Brush Heads Included' },
  ];

  return (
    <section className="py-14 sm:py-24 px-4 sm:px-6 bg-[#0a1628] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <FadeIn>
          <span className="text-cyan-400 font-bold text-xs sm:text-sm uppercase tracking-wider">Engineered Excellence</span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight mt-2 mb-6 sm:mb-8 text-white leading-tight">
            Power That Lasts.
            <br />Speed That Matters.
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {specs.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 sm:gap-4 text-white/80 text-sm sm:text-lg"
              >
                <div className="bg-gradient-to-br from-[#0066ff] to-[#00d4ff] p-2 sm:p-2.5 rounded-lg sm:rounded-xl text-white flex-shrink-0">
                  {s.icon}
                </div>
                <span>{s.label}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-8">
            <BuyButton>
              <ShoppingCart className="w-5 h-5" />
              Order Now — 50% Off
            </BuyButton>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl blur-2xl" />
            <div className="relative bg-gradient-to-br from-[#0f2440] to-[#0a1628] rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-white/10">
              <img src={IMAGES[0]} alt="VortexScrub Pro Max" className="w-full rounded-xl" />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Comparison() {
  const rows = [
    { f: 'Cleaning time', old: '60+ min', vs: '10 min' },
    { f: 'Physical effort', old: 'Extreme', vs: 'Zero' },
    { f: 'Corners & grout', old: 'Barely', vs: 'Every inch' },
    { f: 'Tools needed', old: 'Multiple', vs: '8-in-1' },
    { f: 'Annual cost', old: '$200+', vs: '$89.99 once' },
    { f: 'Back pain', old: 'Guaranteed', vs: 'Never again' },
  ];

  return (
    <section className="py-14 sm:py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <FadeIn className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-3">
            VortexScrub vs. The Old Way
          </h2>
        </FadeIn>

        <FadeIn>
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 overflow-hidden shadow-sm text-xs sm:text-sm">
            <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200">
              <div className="p-3 sm:p-4 font-bold text-slate-400" />
              <div className="p-3 sm:p-4 text-center font-bold text-slate-400">Old Way</div>
              <div className="p-3 sm:p-4 text-center font-bold text-blue-600 bg-blue-50/50">VortexScrub</div>
            </div>
            {rows.map((r, i) => (
              <div key={r.f} className={`grid grid-cols-3 ${i < rows.length - 1 ? 'border-b border-slate-100' : ''}`}>
                <div className="p-3 sm:p-4 font-medium text-slate-700">{r.f}</div>
                <div className="p-3 sm:p-4 text-center text-slate-400">{r.old}</div>
                <div className="p-3 sm:p-4 text-center font-semibold text-emerald-600 bg-emerald-50/30">{r.vs}</div>
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
    <section id="reviews" className="py-14 sm:py-24 px-4 sm:px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-8 sm:mb-12">
          <span className="text-blue-600 font-bold text-xs sm:text-sm uppercase tracking-wider">Real Results</span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight mt-2 mb-3">
            {PRODUCT.reviewCount.toLocaleString()}+ Happy Customers
          </h2>
          <div className="flex items-center justify-center gap-2">
            <Stars rating={5} size="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-bold">{PRODUCT.rating}</span>
            <span className="text-slate-400 text-sm">average</span>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {REVIEWS.map((r, i) => (
            <FadeIn key={r.name} delay={i * 0.08}>
              <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-7 shadow-sm border border-slate-100 h-full flex flex-col">
                <Stars rating={r.rating} size="w-4 h-4" />
                <p className="text-slate-700 mt-3 mb-5 flex-1 text-sm sm:text-base leading-relaxed">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div>
                    <div className="font-bold text-sm">{r.name}</div>
                    <div className="text-slate-400 text-xs">{r.location}</div>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600 text-[11px] font-medium bg-emerald-50 px-2 py-1 rounded-full">
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

function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="py-14 sm:py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <FadeIn className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-3">
            Got Questions?
          </h2>
          <p className="text-slate-500 text-base sm:text-lg">We've got answers.</p>
        </FadeIn>

        <div className="space-y-2 sm:space-y-3">
          {FAQS.map((f, i) => (
            <FadeIn key={f.q} delay={i * 0.04}>
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between text-left font-semibold text-sm sm:text-base hover:bg-slate-50 transition"
                >
                  <span className="pr-4">{f.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ${open === i ? 'rotate-180' : ''}`} />
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
                      <div className="px-4 sm:px-6 pb-4 text-slate-500 text-sm sm:text-base leading-relaxed">{f.a}</div>
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
    <section className="py-14 sm:py-24 px-4 sm:px-6 bg-[#0a1628] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />

      <div className="max-w-lg mx-auto text-center relative">
        <FadeIn>
          <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold mb-6">
            <Timer className="w-4 h-4" />
            Sale Ends Tonight
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
            Ready to Transform Your Home?
          </h2>

          <p className="text-base sm:text-lg text-white/50 mb-6 max-w-md mx-auto">
            Join 10,000+ customers who ditched their sponges.
          </p>

          <div className="flex justify-center mb-8">
            <CountdownTimer />
          </div>

          <div className="bg-white/[0.05] backdrop-blur border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8">
            <div className="text-xs text-white/40 font-medium mb-2">Complete Bundle</div>
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-white/30 line-through text-xl">${PRODUCT.comparePrice}</span>
              <span className="text-white font-black text-4xl sm:text-5xl">${PRODUCT.price}</span>
            </div>
            <div className="text-emerald-400 font-bold text-sm mb-6">
              You save ${(PRODUCT.comparePrice - PRODUCT.price).toFixed(2)}
            </div>

            <div className="space-y-2 text-left text-white/60 text-xs sm:text-sm mb-6">
              {[
                'VortexScrub Pro Max Unit',
                'All 8 Brush Heads',
                'Extendable Handle',
                'USB-C Cable',
                'FREE Shipping',
                '30-Day Guarantee',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-gradient-to-r from-[#0066ff] to-[#00d4ff] text-white py-4 rounded-full text-base sm:text-lg font-black hover:shadow-xl hover:shadow-blue-500/30 transition-all active:scale-[0.97] text-center relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-[shimmer_2s_infinite]" />
              <span className="relative flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart — ${PRODUCT.price}
              </span>
            </a>

            <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4 text-white/30 text-[11px] sm:text-xs">
              {[
                { icon: <Lock className="w-3 h-3" />, text: 'Secure Checkout' },
                { icon: <Truck className="w-3 h-3" />, text: 'Free Shipping' },
                { icon: <RotateCcw className="w-3 h-3" />, text: '30-Day Returns' },
              ].map((b) => (
                <div key={b.text} className="flex items-center gap-1">
                  {b.icon}<span>{b.text}</span>
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
    <footer className="bg-[#060d18] text-white/30 py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-[#0066ff] to-[#00d4ff] rounded-md flex items-center justify-center">
              <span className="text-white font-black text-[10px]">V</span>
            </div>
            <span className="font-bold text-white/50">VortexScrub</span>
          </div>
          <div className="flex gap-5 text-xs">
            {['Privacy', 'Terms', 'Contact', 'Track Order'].map((l) => (
              <a key={l} href="#" className="hover:text-white/50 transition">{l}</a>
            ))}
          </div>
          <div className="text-xs">&copy; 2026 VortexScrub&trade;</div>
        </div>
      </div>
    </footer>
  );
}

function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-white/95 backdrop-blur-lg border-t border-slate-200 px-4 py-3 safe-area-pb"
        >
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="font-black text-lg">${PRODUCT.price}</div>
              <div className="text-[11px] text-slate-400 line-through">${PRODUCT.comparePrice}</div>
            </div>
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#0066ff] to-[#00b4ff] text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 active:scale-[0.97] transition relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-[shimmer_2s_infinite]" />
              <ShoppingCart className="w-4 h-4 relative" />
              <span className="relative">Add to Cart</span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Page ──────────────────────────────────────────────────────

export default function VortexScrubPage() {
  return (
    <div className="bg-white text-slate-900 font-sans antialiased selection:bg-blue-100">
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <SocialProof />
      <ProblemSection />
      <ProductShowcase />
      <BrushHeads />
      <HowItWorks />
      <SpecsSection />
      <Comparison />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyMobileCTA />
      <PurchaseToasts />
    </div>
  );
}
