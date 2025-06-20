import React from 'react';
import { useSelector } from 'react-redux';
import { selectors } from 'core/reducers/index';
import useQueryString from 'core/hooks/useQueryString';
import MediaGalleryModal from 'views/components/MediaGalleryModal';

function MovieVideoPlayerModal({ movieId }) {
  const movieVideoIds =
    useSelector(state => selectors.selectMovieVideos(state, movieId)) || [];
  const movieVideos = useSelector(state =>
    movieVideoIds.map(movieVideoId =>
      selectors.selectVideo(state, movieVideoId)
    )
  );
  const videoKeys = movieVideos.map(video => video.key);

  const { watch } = useQueryString();
  const videoToWatch = movieVideos.find(video => video.key === watch);

  return (
    <MediaGalleryModal
      title={videoToWatch?.name}
      dataSource={videoKeys}
      queryParamName="watch"
      isVideoPlayer={true}
    />
  );
}

export default MovieVideoPlayerModal;
