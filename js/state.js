/**
 * SURELY — Application State Management
 * Seed data matching SURELY_Website_Spec.md §5.1
 */

(function() {
  const INITIAL_SEED_DATA = {
    family: {
      id: "fs-rao",
      name: "The Rao Family Space",
      members: [
        { id: "u1", name: "Suresh Rao", role: "Parent", avatarInitials: "SR", phone: "+91-98220-45678", relation: "Father" },
        { id: "u2", name: "Ananya Rao", role: "Adult child", avatarInitials: "AR", phone: "+91-98810-12345", relation: "Daughter" }
      ]
    },
    currentUser: "u2", // Default active perspective: Ananya (Adult child)
    categories: [
      { id: "bank", label: "Bank Accounts", icon: "landmark", description: "Savings, FDs, Current & Joint accounts" },
      { id: "insurance", label: "Insurance", icon: "umbrella", description: "Term, Health, Life & Vehicle policies" },
      { id: "pf", label: "PF / EPF", icon: "briefcase", description: "Provident fund, UAN, Gratuity & Pension" },
      { id: "property", label: "Property Papers", icon: "home", description: "Title deeds, Tax receipts & Agreements" },
      { id: "locker", label: "Locker / Gold", icon: "key", description: "Bank lockers, Keys & Physical bullion" },
      { id: "digital", label: "Digital Accounts", icon: "smartphone", description: "Email recovery, UPI & Cloud credentials" },
      { id: "investments", label: "Investments", icon: "trending-up", description: "Mutual funds, Stocks, Demat & Bonds" },
      { id: "other", label: "Other", icon: "file-text", description: "Wills, Memberships & Miscellaneous records" }
    ],
    entries: [
      {
        id: "e1",
        category: "bank",
        title: "HDFC Savings Account",
        holder: "Suresh Rao",
        location: "HDFC Bank, FC Road Branch, Pune",
        value: "Masked",
        masked: true,
        actualValue: "₹4,82,500 balance",
        notes: "Primary account, statements come by email.",
        addedBy: "Suresh Rao",
        addedById: "u1",
        emergencyRelevant: false,
        updatedAt: "2 days ago"
      },
      {
        id: "e2",
        category: "insurance",
        title: "LIC Jeevan Anand Policy",
        holder: "Suresh Rao",
        location: "LIC Branch, Pune; physical copy in study drawer",
        value: "₹5,00,000 cover",
        masked: false,
        actualValue: "₹5,00,000 cover",
        notes: "Premium due every March. Agent: Mr. Kulkarni.",
        addedBy: "Suresh Rao",
        addedById: "u1",
        emergencyRelevant: true,
        policyNumber: "LIC-894210952",
        updatedAt: "1 week ago"
      },
      {
        id: "e3",
        category: "pf",
        title: "EPF — Previous Employer",
        holder: "Suresh Rao",
        location: "EPFO online portal",
        value: "Masked",
        masked: true,
        actualValue: "₹18,40,000 accum.",
        notes: "From job held 2001–2014. UAN saved separately.",
        addedBy: "Ananya Rao",
        addedById: "u2",
        emergencyRelevant: false,
        updatedAt: "3 days ago"
      },
      {
        id: "e4",
        category: "property",
        title: "Family Home Title Deed",
        holder: "Suresh Rao",
        location: "Bank locker, HDFC FC Road Branch",
        value: "N/A",
        masked: false,
        actualValue: "Original 1994 Registered Deed",
        notes: "Original deed + latest property tax receipt.",
        addedBy: "Suresh Rao",
        addedById: "u1",
        emergencyRelevant: true,
        updatedAt: "2 weeks ago"
      },
      {
        id: "e5",
        category: "locker",
        title: "Bank Locker — Gold & Documents",
        holder: "Suresh Rao",
        location: "HDFC Bank, FC Road Branch, Locker #214",
        value: "Masked",
        masked: true,
        actualValue: "Locker #214 (Key in Study Almirah)",
        notes: "Both Suresh and Ananya are authorised signatories.",
        addedBy: "Suresh Rao",
        addedById: "u1",
        emergencyRelevant: true,
        updatedAt: "Yesterday"
      }
    ],
    emergencyContacts: [
      { name: "Suresh Rao", relation: "Father (Parent)", phone: "+91-98220-45678", avatar: "SR", isUser: true },
      { name: "Ananya Rao", relation: "Daughter (Adult child)", phone: "+91-98810-12345", avatar: "AR", isUser: true },
      { name: "Dr. Kulkarni", relation: "Family Physician", phone: "+91-98230-11234", avatar: "DK", isUser: false }
    ],
    currentScreen: "checklist", // 'checklist' | 'category' | 'add' | 'emergency'
    selectedCategory: null,
    editingEntryId: null
  };

  class SurelyStateManager {
    constructor() {
      this.listeners = [];
      this.state = this.loadState();
    }

    loadState() {
      try {
        const saved = localStorage.getItem('surely_prototype_state');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.family && parsed.entries) {
            return parsed;
          }
        }
      } catch (e) {
        console.warn('LocalStorage load failed, using initial seed', e);
      }
      return JSON.parse(JSON.stringify(INITIAL_SEED_DATA));
    }

    saveState() {
      try {
        localStorage.setItem('surely_prototype_state', JSON.stringify(this.state));
      } catch (e) {
        // Ignore quota/incognito errors
      }
    }

    getState() {
      return this.state;
    }

    subscribe(listener) {
      this.listeners.push(listener);
      return () => {
        this.listeners = this.listeners.filter(l => l !== listener);
      };
    }

    notify(eventType, payload) {
      this.saveState();
      this.listeners.forEach(fn => {
        try {
          fn(this.state, eventType, payload);
        } catch (e) {
          console.error('Listener error in SurelyStateManager', e);
        }
      });
    }

    // Category Completeness Calculation
    getCompleteness() {
      const result = {};
      this.state.categories.forEach(cat => {
        const count = this.state.entries.filter(e => e.category === cat.id).length;
        result[cat.id] = count > 0 ? "complete" : "empty";
      });
      return result;
    }

    getStats() {
      const completeness = this.getCompleteness();
      const total = this.state.categories.length;
      const completed = Object.values(completeness).filter(v => v === "complete").length;
      const percent = Math.round((completed / total) * 100);
      return { total, completed, percent };
    }

    getEntriesByCategory(categoryId) {
      return this.state.entries.filter(e => e.category === categoryId);
    }

    getEmergencyItems() {
      // Items marked emergency relevant or in locker/insurance/property
      return this.state.entries.filter(e => 
        e.emergencyRelevant || ['insurance', 'locker', 'property'].includes(e.category)
      );
    }

    // Actions
    setCurrentUser(userId) {
      this.state.currentUser = userId;
      this.notify('USER_CHANGED', userId);
    }

    setScreen(screen, params = {}) {
      this.state.currentScreen = screen;
      if (params.category) this.state.selectedCategory = params.category;
      if (params.entryId) this.state.editingEntryId = params.entryId;
      this.notify('SCREEN_CHANGED', { screen, ...params });
    }

    toggleMasking(entryId) {
      const entry = this.state.entries.find(e => e.id === entryId);
      if (entry) {
        entry.masked = !entry.masked;
        this.notify('ENTRY_MASK_TOGGLED', entry);
      }
    }

    addEntry(entryData) {
      const currentUserObj = this.state.family.members.find(m => m.id === this.state.currentUser) || this.state.family.members[0];
      
      const newEntry = {
        id: 'e_' + Date.now().toString(36),
        category: entryData.category || 'other',
        title: entryData.title || 'Untitled Entry',
        holder: entryData.holder || currentUserObj.name,
        location: entryData.location || 'Home file / records',
        value: entryData.masked ? 'Masked' : (entryData.value || 'N/A'),
        actualValue: entryData.value || 'Recorded',
        masked: Boolean(entryData.masked),
        notes: entryData.notes || '',
        addedBy: currentUserObj.name,
        addedById: currentUserObj.id,
        emergencyRelevant: entryData.emergencyRelevant || ['insurance', 'locker', 'property'].includes(entryData.category),
        updatedAt: 'Just now'
      };

      this.state.entries.push(newEntry);
      this.notify('ENTRY_ADDED', newEntry);
      return newEntry;
    }

    deleteEntry(entryId) {
      this.state.entries = this.state.entries.filter(e => e.id !== entryId);
      this.notify('ENTRY_DELETED', entryId);
    }

    inviteMember(memberData) {
      const newMember = {
        id: 'u_' + Date.now().toString(36),
        name: memberData.name || 'Family Member',
        role: memberData.relation || 'Member',
        avatarInitials: (memberData.name || 'FM').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
        phone: memberData.phone || '+91-XXXXXXXXXX',
        email: memberData.email || '',
        relation: memberData.relation || 'Family'
      };
      this.state.family.members.push(newMember);
      this.notify('MEMBER_INVITED', newMember);
      return newMember;
    }

    resetToSeed() {
      this.state = JSON.parse(JSON.stringify(INITIAL_SEED_DATA));
      localStorage.removeItem('surely_prototype_state');
      this.notify('STATE_RESET', this.state);
    }
  }

  window.SurelyState = new SurelyStateManager();
})();
