import { Component } from '@angular/core';
import { UGuess } from '../u-guess';
import { NewWordleWordService } from '../new-wordle-word.service';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {

  correctWord = "";
  userGuess = "";
  nextGuess: UGuess;
  allGuesses: Array<UGuess>;
  winMessage = "You Win!";
  winBool = false;

  constructor(
    private nWWS:NewWordleWordService
  ) {
    this.newGameStart();
    this.userGuess = "";

    this.nextGuess = new UGuess("", "", 0, 0);
    this.allGuesses = [];
  }


  submitGuess() {
    this.nextGuess.guess = this.userGuess;

    if (this.userGuess.length < this.correctWord.length) { this.nextGuess.gLength = "Too Short"; }
    else if (this.userGuess.length > this.correctWord.length) { this.nextGuess.gLength = "Too Long"; }
    else { this.nextGuess.gLength = "Correct Length"; }

    let elimLettersIndex = [];
    for (let i = 0; i < this.userGuess.length; i++) {
      for (let w = 0; w < this.correctWord.length; w++) {
        //checking to see if the letter has already been checked
        for (let t = 0; t < elimLettersIndex.length; t++) {
          if (elimLettersIndex[t] == w) {
            w++;
          }
        }
        //check if over array limit due to above for loop
        if (w < this.correctWord.length) {
          //checks to see if letters match
          if (this.userGuess[i] == this.correctWord[w]) {
            this.nextGuess.correctLetters++;
            if (i == w) {
              this.nextGuess.correctLocations++;
            }
            //same letters can't be matched with twice
            elimLettersIndex.push(w);
            break;
          }
        }
      }
    }

    if(this.userGuess.toLowerCase()==this.correctWord.toLowerCase()){
      this.winBool=true;
  }

    // push the current guess onto the guess array
    this.allGuesses.push(this.nextGuess);

    // create a new UGuess object with default values
    this.nextGuess = new UGuess("", "", 0, 0);
    this.userGuess = "";
  }

  newGameStart() {
    this.winBool = false;
    this.allGuesses = [];

    this.nWWS.getRequest().subscribe(
      (data) => {
        this.correctWord = data;
      }
    );
  }
}
