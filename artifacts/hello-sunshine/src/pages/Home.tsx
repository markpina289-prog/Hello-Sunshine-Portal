import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, Heart, Star, Users, MessageCircle, Zap } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function Home() {
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    handle: "",
    story: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (formStep < 3) setFormStep(formStep + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-amber-100">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <span className="text-xl">☀️</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-amber-900">Hello Sunshine</h1>
              <p className="text-xs text-amber-600">Community Recognition</p>
            </div>
          </div>
          <div className="text-xs text-amber-600 font-medium">Official Partner</div>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-block mb-4 px-4 py-2 bg-amber-100 rounded-full">
            <p className="text-sm font-semibold text-amber-900">✨ Exclusive Community Program</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-amber-950 mb-4 leading-tight">
            Your Story Matters to Us
          </h2>
          <p className="text-lg text-amber-700 mb-8">
            We're celebrating the most dedicated members of the Hello Sunshine community. If you've been with us from the start, we want to recognize you.
          </p>
          <div className="flex gap-3 justify-center mb-8 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-amber-700">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span>Official Program</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-amber-700">
              <Users className="w-5 h-5 text-blue-600" />
              <span>3 Spots Left</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-amber-700">
              <Heart className="w-5 h-5 text-red-600" />
              <span>Personally Verified</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { name: "Sarah M.", city: "Los Angeles", text: "I thought it was a scam at first, but the liaison was so helpful. It's not just the gift—it's feeling seen. Thank you Reese!" },
            { name: "Jessica L.", city: "New York", text: "The Recognition Card arrived in perfect condition. I've been a fan for 8 years and this moment meant everything to me." },
            { name: "Maria T.", city: "Miami", text: "The personal call from the team was the most touching thing. They knew details about my journey with Hello Sunshine." },
          ].map((testimonial, idx) => (
            <Card key={idx} className="p-6 bg-white border-amber-200 hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-amber-900 mb-4 italic">"{testimonial.text}"</p>
              <div className="border-t border-amber-100 pt-4">
                <p className="font-semibold text-amber-950 text-sm">{testimonial.name}</p>
                <p className="text-xs text-amber-600">{testimonial.city}, USA</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <h3 className="text-2xl font-bold text-amber-950 text-center mb-8">Your Recognition Level</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Silver",
                fee: "$99",
                benefits: ["Standard Recognition", "Secure Shipping", "Email Support"],
                icon: "🥈",
              },
              {
                name: "Gold",
                fee: "$299",
                benefits: ["Priority Recognition", "Expedited Shipping", "Verification Suite", "Email + Chat Support"],
                icon: "🥇",
                featured: true,
              },
              {
                name: "Diamond",
                fee: "$599",
                benefits: ["Premium Recognition", "Priority Shipping", "Full Verification", "Personal Liaison", "Priority Support"],
                icon: "💎",
              },
            ].map((tier, idx) => (
              <Card
                key={idx}
                className={`p-6 transition-all ${
                  tier.featured
                    ? "bg-gradient-to-br from-amber-100 to-orange-100 border-2 border-amber-400 shadow-lg scale-105"
                    : "bg-white border-amber-200"
                }`}
              >
                <div className="text-4xl mb-3">{tier.icon}</div>
                <h4 className="text-xl font-bold text-amber-950 mb-2">{tier.name}</h4>
                <p className="text-3xl font-bold text-amber-600 mb-4">{tier.fee}</p>
                <p className="text-xs text-amber-600 mb-4">Activation Fee</p>
                <ul className="space-y-2 mb-6">
                  {tier.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-amber-900">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                {tier.featured && <p className="text-xs text-amber-700 font-semibold text-center">Most Popular</p>}
              </Card>
            ))}
          </div>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <h3 className="text-2xl font-bold text-amber-950 text-center mb-6">Your Recognition Card</h3>
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 text-white shadow-2xl border border-amber-400/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-xs text-amber-300 font-semibold tracking-widest">HELLO SUNSHINE</p>
                  <p className="text-sm text-amber-200 mt-1">FAN RECOGNITION</p>
                </div>
                <span className="text-3xl">☀️</span>
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

        <div className="max-w-2xl mx-auto mb-12">
          <Card className="p-8 bg-white border-amber-200 shadow-xl">
            <h3 className="text-2xl font-bold text-amber-950 mb-2">Apply for Recognition</h3>
            <p className="text-amber-700 mb-6">Step {formStep} of 3 — Tell us your story</p>

            <div className="w-full bg-amber-100 rounded-full h-2 mb-8">
              <div
                className="bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(formStep / 3) * 100}%` }}
              ></div>
            </div>

            {formStep === 1 && (
              <div className="space-y-4">
                <div>
                  <Label className="text-amber-950 font-semibold">Full Name *</Label>
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="mt-2 border-amber-200 focus:border-amber-400"
                  />
                </div>
                <div>
                  <Label className="text-amber-950 font-semibold">Email Address *</Label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="mt-2 border-amber-200 focus:border-amber-400"
                  />
                </div>
                <p className="text-xs text-amber-600 mt-4">
                  ✓ Your information is secure and will only be used for your recognition card.
                </p>
              </div>
            )}

            {formStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label className="text-amber-950 font-semibold">Social Media Handle *</Label>
                  <Input
                    name="handle"
                    value={formData.handle}
                    onChange={handleInputChange}
                    placeholder="@yourhandle"
                    className="mt-2 border-amber-200 focus:border-amber-400"
                  />
                </div>
                <p className="text-xs text-amber-600 mt-4">
                  We'll verify your loyalty to the community through your social media presence.
                </p>
              </div>
            )}

            {formStep === 3 && (
              <div className="space-y-4">
                <div>
                  <Label className="text-amber-950 font-semibold">Your Story *</Label>
                  <Textarea
                    name="story"
                    value={formData.story}
                    onChange={handleInputChange}
                    placeholder="Tell us how Hello Sunshine has impacted your life..."
                    className="mt-2 border-amber-200 focus:border-amber-400 min-h-32"
                  />
                </div>
                <p className="text-xs text-amber-600 mt-4">
                  Share your genuine story. The most touching stories are selected for special recognition.
                </p>
              </div>
            )}

            <div className="flex gap-4 mt-8">
              {formStep > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setFormStep(formStep - 1)}
                  className="border-amber-300 text-amber-900 hover:bg-amber-50"
                >
                  Back
                </Button>
              )}
              <Button
                onClick={handleNext}
                className="flex-1 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-semibold"
              >
                {formStep === 3 ? "Submit Application" : "Next"}
              </Button>
            </div>

            <div className="mt-8 pt-8 border-t border-amber-100 flex gap-4 justify-center text-xs text-amber-600 flex-wrap">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified by Hello Sunshine</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Secure & Private</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <h3 className="text-2xl font-bold text-amber-950 text-center mb-8">What Happens Next?</h3>
          <div className="space-y-4">
            {[
              {
                step: 1,
                title: "Submit Your Story",
                description: "You are here",
                icon: <Zap className="w-6 h-6" />,
              },
              {
                step: 2,
                title: "Liaison Verification",
                description: "A Hello Sunshine Liaison will contact you via DM within 24 hours to verify your fan status and confirm your card tier preference",
                icon: <MessageCircle className="w-6 h-6" />,
              },
              {
                step: 3,
                title: "Recognition Sent",
                description: "Your card will be produced and shipped securely to your address",
                icon: <Heart className="w-6 h-6" />,
              },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 p-4 bg-white border border-amber-200 rounded-lg">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-amber-950">
                    Step {item.step}: {item.title}
                  </p>
                  <p className="text-sm text-amber-700 mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <h3 className="text-2xl font-bold text-amber-950 text-center mb-8">Frequently Asked Questions</h3>
          <Accordion type="single" collapsible className="space-y-2">
            <AccordionItem value="item-1" className="border border-amber-200 rounded-lg px-4">
              <AccordionTrigger className="text-amber-950 font-semibold hover:text-amber-700">
                Is this really from Reese?
              </AccordionTrigger>
              <AccordionContent className="text-amber-700">
                Yes, this is an official Hello Sunshine Community Recognition Program. Reese personally reviews the most touching stories and selects them for special recognition.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border border-amber-200 rounded-lg px-4">
              <AccordionTrigger className="text-amber-950 font-semibold hover:text-amber-700">
                Why is there an activation fee?
              </AccordionTrigger>
              <AccordionContent className="text-amber-700">
                The Recognition Card itself is a gift from Reese. The activation fee covers verification of your fan status, production of your personalized card, and secure shipping to your address.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border border-amber-200 rounded-lg px-4">
              <AccordionTrigger className="text-amber-950 font-semibold hover:text-amber-700">
                How long does it take to receive my card?
              </AccordionTrigger>
              <AccordionContent className="text-amber-700">
                After verification, your card typically ships within 5–7 business days. Your liaison will provide tracking information so you can follow your shipment.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border border-amber-200 rounded-lg px-4">
              <AccordionTrigger className="text-amber-950 font-semibold hover:text-amber-700">
                What if I have questions after applying?
              </AccordionTrigger>
              <AccordionContent className="text-amber-700">
                A dedicated Hello Sunshine Liaison will contact you via DM to answer all your questions and guide you through the verification and recognition process.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border border-amber-200 rounded-lg px-4">
              <AccordionTrigger className="text-amber-950 font-semibold hover:text-amber-700">
                Is my information secure?
              </AccordionTrigger>
              <AccordionContent className="text-amber-700">
                Yes. All data is encrypted and only used for your recognition card production and shipping. We never share your information with third parties.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="max-w-2xl mx-auto p-6 bg-amber-50 rounded-lg border border-amber-200 text-center mb-12">
          <p className="text-sm text-amber-900 mb-2">
            <strong>Next Step:</strong> A Hello Sunshine Liaison will contact you via DM to finalize your recognition.
          </p>
          <p className="text-xs text-amber-600 mb-4">
            Expected response time: 24–48 hours. Watch your DMs closely!
          </p>
          <Link href="/dm-chat">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white">
              View Example DM Chat
            </Button>
          </Link>
        </div>
      </section>

      <footer className="mt-16 bg-amber-950 text-amber-50 py-8">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm">
          <p className="mb-2">© 2026 Hello Sunshine | Community Recognition Program</p>
          <p className="text-amber-200 text-xs">
            This is an official Hello Sunshine initiative. For questions, contact our support team.
          </p>
        </div>
      </footer>
    </div>
  );
}
