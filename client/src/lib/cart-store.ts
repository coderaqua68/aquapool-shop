interface CartItem {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  setIsOpen: (isOpen: boolean) => void;
}

class CartStoreImpl implements CartStore {
  items: CartItem[] = [];
  isOpen = false;
  listeners: (() => void)[] = [];

  constructor() {
    // Load cart from localStorage on initialization
    this.loadFromStorage();
  }

  private loadFromStorage() {
    if (typeof window !== 'undefined') {
      try {
        const savedCart = localStorage.getItem('aquapool-cart');
        if (savedCart) {
          this.items = JSON.parse(savedCart);
        }
      } catch (error) {
        console.warn('Failed to load cart from localStorage:', error);
      }
    }
  }

  private saveToStorage() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('aquapool-cart', JSON.stringify(this.items));
      } catch (error) {
        console.warn('Failed to save cart to localStorage:', error);
      }
    }
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => listener());
    this.saveToStorage();
  }

  addItem(item: Omit<CartItem, 'quantity'>) {
    const existingItem = this.items.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ ...item, quantity: 1 });
    }
    this.notify();
  }

  removeItem(id: number) {
    this.items = this.items.filter(item => item.id !== id);
    this.notify();
  }

  updateQuantity(id: number, quantity: number) {
    if (quantity <= 0) {
      this.removeItem(id);
      return;
    }
    const item = this.items.find(i => i.id === id);
    if (item) {
      item.quantity = quantity;
      this.notify();
    }
  }

  clearCart() {
    this.items = [];
    this.notify();
  }

  getTotal() {
    return this.items.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
  }

  getItemCount() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  setIsOpen(isOpen: boolean) {
    this.isOpen = isOpen;
    this.notify();
  }
}

export const cartStore = new CartStoreImpl();
