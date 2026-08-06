import { useEffect, useMemo, useState } from 'react';

function getProxiedImageUrl(url) {
  if (!url || url.startsWith('data:') || url.startsWith('/')) return url;

  try {
    const hostname = new URL(url).hostname;
    const shouldProxy = hostname.includes('ibyteimg.com') || hostname === 'm.media-amazon.com';
    if (!shouldProxy) return url;
    return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=900&output=webp&q=85`;
  } catch {
    return url;
  }
}

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
  const proxiedImageUrl = useMemo(() => getProxiedImageUrl(imageUrl), [imageUrl]);
  const [currentImageUrl, setCurrentImageUrl] = useState(proxiedImageUrl);
  const [imageFailed, setImageFailed] = useState(false);
  const meanings = Array.isArray(product.meanings) ? product.meanings : [];
  const sizes = Array.isArray(product.sizes) ? product.sizes : [];

  useEffect(() => {
    setCurrentImageUrl(proxiedImageUrl);
    setImageFailed(false);
  }, [proxiedImageUrl]);

  function handleImageError() {
    if (currentImageUrl !== imageUrl && imageUrl) {
      setCurrentImageUrl(imageUrl);
      return;
    }
    setImageFailed(true);
  }

  return (
    <article className="product-card">
      <div className="product-media">
        {currentImageUrl && !imageFailed ? (
          <img
            src={currentImageUrl}
            alt={product.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={handleImageError}
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