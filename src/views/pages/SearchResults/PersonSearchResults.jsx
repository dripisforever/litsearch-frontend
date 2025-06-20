import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPersonSearch } from 'core/actions';
import { selectors } from 'core/reducers/index';
import InfiniteGridList from 'views/components/InfiniteGridList';
import PersonCard from 'views/components/PersonCard';

function renderItem(personId) {
  return (
    <li>
      <PersonCard personId={personId} />
    </li>
  );
}

function PersonSearchResults({ query }) {
  const dispatch = useDispatch();
  const personIds = useSelector(state =>
    selectors.selectPersonSearchResultIds(state, query)
  );
  const isFetching = useSelector(state =>
    selectors.selectIsFetchingPersonSearchResults(state, query)
  );
  const nextPage = useSelector(state =>
    selectors.selectPersonSearchResultsNextPage(state, query)
  );

  function handleLoadMore() {
    dispatch(fetchPersonSearch(query, nextPage));
  }

  return (
    <InfiniteGridList
      items={personIds}
      loading={isFetching}
      hasNextPage={!!nextPage}
      onLoadMore={handleLoadMore}
      renderItem={renderItem}
    />
  );
}

export default PersonSearchResults;
