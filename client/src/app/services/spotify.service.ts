import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';
import {retry} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    //use the injected http Service to make a get request to the Express endpoint and return the response.
    //the http service works similarly to fetch(). It may be useful to call .toPromise() on any responses.
    //update the return to instead return a Promise with the data from the Express server
    // https://indepth.dev/posts/1287/rxjs-heads-up-topromise-is-being-deprecated
    let response = this.http.get(this.expressBaseUrl+endpoint).toPromise();
    return Promise.resolve(response);
  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data
    return this.sendRequestToExpress('/me').then(data => new ProfileData(data));
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    //Identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encodeURIComponent().
    //Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array
    let rec = encodeURIComponent(resource);
    return this.sendRequestToExpress(`/search/${category}/${rec}`).then((data)=>{
      if (category=="artist"){
        return data['artists']['items'].map(artist => new ArtistData(artist))
      }
      if (category=="track"){
        return data['tracks']['items'].map(track => new TrackData(track));
      }
      if (category=="album"){
        return  data['albums']['items'].map(album => new AlbumData(album));
      }
    })
  }

  getArtist(artistId:string):Promise<ArtistData> {
    //use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    let artist = encodeURIComponent(artistId);
    return this.sendRequestToExpress(`/artist/${artist}`).then((response)=> {
      return new ArtistData(response);
    });
  }

  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    //use the related artist endpoint to make a request to express and return an array of artist data.
   return this.sendRequestToExpress(`/artist-related-artists/${artistId}`).then((response)=> {
     return response['artists'].map(artist => new ArtistData(artist));
   })

  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //use the top tracks endpoint to make a request to express.
    return this.sendRequestToExpress(`/artist-top-tracks/${artistId}`).then((response)=>
        response['tracks'].map(track=> new TrackData(track)));
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    //use the albums for an artist endpoint to make a request to express.
    return this.sendRequestToExpress(`/artist-albums/${artistId}`).then((response)=>
        response['items'].map(album=> new AlbumData(album)));
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    return null as any;
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    return null as any;
  }

  getTrack(trackId:string):Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    return null as any;
  }

  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    //TODO: use the audio features for track endpoint to make a request to express.
    return null as any;
  }
}
