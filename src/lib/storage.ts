export type Listing = {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  condition: string;
  location: string;
  image: string;
  createdAt: string;
  views: number;
};

export type SavedItem = {
  id: string;
  title: string;
  price: number;
  category: string;
  image: string;
};

const LISTINGS_KEY = "sleekfinds:listings";
const SAVED_KEY = "sleekfinds:saved-items";

export function getListings(): Listing[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const saved = localStorage.getItem(LISTINGS_KEY);

    if (!saved) {
      return [];
    }

    return JSON.parse(saved);
  } catch {
    return [];
  }
}

export function saveListings(listings: Listing[]) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    LISTINGS_KEY,
    JSON.stringify(listings)
  );
}

export function addListing(listing: Listing) {
  const listings = getListings();

  saveListings([listing, ...listings]);
}

export function deleteListing(id: string) {
  const listings = getListings();

  saveListings(
    listings.filter((listing) => listing.id !== id)
  );
}

export function getSavedItems(): SavedItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const saved = localStorage.getItem(SAVED_KEY);

    if (!saved) {
      return [];
    }

    return JSON.parse(saved);
  } catch {
    return [];
  }
}

export function saveSavedItems(items: SavedItem[]) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    SAVED_KEY,
    JSON.stringify(items)
  );
}

export function isItemSaved(id: string) {
  const items = getSavedItems();

  return items.some((item) => item.id === id);
}

export function toggleSavedItem(item: SavedItem) {
  const items = getSavedItems();

  const exists = items.some(
    (savedItem) => savedItem.id === item.id
  );

  if (exists) {
    saveSavedItems(
      items.filter(
        (savedItem) => savedItem.id !== item.id
      )
    );

    return false;
  }

  saveSavedItems([item, ...items]);

  return true;
}