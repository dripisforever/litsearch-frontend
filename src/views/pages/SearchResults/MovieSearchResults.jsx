import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieSearch } from 'core/actions';
import { selectors } from 'core/reducers/index';
import InfiniteGridList from 'views/components/InfiniteGridList';
import MovieCard from 'views/components/MovieCard';

function renderItem(movieId) {
  return (
    <li>
      <MovieCard movieId={movieId} />
    </li>
  );
}

function MovieSearchResults({ query }) {
  const dispatch = useDispatch();
  const movieIds = useSelector(state =>
    selectors.selectMovieSearchResultIds(state, query)
  );
  const isFetching = useSelector(state =>
    selectors.selectIsFetchingMovieSearchResults(state)
  );
  const nextPage = useSelector(state =>
    selectors.selectMovieSearchResultsNextPage(state, query)
  );

  function handleLoadMore() {
    dispatch(fetchMovieSearch(query, nextPage));
  }

  return (
    <InfiniteGridList
      items={movieIds}
      loading={isFetching}
      hasNextPage={!!nextPage}
      onLoadMore={handleLoadMore}
      renderItem={renderItem}
    />
  );
}

export default MovieSearchResults;
