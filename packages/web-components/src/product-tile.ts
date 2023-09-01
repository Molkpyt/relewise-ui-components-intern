import { ProductResult } from '@relewise/client';
import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import formatPrice from './util/price';

@customElement('relewise-product-tile')
export class ProductTile extends LitElement {

    @property({ type: Object })
    product: ProductResult | null = null;

    connectedCallback(): void {
        super.connectedCallback();
    }

    render() {
        if (!this.product) {
            return;
        }

        if (this.product.data && 'Url' in this.product.data) {
            return html`
                <a class='tile' href=${this.product.data['Url'].value ?? ''}>
                    ${this.renderTileContent(this.product)}
                </a>`;
        }

        return html`
            <div class='tile'>
                ${this.renderTileContent(this.product)}
            </div>`;
    }

    renderTileContent(product: ProductResult) {
        return html`
            ${(product.data && 'ImageUrl' in product.data)
                ? html`<div class="image-container"><img class="object-cover" src=${product.data['ImageUrl'].value} /></div>`
                : nothing
            }
            <div class='information-container'>
                <h5 class="display-name">${product.displayName}</h5>
                <div class='price'>
                    <p><span>${formatPrice(product.salesPrice)}</span></p>

                    ${(product.salesPrice && product.listPrice && product.listPrice !== product.salesPrice)
                        ? html`<span class='list-price'>${formatPrice(product.listPrice)}</span>`
                        : nothing
                    }
                </div>
            </div>`
    }

    static styles = css`
        .tile {
            border-radius: .25rem;
            display: flex;
            flex-direction: column;
            position: relative;
            text-decoration: inherit;
            text-size-adjust: none;
            height: 100%;
            font-family: Arial, Helvetica, sans-serif;
        }
        
        img {
            max-width: 100%;
            height: auto;
            padding: .25rem
        }

        .image-container {
            display: flex;
            position: relative;
            margin: .75rem;
        }

        .information-container {
            padding-left: 0.75rem;
            padding-right: 0.75rem;
            text-align: left;
            position: relative;
        }

        .object-cover {
            object-fit: cover;
        }

        .price {
            color: var(--relewise-price-color, #212427);
            line-height: 1;
            font-weight: 600;
            font-size: var(--relewise-price-font-size, 1.5rem);
            align-items: center;
            display: flex;
        }

        .display-name {
            color: var(--relewise-display-name-color, #212427);
            letter-spacing: -0.025rem;
            line-height: 1.25;
            font-weight: 600;
            font-size: var(--relewise-display-name-font-size, 1.25rem);
            margin-top: 0rem;
            margin-bottom: 0rem;
        }

        .list-price {
            font-size: 1rem;
            text-decoration: var(--relewise-list-price-text-decoration, line-through);
            color: var(--relewise-list-price-color, darkgray);
            margin: .25rem;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'relewise-product-tile': ProductTile;
    }
}