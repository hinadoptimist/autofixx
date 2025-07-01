import { Truck, Package, Clock, Shield, MapPin, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export function ShippingPage() {
  const shippingOptions = [
    {
      name: "Standard Shipping",
      price: "$9.99",
      time: "3-5 Business Days",
      description: "Reliable ground shipping for most orders",
      icon: Package,
      features: ["Tracking included", "Insurance up to $100", "Delivery confirmation"]
    },
    {
      name: "Express Shipping",
      price: "$19.99",
      time: "1-2 Business Days",
      description: "Fast delivery for urgent orders",
      icon: Truck,
      features: ["Priority handling", "Tracking included", "Insurance up to $500"]
    },
    {
      name: "Overnight Shipping",
      price: "$39.99",
      time: "Next Business Day",
      description: "Get your parts the next business day",
      icon: Clock,
      features: ["Guaranteed delivery", "Signature required", "Insurance up to $1000"]
    }
  ];

  const restrictions = [
    {
      category: "Hazardous Materials",
      items: ["Batteries", "Brake fluids", "Engine oils", "Aerosol products"],
      note: "Ground shipping only, additional handling fees may apply"
    },
    {
      category: "Oversized Items",
      items: ["Complete engines", "Transmissions", "Large body panels", "Wheels & tires sets"],
      note: "Freight shipping required, separate quote provided"
    },
    {
      category: "Special Handling",
      items: ["Glass parts", "Electronic components", "Precision instruments"],
      note: "Extra packaging and handling time required"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Shipping & Returns</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Fast, reliable shipping with easy returns. We're committed to getting your parts 
              to you quickly and safely, with hassle-free returns if needed.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Free Shipping Banner */}
        <Card className="mb-12 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <Truck className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              FREE Shipping on Orders Over $99
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              No minimum quantity required. Applies to standard shipping within the continental US.
            </p>
          </CardContent>
        </Card>

        {/* Shipping Options */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Shipping Options
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {shippingOptions.map((option, index) => (
              <Card key={index} className="relative">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <option.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-xl">{option.name}</CardTitle>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{option.price}</span>
                    <Badge variant="secondary">{option.time}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
                    {option.description}
                  </p>
                  <ul className="space-y-2">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Shipping Information */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Shipping Information
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  Processing Time
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Orders placed before 2:00 PM EST Monday-Friday typically ship the same business day. 
                  Orders placed after 2:00 PM or on weekends ship the next business day.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  Delivery Areas
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We ship to all 50 US states, including Alaska and Hawaii. International shipping 
                  is available to select countries. Contact us for international shipping rates.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-blue-600" />
                  Package Protection
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  All shipments include tracking and basic insurance. Higher value orders 
                  automatically include additional insurance coverage at no extra cost.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Returns & Exchanges
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  30-Day Return Policy
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Return most items within 30 days of delivery for a full refund. Items must be 
                  in original condition with original packaging and all accessories included.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Return Process
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Contact customer service to initiate return</li>
                  <li>Receive return authorization and shipping label</li>
                  <li>Package item securely and attach return label</li>
                  <li>Drop off at any authorized shipping location</li>
                  <li>Refund processed within 3-5 business days of receipt</li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Exchange Policy
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Defective items can be exchanged for the same part at no charge, including 
                  return shipping. We'll also pay for shipping the replacement to you.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Restrictions */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Shipping Restrictions
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {restrictions.map((restriction, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{restriction.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {restriction.items.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3 flex-shrink-0"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                    {restriction.note}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Shipping FAQ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Can I change my shipping address after placing an order?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Address changes are possible if the order hasn't shipped yet. Contact us immediately 
                    after placing your order to request changes.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    What happens if my package is lost or damaged?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    All packages are insured. If your package is lost or arrives damaged, contact us 
                    immediately. We'll file a claim with the carrier and send a replacement.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Do you ship to PO Boxes?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    PO Boxes are accepted for small items via USPS. Large or hazardous items require 
                    a physical address for delivery.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Can I pickup my order instead of shipping?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Local pickup is available at our main warehouse. Select "Store Pickup" during 
                    checkout and we'll notify you when your order is ready.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    How accurate are the delivery estimates?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Delivery estimates are based on carrier schedules and are generally accurate. 
                    Delays can occur due to weather, high volume periods, or carrier issues.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    What if I'm not home for delivery?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Most packages can be left without signature. For high-value orders requiring 
                    signature, the carrier will attempt redelivery or hold at a local facility.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
