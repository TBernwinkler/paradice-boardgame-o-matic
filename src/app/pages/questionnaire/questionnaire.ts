import { Component, inject, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { SurveyEntry } from '../../models/survey.entry';
import {
  TranslatePipe,
    TranslateService,
} from "@ngx-translate/core";
import { faBolt, faCakeCandles, faCalendarDays, faCircleInfo, faClock, faDiceSix, faDumbbell, faEarthEurope, faHandshakeAngle, faLocationDot, faSliders, faUsers } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { AppState } from '../../states/app.state';
import { Store } from '@ngrx/store';
import { forkJoin, map, Observable } from 'rxjs';
import { selectLanguage } from '../../states/language/language.selector';
import { NgClass } from '@angular/common';
import { AnswersState } from '../../states/answers/answers.feature';
import { setAnswers } from '../../states/answers/answers.action';
import { AnswerOption } from '../../models/answer.option';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-questionnaire',
  imports: [FaIconComponent, TranslatePipe, NgClass, FormsModule],
  templateUrl: './questionnaire.html',
  styleUrl: './questionnaire.scss',
})
export class Questionnaire {

  faCalendarDays = faCalendarDays;
  faEarthEurope = faEarthEurope;
  faBolt = faBolt;
  faHandshakeAngle = faHandshakeAngle;
  faClock = faClock;
  faDumbbell = faDumbbell;
  faUsers = faUsers;
  faDiceSix = faDiceSix;
  faLocationDot = faLocationDot;
  faCakeCandles = faCakeCandles;
  faSliders = faSliders;
  faCircleInfo = faCircleInfo;

  private translate = inject(TranslateService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private readonly store = inject(Store<AppState>);
  private readonly answersStore = inject(Store<AnswersState>)
  language$: Observable<string>;


  private dataUrls: Array<string> = [
    '/assets/questions/de.json',
    '/assets/questions/en.json',
  ];

  questionsEN: Array<SurveyEntry> = [];
  questionsDE: Array<SurveyEntry> = [];
  questions: Array<SurveyEntry> = [];

  activeQuestionIndex: number = 0;
  private personalCollectionId = '';

  constructor() {
    this.language$ = this.store.select(selectLanguage)
    this.translate.addLangs(['de', 'en']);
    this.translate.setFallbackLang('de');
    this.translate.use('de'); // default

    const snapshot = this.route.snapshot;
    const personalCollection = snapshot.queryParamMap.get('personalCollection');
    
    forkJoin({
      german: this.http.get<Array<SurveyEntry>>(this.dataUrls[0]),
      english: this.http.get<Array<SurveyEntry>>(this.dataUrls[1])
    }).subscribe(({german, english}) => {

      if (personalCollection) {
        // TODO: add custom entry
        this.personalCollectionId = personalCollection;
        german[0].options.push(new AnswerOption(666, personalCollection, false, false));
        english[0].options.push(new AnswerOption(666, personalCollection, false, false));
      }

      this.questionsDE = german;
      this.questionsEN = english;

      this.language$.subscribe(languageCode => {
        this.translate.use(languageCode);

        if (languageCode == 'de') {
          this.questions = this.questionsDE;
        } else {
          this.questions = this.questionsEN;
        }
      })
    });
  }


  // Provide icons based on the strings defined in the questions/de.json and questions/en.json files
  getIcon(iconName: string) {
    switch (iconName) {
      case 'faLocationDot':
        return faLocationDot;
      case 'faUsers':
        return faUsers;
      case 'faDumbbell':
        return faDumbbell;
      case 'faClock':
        return faClock;
      case 'faHandshakeAngle':
        return faHandshakeAngle;
      case 'faBolt':
        return faBolt;
      case 'faEarthEurope':
        return faEarthEurope;
      case 'faCalendarDays':
        return faCalendarDays;
      case 'faSliders':
        return faSliders
      case 'faCakeCandles':
        return faCakeCandles;
      default:
        return faDiceSix;
    }
  }

  // button action to head back to a previous question
  goBack() {
    if (this.activeQuestionIndex > 0) {
      this.activeQuestionIndex -= 1;
    }
  }

  // button action to head to the next question
  goForward() {
    if (this.isNextQuestionAvailable()) {
      this.activeQuestionIndex += 1;
    }
  }

  // checks if the user has reached the final question: Next Vs. Submit
  isNextQuestionAvailable() {
    let questions = this.translate.getCurrentLang() == 'de' ? this.questionsDE : this.questionsEN;
    return this.activeQuestionIndex < questions.length -1;
  }

  submitAnswers() {
    this.storeAnswers();
    let answerSummary: string = ''
    this.questions.forEach(question => {
      question.options.forEach(option => {
        if (option.selected) {
          answerSummary += (answerSummary == '' ? '' : '-') + option.id;
        }
      });
      if (question.isPrioritized) {
        answerSummary += (answerSummary == '' ? '' : '-') + (question.id + 1000);
      }
    });
    this.activeQuestionIndex = 0;
    this.router.navigateByUrl('/results?answers=' + answerSummary + (this.personalCollectionId ? '&personalCollection=' + this.personalCollectionId : ''))
  }

  // language independent switch
  selectAnswer(optionId: number) {
    this.updateAnswer(this.questionsDE, optionId);
    this.updateAnswer(this.questionsEN, optionId);
  }

  changePriority(optionId: number) {
    const priority = this.questions[optionId].isPrioritized;
    // this function is still useful, as ngModel only updates the active list
    this.questionsDE[optionId].isPrioritized = priority;
    this.questionsEN[optionId].isPrioritized = priority;
    console.log('Changing priority:', this.questions[optionId].isPrioritized, this.questionsDE[optionId].isPrioritized, this.questionsEN[optionId].isPrioritized)
  }

  updateAnswer(questionList: Array<SurveyEntry>, optionId: number) {
    const canMultiSelect = questionList[this.activeQuestionIndex].canMultiSelect;
    // only undo previous selections for single choice questions
    if (!canMultiSelect) {
      questionList[this.activeQuestionIndex].options.forEach(element => {
        element.selected = false;
      });
    }
    // multi-select toggle
    questionList[this.activeQuestionIndex].options.forEach(element => {
      if (element.id == optionId) {
        if(canMultiSelect && element.selected) {
          element.selected = false;
        } else {
          element.selected = true;
        }
      }
    });
  }

  storeAnswers() {
    let userAnswers: Array<Array<AnswerOption>> = []
    this.questions.forEach(element => {
      if (element.isPrioritized) {
        element.options.forEach(option => {
          option.priority = true;          
        });
      }
      userAnswers.push(element.options);
    });
    this.store.dispatch(setAnswers({answers: userAnswers}));
  }
}
