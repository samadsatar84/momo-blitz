// pages/Menu.jsx
import ProductCard from "../components/ProductCard";

const menuSections = [
  {
    title: "🥡 SPECIAL MOMOS",
    icon: "🥡",
    color: "from-amber-500 to-orange-600",
    items: [
      { 
        name: "Steamed Chicken Momos (6 pcs)", 
        price: 350, 
        image: "momo1ss.jpg" 
      },
      { 
        name: "Chicken Fried Momos (6 pcs)", 
        price: 400, 
        image: "momo2.jpg.jpg" 
      },
      { 
        name: "Chicken Cheese Momos (6 pcs)", 
        price: 450, 
        image: "momo2s.jpg" 
      },
    ]
  },
  {
    title: "🍚 DESI FEAST",
    icon: "🍚",
    color: "from-yellow-500 to-amber-600",
    items: [
      { 
        name: "Chicken Biryani Half Plate (with Salad + Raita)", 
        price: 250, 
        image: "bir1.jpg" 
      },
      { 
        name: "Chicken Biryani Full Plate (with Salad + Raita)", 
        price: 400, 
        image: "biryani2.jpg" 
      },
    ]
  },
  {
    title: "🍝 MACARONI & FAST FOOD",
    icon: "🍝",
    color: "from-red-500 to-pink-600",
    items: [
      { 
        name: "Chicken Macaroni", 
        price: 250, 
        image: "microni1.jpg" 
      },
      { 
        name: "Baked Chicken Wings", 
        price: 400, 
        image: "wings1.jpg" 
      },
      { 
        name: "Chicken Paratha Roll", 
        price: 200, 
        image: "roll1.jpg" 
      },
      { 
        name: "Chicken Cheese Paratha Roll", 
        price: 270, 
        image: "roll2.jpg" 
      },
    ]
  },
  {
    title: "🍰 DESSERTS",
    icon: "🍰",
    color: "from-pink-500 to-rose-600",
    items: [
      { 
        name: "Brownie", 
        price: 150, 
        image: "br1.webp" 
      },
      { 
        name: "Sundae", 
        price: 200, 
        image: "sun1.jpeg" 
      },
      { 
        name: "Dream Cake (Small)", 
        price: 400, 
        image: "drm1.jpg" 
      },
      { 
        name: "Bento Cake", 
        price: 650, 
        image: "bent1.webp" 
      },
    ]
  },
  {
    title: "🥤 DRINKS",
    icon: "🥤",
    color: "from-blue-500 to-cyan-600",
    items: [
      { 
        name: "Buddy Pack (330ml)", 
        price: 80, 
        image: "cok1.webp" 
      },
      { 
        name: "1 Litre Drink", 
        price: 160, 
        image: "cok2.jpg" 
      },
    ]
  },
];

export default function Menu() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-8">
        <h1 className="text-5xl font-bold text-center">🔥 MOMO BLITZ</h1>
        <p className="text-center text-red-100 mt-2">Hot & Fresh Daily | 12:00 PM to 12:00 AM</p>
      </div>

      {/* Menu Sections */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-12">
            {/* Section Header */}
            <div className={`bg-gradient-to-r ${section.color} rounded-lg p-4 mb-6 shadow-lg`}>
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <span className="text-4xl">{section.icon}</span>
                {section.title}
              </h2>
            </div>

            {/* Section Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {section.items.map((item, itemIndex) => (
                <ProductCard key={itemIndex} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="bg-red-600 text-white py-6 text-center mt-12">
        <p className="text-lg font-semibold">📱 For Delivery and Pickup Contact: 0306 7730467</p>
        <p className="text-red-100 mt-1">Fresh food is prepared for every order | Bahawalpur Only</p>
      </div>
    </div>
  );
}