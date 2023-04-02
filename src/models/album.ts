import type {IAlbum} from '~/interfaces/album';
import {formatYear} from '~/helpers/date';

export class Album {
  album: IAlbum;

  constructor(album: IAlbum) {
    this.album = album;
  }

  get id() {
    return this.album.id;
  }

  get name() {
    return this.album?.name;
  }

  get image() {
    return this.album.images?.[0];
  }

  get releaseYear() {
    return formatYear(this.album?.release_date);
  }

  get imageUrl() {
    return this.image?.url;
  }

  get mainArtist() {
    return this.album?.artists?.[0];
  }

  get type() {
    return this.album?.type;
  }
}
