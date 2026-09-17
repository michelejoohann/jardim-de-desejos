import { writeBatch, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config.js';
import { officialGardenProducts } from '../data/officialCatalog.js';
import { gocaseProducts } from '../data/gocaseProducts.js';

/**
 * Single source used by the initial catalog migration.
 * Every product exposed by the application must be included here.
 */
export const migrationCatalog = [
  ...officialGardenProducts,
  ...gocaseProducts,
];

export async function migrateLegacyProducts() {
  const uniqueProducts = Array.from(
    new Map(migrationCatalog.map(product => [product.id, product])).values()
  );

  const batch = writeBatch(db);

  uniqueProducts.forEach((product, index) => {
    const reference = doc(db, 'products', product.id);
    batch.set(reference, {
      ...product,
      order: index,
      migratedFrom: 'catalog-v2.4',
      updatedAt: serverTimestamp(),
    }, { merge: true });
  });

  await batch.commit();
  return uniqueProducts.length;
}
