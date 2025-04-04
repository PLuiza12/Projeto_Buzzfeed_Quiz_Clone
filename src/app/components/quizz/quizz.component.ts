import { Component,OnInit} from '@angular/core';
import quizz_questions from "../../data/quizz_questions.json"
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quizz',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})

export class QuizzComponent {

  title:string=""

  questions:any
  questionSelected:any

  answers:string[] = []
  answerSelected:string = ""


  questionsIndex:number = 0
  questionsMaxIndex: number = 0

  finished:boolean = false

  option: any;

  ngOnInit():void{
    if(quizz_questions){
      this.finished = false
      this.title = quizz_questions.title
      this.questions = quizz_questions.questions
      this.questionSelected = this.questions [this.questionsIndex]

      this.questionsIndex = 0
      this.questionsMaxIndex = this.questions.length

      console.log(this.questionsIndex)
      console.log(this.questionsMaxIndex)
    }
  }

  playerChosse(value:string){
    this.answers.push(value)
    this.nextStep()

  }

  async nextStep(){
    this.questionSelected+=1

    if(this.questionsMaxIndex > this.questionsIndex){
      this.questionSelected = this.questions[this.questionsIndex]
    }
    else{

      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]
      console.log(this.answers)

    }
  }

  async checkResult(answers:string[]){

    const result = answers.reduce((previos,current,i,arr) => {
      if(
        arr.filter(item => item === previos).length,
        arr.filter(item => item === current),length
      ){
        return previos
      }else{
        return current
      }



    })

  return result
  }

}
