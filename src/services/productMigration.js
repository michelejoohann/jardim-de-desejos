import { doc, serverTimestamp, writeBatch } from 'firebase/firestore';
import { db } from '../firebase/config.js';
import { gardenProducts } from '../data/catalog.js';

export async function migrateLegacyProducts() {
  const batch = writeBatch(db);

  gardenProducts.forEach((product, index) => {
    const reference = doc(db, 'products', product.id);
    batch.set(reference, {
      ...product,
      order: index,
      migratedFrom: 'catalog-v2.3',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }, { merge: true });
  });

  await batch.commit();
  return gardenProducts.length;
}
