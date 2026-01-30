export default function Footer() {
  return (
    <footer className="bg-[#2c3e50] text-[#ecf0f1] mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex flex-col mb-4">
              <span className="text-2xl font-black tracking-wider text-[#e74c3c]">
                RevoShop
              </span>
              <span className="text-[11px] text-[#bdc3c7] tracking-wider mt-0.5">
                PREMIUM E-COMMERCE
              </span>
            </div>
            <p className="text-[#bdc3c7]">
              Your one-stop shop for all your needs. Quality products at affordable prices.
            </p>
          </div>

          {/* Quick Links with Hover Animation */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-[#ecf0f1]">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="/" 
                  className="relative text-[#ecf0f1] text-[15px] font-medium transition-all duration-300 hover:text-[#e74c3c] group inline-block"
                >
                  Home
                  <span className="absolute bottom-[-5px] left-0 w-0 h-0.5 bg-[#e74c3c] transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a 
                  href="/about" 
                  className="relative text-[#ecf0f1] text-[15px] font-medium transition-all duration-300 hover:text-[#e74c3c] group inline-block"
                >
                  About Us
                  <span className="absolute bottom-[-5px] left-0 w-0 h-0.5 bg-[#e74c3c] transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a 
                  href="/faq" 
                  className="relative text-[#ecf0f1] text-[15px] font-medium transition-all duration-300 hover:text-[#e74c3c] group inline-block"
                >
                  FAQ
                  <span className="absolute bottom-[-5px] left-0 w-0 h-0.5 bg-[#e74c3c] transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-[#ecf0f1]">Contact Us</h4>
            <div className="space-y-3">
              <p className="text-[#bdc3c7]">
                <span className="font-medium text-[#ecf0f1]">Email:</span> support@revoshop.com
              </p>
              <p className="text-[#bdc3c7]">
                <span className="font-medium text-[#ecf0f1]">Phone:</span> (123) 456-7890
              </p>
              <p className="text-[#bdc3c7]">
                <span className="font-medium text-[#ecf0f1]">Address:</span> 123 Store Street, City
              </p>
            </div>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="border-t border-[#ecf0f1]/10 mt-8 pt-8 text-center text-[#bdc3c7]">
          <p>&copy; {new Date().getFullYear()} RevoShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}