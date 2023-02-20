import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { TrackFeature } from '../../data/track-feature';
import {SpotifyService} from "../../services/spotify.service";

@Component({
  selector: 'app-track-page',
  templateUrl: './track-page.component.html',
  styleUrls: ['./track-page.component.css']
})
export class TrackPageComponent implements OnInit {
	trackId:string;
	track:TrackData;
  audioFeatures:TrackFeature[];

  constructor(private route: ActivatedRoute, private sp:SpotifyService) { }

  ngOnInit() {
  	this.trackId = this.route.snapshot.paramMap.get('id');
  	//Inject the spotifyService and use it to get the track data and it's audio features
      this.sp.getTrack(this.trackId).then((response)=>{
          this.track = response;
      })
      this.sp.getAudioFeaturesForTrack(this.trackId).then((response)=>{
          this.audioFeatures = response;
      })

  }

}
