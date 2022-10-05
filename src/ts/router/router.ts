import type { Path, Page } from './pages';
import { PAGES } from './pages';
import { isPredicatedElement } from '../utils/predicator';

const updateAnchorElement = (path: Path) => {
  const preActiveAnchor = document.querySelector('a.active');
  const nextActiveAnchor = document.querySelector(`a[href="#${path}"]`);

  if (isPredicatedElement(preActiveAnchor)) {
    preActiveAnchor.classList.remove('active');
  }
  if (isPredicatedElement(nextActiveAnchor)) {
    nextActiveAnchor.classList.add('active');
  }
};

const route = () => {
  const path = <Path>location.hash.substring(1) || PAGES[0].path;
  const currentView = <Page>PAGES.find(page => path === page.path);

  try {
    currentView.view.render();
  } catch (err: Error | unknown) {
    const errorPage = PAGES.find(page => page.path === '/error') as Page;
    errorPage.view.render();
  }

  updateAnchorElement(path);
};

export default () => {
  window.addEventListener('DOMContentLoaded', route);
  window.addEventListener('hashchange', route);
};
