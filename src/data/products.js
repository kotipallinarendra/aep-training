export const CATEGORIES = [
    { id: 'electronics', title: 'Electronics', subcategories: ['phones', 'laptops'] },
    { id: 'fashion', title: 'Fashion', subcategories: ['men', 'women'] },
    { id: 'home', title: 'Home & Kitchen', subcategories: ['furniture', 'appliances'] },
    { id: 'books', title: 'Books', subcategories: ['fiction', 'non-fiction'] }
  ];
  
  export const PRODUCTS = [
    // Electronics
    { id: 'el1', title: 'Smartphone X', description: 'Latest smartphone with advanced features.', price: 699, category: 'electronics', subcategory: 'phones', image: '/assets/electronics-1' },
    { id: 'el2', title: 'Laptop Pro', description: 'High performance laptop for work and play.', price: 1299, category: 'electronics', subcategory: 'laptops', image: '/assets/electronics-2' },
    { id: 'el3', title: 'Headphones', description: 'Noise cancelling over-ear headphones.', price: 199, category: 'electronics', subcategory: 'phones', image: '/assets/electronics-3' },
    { id: 'el4', title: 'Smartwatch', description: 'Track your fitness and notifications.', price: 299, category: 'electronics', subcategory: 'phones', image: '/assets/electronics-4' },
    { id: 'el5', title: 'Gaming Laptop', description: 'Laptop optimized for gaming.', price: 1599, category: 'electronics', subcategory: 'laptops', image: '/assets/electronics-5' },
    { id: 'el6', title: 'Bluetooth Speaker', description: 'Portable speaker with excellent sound.', price: 99, category: 'electronics', subcategory: 'phones', image: '/assets/electronics-6' },
    { id: 'el7', title: 'Tablet', description: 'Lightweight tablet for reading and browsing.', price: 399, category: 'electronics', subcategory: 'phones', image: '/assets/electronics-7' },
    { id: 'el8', title: 'Camera', description: 'Capture your memories in high resolution.', price: 549, category: 'electronics', subcategory: 'phones', image: '/assets/electronics-8' },
    { id: 'el9', title: 'Drone', description: 'Fly high with this easy-to-use drone.', price: 899, category: 'electronics', subcategory: 'laptops', image: '/assets/electronics-9' },
    { id: 'el10', title: 'VR Headset', description: 'Experience virtual reality games and apps.', price: 399, category: 'electronics', subcategory: 'laptops', image: '/assets/electronics-10' },
  
    // Fashion
    { id: 'fa1', title: 'Men T-Shirt', description: 'Comfortable cotton t-shirt.', price: 29, category: 'fashion', subcategory: 'men', image: '/assets/fashion-1' },
    { id: 'fa2', title: 'Women Dress', description: 'Elegant evening dress.', price: 79, category: 'fashion', subcategory: 'women', image: '/assets/fashion-2' },
    { id: 'fa3', title: 'Men Jeans', description: 'Stylish denim jeans.', price: 49, category: 'fashion', subcategory: 'men', image: '/assets/fashion-3' },
    { id: 'fa4', title: 'Women Handbag', description: 'Leather handbag for everyday use.', price: 99, category: 'fashion', subcategory: 'women', image: '/assets/fashion-4' },
    { id: 'fa5', title: 'Sneakers', description: 'Comfortable sports shoes.', price: 59, category: 'fashion', subcategory: 'men', image: '/assets/fashion-5' },
    { id: 'fa6', title: 'Women Sandals', description: 'Lightweight and stylish sandals.', price: 39, category: 'fashion', subcategory: 'women', image: '/assets/fashion-6' },
    { id: 'fa7', title: 'Jacket', description: 'Warm winter jacket.', price: 129, category: 'fashion', subcategory: 'men', image: '/assets/fashion-7' },
    { id: 'fa8', title: 'Scarf', description: 'Soft wool scarf.', price: 25, category: 'fashion', subcategory: 'women', image: '/assets/fashion-8' },
    { id: 'fa9', title: 'Belt', description: 'Leather belt for men.', price: 35, category: 'fashion', subcategory: 'men', image: '/assets/fashion-9' },
    { id: 'fa10', title: 'Hat', description: 'Stylish summer hat.', price: 20, category: 'fashion', subcategory: 'women', image: '/assets/fashion-10' },
  
    // Home & Kitchen
    { id: 'hm1', title: 'Sofa', description: 'Comfortable 3-seater sofa.', price: 499, category: 'home', subcategory: 'furniture', image: '/assets/home-1' },
    { id: 'hm2', title: 'Dining Table', description: 'Wooden dining table for 6.', price: 399, category: 'home', subcategory: 'furniture', image: '/assets/home-2' },
    { id: 'hm3', title: 'Blender', description: 'High-speed kitchen blender.', price: 89, category: 'home', subcategory: 'appliances', image: '/assets/home-3' },
    { id: 'hm4', title: 'Microwave', description: 'Compact microwave oven.', price: 149, category: 'home', subcategory: 'appliances', image: '/assets/home-4' },
    { id: 'hm5', title: 'Bed', description: 'King size bed frame.', price: 599, category: 'home', subcategory: 'furniture', image: '/assets/home-5' },
    { id: 'hm6', title: 'Coffee Maker', description: 'Automatic coffee machine.', price: 79, category: 'home', subcategory: 'appliances', image: '/assets/home-6' },
    { id: 'hm7', title: 'Bookshelf', description: 'Spacious bookshelf for living room.', price: 129, category: 'home', subcategory: 'furniture', image: '/assets/home-7' },
    { id: 'hm8', title: 'Toaster', description: '2-slice toaster.', price: 49, category: 'home', subcategory: 'appliances', image: '/assets/home-8' },
    { id: 'hm9', title: 'Wardrobe', description: '3-door wooden wardrobe.', price: 399, category: 'home', subcategory: 'furniture', image: '/assets/home-9' },
    { id: 'hm10', title: 'Juicer', description: 'Fruit juicer for fresh juice.', price: 59, category: 'home', subcategory: 'appliances', image: '/assets/home-10' },
  
    // Books
    { id: 'bk1', title: 'Fiction Book 1', description: 'Engaging fiction novel.', price: 15, category: 'books', subcategory: 'fiction', image: '/assets/books-1' },
    { id: 'bk2', title: 'Fiction Book 2', description: 'Another thrilling story.', price: 18, category: 'books', subcategory: 'fiction', image: '/assets/books-2' },
    { id: 'bk3', title: 'Non-fiction Book 1', description: 'Informative non-fiction book.', price: 20, category: 'books', subcategory: 'non-fiction', image: '/assets/books-3' },
    { id: 'bk4', title: 'Non-fiction Book 2', description: 'Learn new skills and knowledge.', price: 22, category: 'books', subcategory: 'non-fiction', image: '/assets/books-4' },
    { id: 'bk5', title: 'Fiction Book 3', description: 'Another fiction adventure.', price: 17, category: 'books', subcategory: 'fiction', image: '/assets/books-5' },
    { id: 'bk6', title: 'Non-fiction Book 3', description: 'Inspiring real-life stories.', price: 25, category: 'books', subcategory: 'non-fiction', image: '/assets/books-6' },
    { id: 'bk7', title: 'Fiction Book 4', description: 'Mystery and suspense.', price: 19, category: 'books', subcategory: 'fiction', image: '/assets/books-7' },
    { id: 'bk8', title: 'Non-fiction Book 4', description: 'Historical insights.', price: 23, category: 'books', subcategory: 'non-fiction', image: '/assets/books-8' },
    { id: 'bk9', title: 'Fiction Book 5', description: 'Exciting fiction tale.', price: 16, category: 'books', subcategory: 'fiction', image: '/assets/books-9' },
    { id: 'bk10', title: 'Non-fiction Book 5', description: 'Practical guides and tips.', price: 21, category: 'books', subcategory: 'non-fiction', image: '/assets/books-10' }
]