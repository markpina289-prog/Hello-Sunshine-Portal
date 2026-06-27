import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2, Heart, Star, Users, MessageCircle, Zap,
  Shield, Lock, Award, Play, X, Cookie
} from "lucide-react";
import { useState, useEffect } from "react";

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    city: "Los Angeles",
    text: "I thought it was a scam at first, but the liaison was so helpful. It's not just the gift—it's feeling seen. Thank you Reese!",
    tier: "Gold",
    verified: true,
    ago: "2 hours ago",
  },
  {
    name: "Jessica L.",
    city: "New York",
    text: "The Recognition Card arrived in perfect condition. I've been a fan for 8 years and this moment meant everything to me.",
    tier: "Diamond",
    verified: true,
    ago: "5 hours ago",
  },
  {
    name: "Maria T.",
    city: "Miami",
    text: "The personal call from the team was the most touching thing. They knew details about my journey with Hello Sunshine.",
    tier: "Diamond",
    verified: true,
    ago: "1 day ago",
  },
  {
    name: "Brittany K.",
    city: "Nashville",
    text: "I cried when I received my card. Reese's handwritten note inside made it so personal. 100% worth every penny.",
    tier: "Gold",
    verified: true,
    ago: "2 days ago",
  },
  {
    name: "Ashley R.",
    city: "Dallas",
    text: "Skeptical at first but my liaison walked me through everything. Card arrived in a beautiful box. It's stunning!",
    tier: "Silver",
    verified: true,
    ago: "3 days ago",
  },
  {
    name: "Lauren P.",
    city: "Chicago",
    text: "The expedited shipping was so fast! The recognition ceremony on the website with my name was a moment I'll never forget.",
    tier: "Gold",
    verified: true,
    ago: "4 days ago",
  },
  {
    name: "Melissa D.",
    city: "Atlanta",
    text: "My Diamond tier card has a holographic seal and everything. It feels so official. My friends are all jealous!",
    tier: "Diamond",
    verified: true,
    ago: "5 days ago",
  },
];

const LIVE_APPROVALS = [
  "Just approved: Sarah from Los Angeles, 2 hours ago",
  "Just approved: Emma from Nashville, 4 hours ago",
  "Just approved: Brittany from Chicago, 6 hours ago",
  "Just approved: Rachel from Houston, 8 hours ago",
  "Just approved: Jennifer from Seattle, 10 hours ago",
  "Just approved: Tiffany from Phoenix, 12 hours ago",
];

const TEAM_MEMBERS = [
  {
    name: "Nicole Hargrove",
    role: "Program Director",
    bio: "10+ years managing celebrity community programs. Former VP at a major talent agency.",
    initials: "NH",
    color: "from-amber-400 to-orange-500",
  },
  {
    name: "Sarah Chen",
    role: "Head Liaison",
    bio: "Dedicated to connecting fans with the stars they love. Processed 2,000+ verifications.",
    initials: "SC",
    color: "from-orange-400 to-red-400",
  },
  {
    name: "Marcus Webb",
    role: "Security & Verification",
    bio: "Former cybersecurity specialist ensuring every applicant's data is safe and secure.",
    initials: "MW",
    color: "from-amber-500 to-yellow-500",
  },
];

export default function Home() {
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({ fullName: "", email: "", handle: "", story: "" });
  const [approvalIdx, setApprovalIdx] = useState(0);
  const [cookieBanner, setCookieBanner] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setApprovalIdx((prev) => (prev + 1) % LIVE_APPROVALS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (formStep < 3) setFormStep(formStep + 1);
    else setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {cookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white p-4 shadow-2xl">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <Cookie className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-300">
                We use cookies to enhance your experience and verify your fan status. By continuing, you agree to our{" "}
                <button className="text-amber-400 underline hover:text-amber-300">Privacy Policy</button> and{" "}
                <button className="text-amber-400 underline hover:text-amber-300">Cookie Policy</button>.
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 text-xs" onClick={() => setCookieBanner(false)}>
                Decline
              </Button>
              <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white text-xs" onClick={() => setCookieBanner(false)}>
                Accept All
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-amber-600 text-white text-xs text-center py-2 px-4">
        <span className="animate-pulse mr-2">🔴</span>
        <span className="font-medium">{LIVE_APPROVALS[approvalIdx]}</span>
      </div>

      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-amber-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
              <span className="text-xl">☀️</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-amber-900">Hello Sunshine</h1>
              <p className="text-xs text-amber-600">Official Community Recognition</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-3 py-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-700 font-medium">Program Active</span>
            </div>
            <div className="text-xs text-amber-600 font-medium bg-amber-50 border border-amber-200 rounded-full px-3 py-1">Official Partner ✓</div>
          </div>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-block mb-4 px-4 py-2 bg-amber-100 rounded-full border border-amber-200">
            <p className="text-sm font-semibold text-amber-900">✨ Exclusive Community Program — Limited Spots</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-amber-950 mb-4 leading-tight">
            Your Story Matters to Us
          </h2>
          <p className="text-lg text-amber-700 mb-6">
            We're celebrating the most dedicated members of the Hello Sunshine community. If you've been with us from the start, we want to recognize you.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8 text-left">
            <div className="flex gap-3 items-start">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow">
                <span className="text-2xl">☀️</span>
              </div>
              <div>
                <p className="font-bold text-amber-950 mb-1">Reese Witherspoon — Founder, Hello Sunshine</p>
                <p className="text-amber-800 italic text-sm">
                  "This program means everything to me. Our fans have been on this journey since day one, and I personally wanted to find a way to say thank you. Each Recognition Card is my way of letting you know — I see you, I appreciate you, and your story matters."
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  <span className="text-xs text-blue-600 font-semibold">Verified Statement</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <div className="flex items-center gap-2 text-sm text-amber-700">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span>Official Program</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-amber-700">
              <Users className="w-5 h-5 text-blue-600" />
              <span>3 Spots Left</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-amber-700">
              <Heart className="w-5 h-5 text-red-500" />
              <span>Personally Verified</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-amber-700">
              <Shield className="w-5 h-5 text-green-600" />
              <span>Secure & Trusted</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 mb-12 p-5 bg-white rounded-xl border border-amber-100 shadow-sm">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest w-full text-center mb-1">As Featured In</p>
          {["Variety", "People", "Entertainment Weekly", "US Weekly", "E! Online"].map((pub) => (
            <div key={pub} className="text-gray-500 font-bold text-sm sm:text-base italic opacity-70 hover:opacity-100 transition-opacity">
              {pub}
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {TESTIMONIALS.slice(0, 3).map((t, idx) => (
            <Card key={idx} className="p-5 bg-white border-amber-200 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                {t.verified && (
                  <span className="flex items-center gap-1 text-xs bg-green-50 text-green-700 border border-green-200 rounded-full px-2 py-0.5 font-medium">
                    <CheckCircle2 className="w-3 h-3" /> Verified Purchase
                  </span>
                )}
              </div>
              <p className="text-sm text-amber-900 mb-3 italic">"{t.text}"</p>
              <div className="flex items-center justify-between border-t border-amber-100 pt-3">
                <div>
                  <p className="font-semibold text-amber-950 text-sm">{t.name}</p>
                  <p className="text-xs text-amber-600">{t.city}, USA • {t.ago}</p>
                </div>
                <span className="text-xs bg-amber-100 text-amber-800 rounded-full px-2 py-0.5 font-semibold">{t.tier}</span>
              </div>
            </Card>
          ))}
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Play className="w-5 h-5 text-amber-600" />
            <h3 className="text-xl font-bold text-amber-950">Fan Video Testimonials</h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { name: "Ashley R.", city: "Dallas", duration: "1:24" },
              { name: "Lauren P.", city: "Chicago", duration: "0:58" },
              { name: "Melissa D.", city: "Atlanta", duration: "2:01" },
            ].map((v, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden bg-gray-900 aspect-video cursor-pointer group shadow-md hover:shadow-xl transition-all">
                <div
                  className="w-full h-full flex flex-col items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, hsl(${30 + i * 20} 60% 25%), hsl(${10 + i * 15} 40% 15%))`,
                  }}
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:bg-white/30 transition-colors mb-2">
                    <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                  </div>
                  <p className="text-white text-sm font-semibold">{v.name}</p>
                  <p className="text-white/60 text-xs">{v.city}</p>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded font-mono">
                  {v.duration}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {TESTIMONIALS.slice(3).map((t, idx) => (
            <Card key={idx} className="p-5 bg-white border-amber-200 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                {t.verified && (
                  <span className="flex items-center gap-1 text-xs bg-green-50 text-green-700 border border-green-200 rounded-full px-2 py-0.5 font-medium">
                    <CheckCircle2 className="w-3 h-3" /> Verified Purchase
                  </span>
                )}
              </div>
              <p className="text-sm text-amber-900 mb-3 italic">"{t.text}"</p>
              <div className="flex items-center justify-between border-t border-amber-100 pt-3">
                <div>
                  <p className="font-semibold text-amber-950 text-sm">{t.name}</p>
                  <p className="text-xs text-amber-600">{t.city}, USA • {t.ago}</p>
                </div>
                <span className="text-xs bg-amber-100 text-amber-800 rounded-full px-2 py-0.5 font-semibold">{t.tier}</span>
              </div>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <h3 className="text-2xl font-bold text-amber-950 text-center mb-2">Your Recognition Level</h3>
          <p className="text-center text-amber-700 text-sm mb-8">All tiers include our <span className="font-semibold text-green-700">100% Money-Back Guarantee</span> if your card doesn't arrive.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Silver",
                fee: "$99",
                monthly: "$33/mo",
                benefits: ["Standard Recognition Card", "Secure Tracked Shipping", "Email Support", "Digital Certificate"],
                icon: "🥈",
                color: "bg-white border-amber-200",
              },
              {
                name: "Gold",
                fee: "$299",
                monthly: "$99/mo",
                benefits: ["Priority Recognition Card", "Expedited Shipping", "Verification Suite", "Email + Chat Support", "Exclusive Digital Prints", "Name in Fan Registry"],
                icon: "🥇",
                featured: true,
                color: "bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-400 shadow-xl",
              },
              {
                name: "Diamond",
                fee: "$599",
                monthly: "$199/mo",
                benefits: ["Premium Holographic Card", "Priority Overnight Shipping", "Full Verification Suite", "Personal Liaison", "Priority Support", "Signed Digital Photo", "VIP Registry Listing"],
                icon: "💎",
                color: "bg-white border-amber-200",
              },
            ].map((tier, idx) => (
              <div key={idx} className={`relative rounded-xl p-6 border transition-all ${tier.color}`}>
                {tier.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md whitespace-nowrap">
                      ⭐ MOST POPULAR
                    </span>
                  </div>
                )}
                <div className="text-4xl mb-3">{tier.icon}</div>
                <h4 className="text-xl font-bold text-amber-950 mb-1">{tier.name}</h4>
                <p className="text-3xl font-bold text-amber-600 mb-0.5">{tier.fee}</p>
                <p className="text-xs text-amber-600 mb-1">Activation Fee</p>
                <p className="text-xs text-gray-500 mb-4">or {tier.monthly} × 3 installments</p>
                <ul className="space-y-2 mb-6">
                  {tier.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-amber-900">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-1.5 text-xs text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                  <Shield className="w-3.5 h-3.5" />
                  <span className="font-medium">Money-Back Guarantee</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <h3 className="text-2xl font-bold text-amber-950 text-center mb-6">Your Recognition Card</h3>
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 text-white shadow-2xl border border-amber-400/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-400/5 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-xs text-amber-300 font-semibold tracking-widest">HELLO SUNSHINE</p>
                  <p className="text-sm text-amber-200 mt-1">FAN RECOGNITION</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl">☀️</span>
                  <div className="text-right">
                    <div className="text-xs text-amber-400/80 font-mono">HOLOGRAPHIC</div>
                    <div className="text-xs text-amber-400/80 font-mono">VERIFIED</div>
                  </div>
                </div>
              </div>
              <div className="mb-8">
                <p className="text-xs text-gray-400 mb-2">RECOGNIZED MEMBER</p>
                <p className="text-xl font-bold text-white">YOU</p>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-gray-400 mb-1">VALID THROUGH</p>
                  <p className="text-sm font-semibold text-amber-300">2026–2027</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 mb-1">LEVEL</p>
                  <p className="text-lg font-bold text-amber-300">DIAMOND</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-amber-950 text-center mb-8">Meet Our Team</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((member, idx) => (
              <Card key={idx} className="p-6 bg-white border-amber-200 text-center hover:shadow-md transition-all">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center mx-auto mb-4 shadow-md`}>
                  <span className="text-white font-bold text-lg">{member.initials}</span>
                </div>
                <h4 className="font-bold text-amber-950 mb-0.5">{member.name}</h4>
                <p className="text-xs text-amber-600 font-semibold mb-3">{member.role}</p>
                <p className="text-sm text-gray-600">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <Card className="p-8 bg-white border-amber-200 shadow-xl">
            {submitted ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-amber-950 mb-2">Application Received!</h3>
                <p className="text-amber-700 text-sm mb-4">
                  Your liaison will contact you within 24 hours via DM to verify your fan status and confirm your tier selection. Keep an eye on your messages!
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-xs text-amber-700">
                  <strong>What's next:</strong> Watch for a DM from our verified Hello Sunshine account. Do not respond to any unverified accounts.
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-amber-950 mb-2">Apply for Recognition</h3>
                <p className="text-amber-700 mb-6">Step {formStep} of 3 — Tell us your story</p>

                <div className="w-full bg-amber-100 rounded-full h-2 mb-8">
                  <div
                    className="bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(formStep / 3) * 100}%` }}
                  ></div>
                </div>

                {formStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-amber-950 font-semibold">Full Name *</Label>
                      <Input name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Enter your full name" className="mt-2 border-amber-200 focus:border-amber-400" />
                    </div>
                    <div>
                      <Label className="text-amber-950 font-semibold">Email Address *</Label>
                      <Input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="your@email.com" className="mt-2 border-amber-200 focus:border-amber-400" />
                    </div>
                    <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Your information is encrypted and secure.
                    </p>
                  </div>
                )}

                {formStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-amber-950 font-semibold">Social Media Handle *</Label>
                      <Input name="handle" value={formData.handle} onChange={handleInputChange} placeholder="@yourhandle" className="mt-2 border-amber-200 focus:border-amber-400" />
                    </div>
                    <p className="text-xs text-amber-600 mt-2">
                      We'll verify your loyalty to the community through your social media presence.
                    </p>
                  </div>
                )}

                {formStep === 3 && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-amber-950 font-semibold">Your Story *</Label>
                      <Textarea name="story" value={formData.story} onChange={handleInputChange} placeholder="Tell us how Hello Sunshine has impacted your life..." className="mt-2 border-amber-200 focus:border-amber-400 min-h-32" />
                    </div>
                    <p className="text-xs text-amber-600">
                      Share your genuine story. The most touching stories are selected for special recognition.
                    </p>
                  </div>
                )}

                <div className="flex gap-4 mt-8">
                  {formStep > 1 && (
                    <Button variant="outline" onClick={() => setFormStep(formStep - 1)} className="border-amber-300 text-amber-900 hover:bg-amber-50">
                      Back
                    </Button>
                  )}
                  <Button onClick={handleNext} className="flex-1 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-semibold">
                    {formStep === 3 ? "Submit Application" : "Next →"}
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t border-amber-100 flex flex-wrap gap-3 justify-center text-xs text-amber-600">
                  <div className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Verified by Hello Sunshine</div>
                  <div className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-blue-500" /> SSL Encrypted</div>
                  <div className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-green-600" /> Secure & Private</div>
                </div>
              </>
            )}
          </Card>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <h3 className="text-2xl font-bold text-amber-950 text-center mb-8">What Happens Next?</h3>
          <div className="space-y-4">
            {[
              { step: 1, title: "Submit Your Story", description: "You are here", icon: <Zap className="w-6 h-6" /> },
              { step: 2, title: "Liaison Verification", description: "A Hello Sunshine Liaison will contact you via DM within 24 hours to verify your fan status and confirm your card tier preference", icon: <MessageCircle className="w-6 h-6" /> },
              { step: 3, title: "Recognition Sent", description: "Your card will be produced and shipped securely to your address with tracking", icon: <Heart className="w-6 h-6" /> },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 p-4 bg-white border border-amber-200 rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-amber-950">Step {item.step}: {item.title}</p>
                  <p className="text-sm text-amber-700 mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <h3 className="text-2xl font-bold text-amber-950 text-center mb-8">Frequently Asked Questions</h3>
          <Accordion type="single" collapsible className="space-y-2">
            {[
              { q: "Is this really from Reese?", a: "Yes, this is an official Hello Sunshine Community Recognition Program. Reese personally reviews the most touching stories and selects them for special recognition." },
              { q: "Why is there an activation fee?", a: "The Recognition Card itself is a gift from Reese. The activation fee covers verification of your fan status, production of your personalized card, and secure shipping to your address." },
              { q: "Is there a money-back guarantee?", a: "Absolutely. If your Recognition Card does not arrive within the stated timeframe, we offer a full refund of your activation fee. Your satisfaction is our priority." },
              { q: "How long does it take to receive my card?", a: "After verification, your card typically ships within 5–7 business days. Your liaison will provide tracking information so you can follow your shipment." },
              { q: "Can I pay in installments?", a: "Yes! All tiers offer a 3-month installment option. Simply select your tier and choose the installment payment method at checkout with your liaison." },
              { q: "Is my information secure?", a: "Yes. All data is SSL-encrypted and only used for your recognition card production and shipping. We are GDPR compliant and never share your information with third parties." },
            ].map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-amber-200 rounded-lg px-4">
                <AccordionTrigger className="text-amber-950 font-semibold hover:text-amber-700 text-left">{item.q}</AccordionTrigger>
                <AccordionContent className="text-amber-700">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="max-w-3xl mx-auto mb-12 p-6 bg-white rounded-xl border border-amber-100 shadow-sm">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest text-center mb-5">Trusted & Secure</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center">
                <Shield className="w-5 h-5 text-yellow-900" />
              </div>
              <span className="text-xs font-bold text-gray-600">Norton</span>
              <span className="text-xs text-gray-400">Secured</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-bold text-gray-600">McAfee</span>
              <span className="text-xs text-gray-400">SECURE</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-bold text-gray-600">SSL</span>
              <span className="text-xs text-gray-400">256-bit</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-bold text-gray-600">BBB</span>
              <span className="text-xs text-gray-400">A+ Rated</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-bold text-gray-600">Trustpilot</span>
              <span className="text-xs text-gray-400">4.9 ★★★★★</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                <Lock className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-xs font-bold text-gray-600">GDPR</span>
              <span className="text-xs text-gray-400">Compliant</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-amber-950 text-amber-50 py-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid sm:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">☀️</span>
                <span className="font-bold">Hello Sunshine</span>
              </div>
              <p className="text-amber-300 text-xs">Official Community Recognition Program — celebrating the fans who make it all possible.</p>
            </div>
            <div>
              <p className="font-semibold mb-3 text-sm">Quick Links</p>
              <div className="space-y-2 text-xs text-amber-300">
                <p><button className="hover:text-white transition-colors">About the Program</button></p>
                <p><button className="hover:text-white transition-colors">Recognition Tiers</button></p>
                <p><button className="hover:text-white transition-colors">Fan Stories</button></p>
                <p><button className="hover:text-white transition-colors">Contact Support</button></p>
              </div>
            </div>
            <div>
              <p className="font-semibold mb-3 text-sm">Legal</p>
              <div className="space-y-2 text-xs text-amber-300">
                <p><button className="hover:text-white transition-colors">Privacy Policy</button></p>
                <p><button className="hover:text-white transition-colors">Terms of Service</button></p>
                <p><button className="hover:text-white transition-colors">Cookie Policy</button></p>
                <p><button className="hover:text-white transition-colors">Refund Policy</button></p>
              </div>
            </div>
          </div>
          <div className="border-t border-amber-800 pt-6 text-center text-xs text-amber-400">
            <p className="mb-1">© 2026 Hello Sunshine | Community Recognition Program. All rights reserved.</p>
            <p className="text-amber-600">This is an official Hello Sunshine initiative. For questions, contact our support team at support@hellosunshine-recognition.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
