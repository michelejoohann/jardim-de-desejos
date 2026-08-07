import { useEffect, useState } from 'react';

export default function ProductCard({ product }) {
  const quantityDesired = Number(product.quantityDesired || 1);
  const quantityReceived = Number(product.quantityReceived || 0);
  const isComplete = quantityDesired > 1 && quantityReceived >= quantityDesired;
  const statusLabel = isComplete
    ? 'Floresceu'
    : product.status === 'reserved'
      ? 'Reservado'
      : product.status === 'received'
        ? 'Realizado'
        : 'Disponível';

  const imageUrl = product.imageUrl || product.image;
  const [imageFailed, setImageFailed] = useState(false);
  const meanings = Array.isArray(product.meanings) ? product.meanings : [];
  const sizes = Array.isArray(product.sizes) ? product.sizes : [];
  const notes = Array.isArray(product.notes) ? product.notes : [];

  useEffect(() => {
    setImageFailed(false);
  }, [imageUrl]);

  return (
    <article className="product-card">
      <div className="product-media">
        {imageUrl && !imageFailed ? (
          <img
            src={imageUrl}
            alt={product.name}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span className="product-icon" aria-hidden="true">{product.icon || '🌿'}</span>
        )}
        <span className={`status-badge status-${isComplete ? 'received' : (product.status || 'available')}`}>{statusLabel}</span>
      </div>

      <div className="product-body">
        <p className="collection-name">
          {product.collection}
          {product.subcategory ? ` · ${product.subcategory}` : ''}
        </p>
        <h2>{product.name}</h2>
        <p className="product-description">{product.description}</p>

        {product.dream && (
          <section className="dream-section" aria-label="O sonho deste presente">
            <span className="dream-label">🌱 O sonho</span>
            <p>{product.dream}</p>
          </section>
        )}

        {meanings.length > 0 && (
          <div className="meaning-tags" aria-label="Significados">
            {meanings.map(meaning => <span key={meaning}>{meaning}</span>)}
          </div>
        )}

        {sizes.length > 0 && (
          <p className="product-meta"><strong>Tamanho desejado:</strong> {sizes.join(', ')}</p>
        )}

        {product.priority && (
          <p className="product-meta"><strong>Prioridade:</strong> {product.priority}</p>
        )}

        {product.purchaseDecision && (
          <p className="product-meta"><strong>Decisão de compra:</strong> {product.purchaseDecision}</p>
        )}

        {product.unitPrice != null && product.totalPrice != null && (
          <p className="product-meta">
            <strong>Valores:</strong> {quantityDesired} × {product.unitPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} = {product.totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
        )}

        {notes.length > 0 && (
          <details className="story-details">
            <summary>📝 Observações importantes</summary>
            <ul>
              {notes.map(note => <li key={note}>{note}</li>)}
            </ul>
          </details>
        )}

        {quantityDesired > 1 && (
          <div className="quantity-progress" aria-label={`${quantityReceived} de ${quantityDesired} recebidos`}>
            <div className="quantity-progress__text">
              <strong>🌱 {quantityReceived} de {quantityDesired} recebidos</strong>
              <span>{isComplete ? 'Este sonho floresceu 🌸' : `Ainda podem florescer ${Math.max(quantityDesired - quantityReceived, 0)}`}</span>
            </div>
            <progress value={Math.min(quantityReceived, quantityDesired)} max={quantityDesired} />
          </div>
        )}

        {product.story && (
          <details className="story-details">
            <summary>📖 A história</summary>
            <blockquote>{product.story}</blockquote>
          </details>
        )}

        <div className="product-footer">
          <strong>{product.priceLabel || 'Consultar valor na loja'}</strong>
          <a href={product.url} target="_blank" rel="noopener noreferrer">Ver presente</a>
        </div>
      </div>
    </article>
  );
}
