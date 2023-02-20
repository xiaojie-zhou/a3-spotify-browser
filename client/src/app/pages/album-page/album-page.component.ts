import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import {SpotifyService} from "../../services/spotify.service";


@Component({
  selector: 'app-album-page',
  templateUrl: './album-page.component.html',
  styleUrls: ['./album-page.component.css']
})
export class AlbumPageComponent implements OnInit {
	albumId:string;
	album:AlbumData;
	tracks:TrackData[];


  constructor(private route: ActivatedRoute, private sp: SpotifyService) { }

  ngOnInit() {
      this.albumId = this.route.snapshot.paramMap.get('id');
  	// inject spotifyService and use it to get the album data and the tracks for the album
      this.sp.getAlbum(this.albumId).then(response=>{
          this.album = response;
      })
      this.sp.getTracksForAlbum(this.albumId).then(response=>{
          this.tracks = response;
      })

  }

}
