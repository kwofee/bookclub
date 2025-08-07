// types/google-books-api.ts

/**
 * Defines the structure for pricing information.
 */
export interface Price {
  amount: number;
  currencyCode: string;
}

/**
 * Defines an identifier for the book, such as an ISBN.
 */
export interface IndustryIdentifier {
  type: 'ISBN_13' | 'ISBN_10' | 'OTHER';
  identifier: string;
}

/**
 * Defines the links for the book cover images.
 */
export interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}

/**
 * Contains the core information about the book volume.
 */
export interface VolumeInfo {
  title: string;
  authors: string[];
  publisher?: string;
  publishedDate: string;
  description: string;
  industryIdentifiers: IndustryIdentifier[];
  pageCount: number;
  categories: string[];
  averageRating?: number;
  ratingsCount?: number;
  imageLinks?: ImageLinks;
  language: string;
  infoLink: string;
  previewLink: string;
}

/**
 * Contains information related to the sale of the book.
 */
export interface SaleInfo {
  country: string;
  saleability: 'FOR_SALE' | 'NOT_FOR_SALE' | 'FREE';
  isEbook: boolean;
  listPrice?: Price;
  retailPrice?: Price;
  buyLink?: string;
}

/**
 * Describes the availability of different formats (e.g., ePub, PDF).
 */
export interface FormatAvailability {
  isAvailable: boolean;
  acsTokenLink?: string;
}

/**
 * Contains information about how the book can be accessed.
 */
export interface AccessInfo {
  country: string;
  viewability: 'PARTIAL' | 'ALL_PAGES' | 'NO_PAGES' | 'UNKNOWN';
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
  epub: FormatAvailability;
  pdf: FormatAvailability;
  webReaderLink: string;
  accessViewStatus: 'SAMPLE' | 'FULL_PUBLIC_DOMAIN' | 'NONE';
  quoteSharingAllowed: boolean;
}

/**
 * The main interface for a single book item in the API response.
 * This is the type you'll most likely use for your `books` array.
 */
export interface Book {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  saleInfo: SaleInfo;
  accessInfo: AccessInfo;
}

/**
 * The top-level interface for the entire API response.
 */
export interface GoogleBooksApiResponse {
  kind: string;
  totalItems: number;
  items: Book[];
}