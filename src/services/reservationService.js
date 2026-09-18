import {
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore';
import { db } from '../firebase/config.js';

/**
 * Cria a reserva/compra de um produto de forma atômica no Firestore.
 * - publicReservations/{productId}: Apenas status e UID (visível a todos para atualizar a vitrine).
 * - privateReservations/{productId}: Nome, e-mail, mensagem e status (visível apenas para a administradora).
 */
export async function createReservation({
  productId,
  status = 'reserved',
  name = '',
  email = '',
  message = '',
  isAnonymous = false,
  visitorUid,
}) {
  if (!productId) throw new Error('ID do produto não informado.');
  if (!visitorUid) throw new Error('Sessão de visitante não identificada.');
  if (status !== 'reserved' && status !== 'received') {
    throw new Error('Status inválido. Escolha "reserved" ou "received".');
  }

  const batch = writeBatch(db);
  const now = serverTimestamp();

  const publicRef = doc(db, 'publicReservations', productId);
  batch.set(publicRef, {
    productId,
    status,
    visitorUid,
    reservedAt: now,
  });

  const privateRef = doc(db, 'privateReservations', productId);
  batch.set(privateRef, {
    productId,
    visitorUid,
    name: isAnonymous ? 'Anônimo' : (name.trim() || 'Anônimo'),
    email: isAnonymous ? '' : email.trim(),
    message: message.trim(),
    status,
    isAnonymous: Boolean(isAnonymous),
    createdAt: now,
  });

  await batch.commit();
}

/**
 * Cancela/libera uma reserva (remove os documentos de ambas as coleções).
 */
export async function cancelReservation(productId) {
  if (!productId) throw new Error('ID do produto não informado.');

  const batch = writeBatch(db);
  batch.delete(doc(db, 'publicReservations', productId));
  batch.delete(doc(db, 'privateReservations', productId));
  await batch.commit();
}

/**
 * Escuta em tempo real todas as reservas públicas para atualizar os cards do catálogo.
 */
export function subscribeToPublicReservations(onData, onError) {
  const reservationsRef = collection(db, 'publicReservations');
  return onSnapshot(
    reservationsRef,
    snapshot => {
      const reservationsMap = {};
      snapshot.docs.forEach(docSnap => {
        reservationsMap[docSnap.id] = docSnap.data();
      });
      onData(reservationsMap);
    },
    error => {
      console.warn('Não foi possível carregar as reservas públicas:', error);
      if (onError) onError(error);
    }
  );
}

/**
 * Escuta em tempo real as mensagens e presentes privados (apenas administradora).
 */
export function subscribeToPrivateReservations(onData, onError) {
  const privateRef = collection(db, 'privateReservations');
  return onSnapshot(
    privateRef,
    snapshot => {
      const list = snapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      // Ordena por data decrescente (mais recente primeiro)
      list.sort((a, b) => {
        const timeA = a.createdAt?.toMillis?.() || 0;
        const timeB = b.createdAt?.toMillis?.() || 0;
        return timeB - timeA;
      });
      onData(list);
    },
    error => {
      console.warn('Não foi possível carregar os presentes privados:', error);
      if (onError) onError(error);
    }
  );
}
