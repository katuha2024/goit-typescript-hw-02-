import css from './LoadMore.module.css';

interface LoadMoreBtnProps {
  onLoadMore: () => void;
}

export default function LoadMoreBtn({ onLoadMore }: LoadMoreBtnProps) {
  return (
    <div className={css.container}>
      <button
        type="button"
        onClick={onLoadMore}
        className={css.LoadMoreButton}
      >
        Load more
      </button>
    </div>
  );
}