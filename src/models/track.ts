import type {ITrack} from '~/interfaces/track';
import {formatYear} from '~/helpers/date';

export class Track {
  track: ITrack;

  constructor(track: ITrack) {
    this.track = track;
  }

  get id() {
    return this.track.id;
  }

  get name() {
    return this.track?.name;
  }

  get image() {
    return this.album.images?.[0];
  }

  get releaseYear() {
    return formatYear(this.album?.release_date);
  }

  get album() {
    return this.track?.album;
  }

  get imageUrl() {
    return this.image?.url;
  }

  get mainArtist() {
    return this.track?.artists?.[0];
  }

  get type() {
    return this.track?.type;
  }

  get genre() {
    return this.track.genres?.[0];
  }

  get duration() {
    return this.track?.duration_ms;
  }
}
