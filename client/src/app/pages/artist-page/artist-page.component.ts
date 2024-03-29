import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import {SpotifyService} from "../../services/spotify.service";

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css']
})
export class ArtistPageComponent implements OnInit {
	artistId:string;
	artist:ArtistData;
	relatedArtists:ArtistData[];
	topTracks:TrackData[];
	albums:AlbumData[];

  constructor(private route: ActivatedRoute, private sp:SpotifyService ) { }

  ngOnInit() {
      this.artistId = this.route.snapshot.paramMap.get('id');
      //Inject the spotifyService and use it to get the artist data, related artists, top tracks for the artist, and the artist's albums
      this.sp.getArtist(this.artistId).then((response)=>{
          this.artist = response;
      })
      this.sp.getRelatedArtists(this.artistId).then((response)=>{
          this.relatedArtists = response;
      })
      this.sp.getTopTracksForArtist(this.artistId).then((response)=>{
          this.topTracks = response;
      })
      this.sp.getAlbumsForArtist(this.artistId).then((response)=>{
          this.albums = response;
      })



  }

}
