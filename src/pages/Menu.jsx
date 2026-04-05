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
        image: "https://images.unsplash.com/photo-1609501676725-7186f017a4b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8ZW58MHx8fHx8fDA%3D&auto=format&fit=crop&w=500&q=60" 
      },
      { 
        name: "Chicken Fried Momos (6 pcs)", 
        price: 400, 
        image: "https://images.unsplash.com/photo-1585822266842-9d6cfe26a21d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8ZW58MHx8fHx8fDA%3D&auto=format&fit=crop&w=500&q=60" 
      },
      { 
        name: "Chicken Cheese Momos (6 pcs)", 
        price: 450, 
        image: "https://images.unsplash.com/photo-1609501676725-7186f017a4b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8ZW58MHx8fHx8fDA%3D&auto=format&fit=crop&w=500&q=60" 
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
        image: "https://images.unsplash.com/photo-1604908176997-431f3c88a8b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8ZW58MHx8fHx8fDA%3D&auto=format&fit=crop&w=500&q=60" 
      },
      { 
        name: "Chicken Biryani Full Plate (with Salad + Raita)", 
        price: 400, 
        image: "https://images.unsplash.com/photo-1585820817529-e876ca0f7f83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8ZW58MHx8fHx8fDA%3D&auto=format&fit=crop&w=500&q=60" 
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
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8ZW58MHx8fHx8fDA%3D&auto=format&fit=crop&w=500&q=60" 
      },
      { 
        name: "Baked Chicken Wings", 
        price: 400, 
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc45e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8ZW58MHx8fHx8fDA%3D&auto=format&fit=crop&w=500&q=60" 
      },
      { 
        name: "Chicken Paratha Roll", 
        price: 200, 
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc45e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8ZW58MHx8fHx8fDA%3D&auto=format&fit=crop&w=500&q=60" 
      },
      { 
        name: "Chicken Cheese Paratha Roll", 
        price: 270, 
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc45e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8ZW58MHx8fHx8fDA%3D&auto=format&fit=crop&w=500&q=60" 
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
        image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8ZW58MHx8fHx8fDA%3D&auto=format&fit=crop&w=500&q=60" 
      },
      { 
        name: "Sundae", 
        price: 200, 
        image: "https://images.unsplash.com/photo-1563805042-7684c019e157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8ZW58MHx8fHx8fDA%3D&auto=format&fit=crop&w=500&q=60" 
      },
      { 
        name: "Dream Cake (Small)", 
        price: 400, 
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8ZW58MHx8fHx8fDA%3D&auto=format&fit=crop&w=500&q=60" 
      },
      { 
        name: "Bento Cake", 
        price: 650, 
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8ZW58MHx8fHx8fDA%3D&auto=format&fit=crop&w=500&q=60" 
      },
    ]
  },
  {
    title: "🥤 DRINKS",
    icon: "🥤",
    color: "from-blue-500 to-cyan-600",
    items: [
      { 
        name: "Coke (Small 250ml)", 
        price: 50, 
        image: "https://images.unsplash.com/photo-1603543957267-18c8e3d0ace7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8ZW58MHx8fHx8fDA%3D&auto=format&fit=crop&w=500&q=60" 
      },
      { 
        name: "Mango Lassi (Large 500ml)", 
        price: 150, 
        image: "https://images.unsplash.com/photo-1566084922221-61d47d67b01b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8ZW58MHx8fHx8fDA%3D&auto=format&fit=crop&w=500&q=60" 
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