import { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Link } from 'wouter';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqs: FAQ[] = [
    {
      id: 1,
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 3-5 business days within the continental US. Express shipping (1-2 business days) and overnight shipping options are available for urgent orders. Hawaii and Alaska may take 5-7 business days.",
      category: "shipping"
    },
    {
      id: 2,
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy on most items. Items must be in original condition with original packaging. Some restrictions apply to electrical components, fluids, and custom-ordered parts. Return shipping costs may apply unless the item is defective.",
      category: "returns"
    },
    {
      id: 3,
      question: "Do you offer installation support?",
      answer: "Yes! Our technical support team can provide installation guidance over the phone or email. We also have installation guides and videos available on our website. For complex installations, we can recommend certified mechanics in your area.",
      category: "support"
    },
    {
      id: 4,
      question: "How do I know if a part fits my vehicle?",
      answer: "Use our vehicle compatibility checker on each product page. Enter your vehicle's year, make, model, and engine size. You can also contact our technical support team with your VIN number for precise fitment verification.",
      category: "compatibility"
    },
    {
      id: 5,
      question: "Do you price match?",
      answer: "Yes, we offer price matching on identical items from authorized dealers. The competitor must be an authorized retailer with the item in stock. Contact us with the competitor's current advertised price before placing your order.",
      category: "pricing"
    },
    {
      id: 6,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and financing options through Affirm for qualified purchases. All transactions are secured with SSL encryption.",
      category: "payment"
    },
    {
      id: 7,
      question: "Are your parts genuine or aftermarket?",
      answer: "We carry both genuine OEM parts and high-quality aftermarket parts. Each product listing clearly indicates whether it's OEM or aftermarket. All aftermarket parts meet or exceed OEM specifications and come with manufacturer warranties.",
      category: "products"
    },
    {
      id: 8,
      question: "What if I receive a defective part?",
      answer: "If you receive a defective part, contact us immediately. We'll arrange for a replacement or refund, including return shipping costs. Most defective parts are covered under manufacturer warranty, and we'll handle the warranty claim process for you.",
      category: "warranty"
    },
    {
      id: 9,
      question: "Can I track my order?",
      answer: "Yes, you'll receive a tracking number via email once your order ships. You can track your package on our website or directly with the shipping carrier. Orders placed before 2 PM EST typically ship the same business day.",
      category: "shipping"
    },
    {
      id: 10,
      question: "Do you offer bulk pricing for shops?",
      answer: "Yes, we offer commercial accounts with volume discounts for auto repair shops, fleet managers, and other businesses. Contact our sales team to discuss pricing and terms. Commercial accounts also get extended payment terms and dedicated support.",
      category: "commercial"
    },
    {
      id: 11,
      question: "What if I can't find the part I need?",
      answer: "Our parts lookup team can help locate hard-to-find parts. Contact us with your vehicle information and part description. We have access to thousands of suppliers and can often source discontinued or rare parts within 24-48 hours.",
      category: "support"
    },
    {
      id: 12,
      question: "Are there any shipping restrictions?",
      answer: "Some items like batteries, fluids, and aerosols have shipping restrictions and may require ground shipping only. Oversized items may incur additional freight charges. We'll notify you of any restrictions or additional costs before processing your order.",
      category: "shipping"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'shipping', label: 'Shipping & Delivery' },
    { value: 'returns', label: 'Returns & Exchanges' },
    { value: 'support', label: 'Technical Support' },
    { value: 'compatibility', label: 'Vehicle Compatibility' },
    { value: 'pricing', label: 'Pricing & Payment' },
    { value: 'payment', label: 'Payment Methods' },
    { value: 'products', label: 'Products & Parts' },
    { value: 'warranty', label: 'Warranty & Defects' },
    { value: 'commercial', label: 'Commercial Accounts' }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Find quick answers to the most common questions about AutoFixx products, 
              shipping, returns, and more.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.value)}
                className="text-sm"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No FAQs found
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Try adjusting your search terms or category filter.
                </p>
                <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredFAQs.map((faq) => (
              <Card key={faq.id}>
                <Collapsible open={openItems.includes(faq.id)} onOpenChange={() => toggleItem(faq.id)}>
                  <CollapsibleTrigger className="w-full">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-left font-semibold text-gray-900 dark:text-white text-lg">
                          {faq.question}
                        </h3>
                        {openItems.includes(faq.id) ? (
                          <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        )}
                      </div>
                    </CardContent>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="px-6 pb-6 pt-0">
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))
          )}
        </div>

        {/* Contact Section */}
        <Card className="mt-12 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Can't find what you're looking for? Our customer support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:+923455494163">Call +92 345 549 4163</a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Popular Topics */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Popular Help Topics
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Part Lookup</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Learn how to find the right parts for your vehicle using our search tools.
                </p>
                <Button variant="outline" size="sm">Learn More</Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HelpCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Installation Help</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Get step-by-step installation guides and technical support.
                </p>
                <Button variant="outline" size="sm">View Guides</Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ChevronDown className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Order Tracking</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Track your order status and estimated delivery date.
                </p>
                <Button variant="outline" size="sm">Track Order</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
