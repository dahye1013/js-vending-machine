import ProductContainerView from '../views/ProductContainerView';
import ChargeContainerView from '../views/ChargeContainerView';
import PurchaseContainerView from '../views/PurchaseContainerView';
import NotFoundView from '../views/NotFoundView';

export type Path = '/products' | '/charge' | '/purchase' | '/error';

export type PageView =
  | typeof ProductContainerView
  | typeof ChargeContainerView
  | typeof PurchaseContainerView
  | typeof NotFoundView;

type Page = {
  path: Path;
  view: PageView;
};

export const PAGES: Readonly<Page[]> = [
  {
    path: '/products',
    view: ProductContainerView,
  },
  {
    path: '/charge',
    view: ChargeContainerView,
  },
  {
    path: '/purchase',
    view: PurchaseContainerView,
  },
  {
    path: '/error',
    view: NotFoundView,
  },
];
